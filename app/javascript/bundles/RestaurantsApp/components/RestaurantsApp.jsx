import React from 'react';
import Restaurants from "./Restaurants";
import AddRestaurantForm from './AddRestaurant';
import SearchInput from 'react-search-input'
import Select from 'react-select';
import Slider from 'rc-slider';
import StarsRatingFilter from "../../StarsRating/components/StarsRatingFilter";
import CheckboxFilter from "../../Filters/components/CheckboxFilter"
import Modal from 'react-modal';
import RestaurantsMap from '../../Map/components/RestaurantsMap';
import cx from 'classnames';
import LoadGoogleMap from '../../App/services/GoogleMapLoader';
import {RestaurantFilters} from "../../Filters/model/RestaurantFilter";
import RestaurantFilterFactory from '../../Filters/model/RestaurantFilterFactory';


const MAX_DELIVERY_TIME = 120;
const DELIVERY_INTERVAL = 15;


const customStyles = {
    content: {
        top: '70px',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, 0)',
        height: '600px',
        width: '500px',
    }
};


export const MAX_RESTAURANT_RATING = 3;

export default class RestaurantsApp extends React.Component {

    /**
     * @param props - Comes from your rails view.
     */
    constructor(props) {
        super(props);

        this.filters = {};
        this.defaultFilterValues = {};
        Object.keys(RestaurantFilters).forEach((key) => {
            const filterType = RestaurantFilters[key];
            const filter = RestaurantFilterFactory(filterType);
            this.filters[filterType] = filter;
            this.defaultFilterValues[filterType] = filter.defaultValue;
        });

        let filterValues = {};
        Object.keys(RestaurantFilters).forEach((key) => {
            const filterType = RestaurantFilters[key];
            filterValues[filterType] = this.defaultFilterValues[filterType];
        });

        this.state = {
            restaurants: [],
            displayedRestaurants: [],
            cuisineTypes: [],
            addRestModalIsOpen: false,
            selectedRestaurant: null,
            centerRestaurant: null,
            filterValues: filterValues,
        };

    }

    static get deliveryTimes() {
        let times = [];
        const maxTime = MAX_DELIVERY_TIME;
        const interval = DELIVERY_INTERVAL;
        for (let i = 0; i <= maxTime; i += interval) {
            times.push(i);
        }
        return times;
    }

    componentDidMount() {
        this.fetchRestaurants();
        this.fetchCuisineTypes();

        LoadGoogleMap();
    }

    openModal = () => {
        this.setState({addRestModalIsOpen: true});
    };

    closeModal = () => {
        this.setState({addRestModalIsOpen: false});
    };

    onRestaurantsChange = () => {
        this.fetchRestaurants();
    };

    onRestaurantClick = (restaurant) => {
        this.setState({centerRestaurant: restaurant});
    };

    onRestaurantEnter = (restaurant) => {
        this.setState({selectedRestaurant: restaurant});
    };

    onRestaurantLeave = (restaurant) => {
        this.setState({selectedRestaurant: null});
    };

    fetchRestaurants() {
        fetch("/restaurants.json")
            .then(res => res.json())
            .then((restaurants) => {
                this.setState({
                        restaurants
                    }, this.filterRestaurants
                );
            });
    }

    fetchCuisineTypes() {
        fetch("/cuisine_types.json")
            .then(res => {
                return res.json();
            }).then((cuisineTypes) => {
            this.setState({
                cuisineTypes
            });
        });
    }


    clearFilters = () => {
        this.setState({filterValues: this.defaultFilterValues}, this.filterRestaurants);
    };

    areFiltersApplied() {
        const keys = Object.keys(RestaurantFilters);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            const filterType = RestaurantFilters[key];
            const filterValue = this.state.filterValues[filterType];
            const filter = this.filters[filterType];
            if (filter.isFilterApplied(filterValue)) {
                return true;
            }
        }
        return false;
    }

    filterChanged = (filterType, value) => {
        let filterValues = {};
        Object.keys(RestaurantFilters).forEach((key) => {
            const filterType = RestaurantFilters[key];
            filterValues[filterType] = this.state.filterValues[filterType];
        });
        filterValues[filterType] = value;
        this.setState({filterValues}, this.filterRestaurants);
    };

    filterRestaurants() {
        let restaurants = this.state.restaurants.slice();

        Object.keys(RestaurantFilters).forEach((key) => {
            const filterType = RestaurantFilters[key];
            const filter = this.filters[filterType];
            restaurants = filter.filter(restaurants, this.state.filterValues[filterType]);
        });

        this.setState({displayedRestaurants: restaurants});
    }


    render() {
        const sliderTimes = {};
        RestaurantsApp.deliveryTimes.map((time) => sliderTimes[time] = time);
        const clearBtnClass = cx('clear-filters-btn', {
            'disabled': !this.areFiltersApplied(),
        });
        return (
            <div className="restaurants-app">
                <div className="top-part">
                    <div className="search-restaurants-wrapper">
                        <a onClick={this.openModal}
                           className="add-restaurant-btn">+</a>
                        <SearchInput className="search-input"
                                     placeholder="Search restaurants"
                                     onChange={(value) => this.filterChanged(RestaurantFilters.RESTAURANT_NAME, value)}
                                     value={this.state.filterValues[RestaurantFilters.RESTAURANT_NAME]}
                        />
                    </div>


                    <Modal
                        isOpen={this.state.addRestModalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Add a Restaurant"
                        shouldCloseOnOverlayClick={false}
                    >
                        <AddRestaurantForm
                            cuisines={this.state.cuisineTypes.map((cuisine) => {
                                return {value: cuisine.id, label: cuisine.cuisine};
                            })}
                            onClose={this.closeModal}
                            deliveryTimes={RestaurantsApp.deliveryTimes.map((time) => {
                                return {value: time, label: time}
                            })}
                            onAdd={this.onRestaurantsChange}
                        />
                    </Modal>
                </div>

                <div className="restaurant-filters">
                    <Select
                        name="cuisine"
                        value={this.state.filterValues[RestaurantFilters.CUISINE_TYPE]}
                        options={this.state.cuisineTypes.map((cuisine) => {
                            return {value: cuisine.id, label: cuisine.cuisine};
                        })}
                        onChange={(value) => this.filterChanged(RestaurantFilters.CUISINE_TYPE, value)}
                        placeholder="Cuisine"
                    />
                    <div className="slider-wrapper">
                        <span>Delivery time limit (minutes)</span>
                        <Slider min={0}
                                max={MAX_DELIVERY_TIME}
                                step={DELIVERY_INTERVAL}
                                marks={sliderTimes}
                                onChange={(value) => this.filterChanged(RestaurantFilters.MAX_SPEED, value)}
                                onAfterChange={(value) => this.filterChanged(RestaurantFilters.MAX_SPEED, value)}
                                value={this.state.filterValues[RestaurantFilters.MAX_SPEED]}
                        />
                    </div>
                    <StarsRatingFilter
                        onRating={(value) => this.filterChanged(RestaurantFilters.MIN_RATING, value)}
                        rating={this.state.filterValues[RestaurantFilters.MIN_RATING]}
                    />
                    <CheckboxFilter
                        onCheckChange={(value) => this.filterChanged(RestaurantFilters.IS_10_BIS, value.target.checked)}
                        isChecked={this.state.filterValues[RestaurantFilters.IS_10_BIS]}
                        label={"Only 10bis"}
                        inputName={"is10bis"}
                    />
                    <CheckboxFilter
                        onCheckChange={(value) => this.filterChanged(RestaurantFilters.IS_KOSHER, value.target.checked)}
                        isChecked={this.state.filterValues[RestaurantFilters.IS_KOSHER]}
                        label={"Only kosher"}
                        inputName={"isKosher"}
                    />
                    <img
                        className={clearBtnClass}
                        onClick={this.clearFilters}
                    />
                </div>
                <div className="bottom-part">
                    <div className="restaurants-wrapper">
                        <Restaurants
                            restaurants={this.state.displayedRestaurants}
                            onRestaurantsChange={this.onRestaurantsChange}
                            onRestaurantClick={this.onRestaurantClick}
                            onRestaurantEnter={this.onRestaurantEnter}
                            onRestaurantLeave={this.onRestaurantLeave}
                        />
                    </div>
                    <div className="map-wrapper">
                        <RestaurantsMap
                            restaurants={this.state.displayedRestaurants.filter((restaurant) => {
                                if (restaurant.latitude === null || restaurant.longitude === null) {
                                    return false;
                                }
                                return true;
                            })}
                            onRestaurantsChange={this.onRestaurantsChange}
                            googleMapLoader={LoadGoogleMap}
                            selectedRestaurant={this.state.selectedRestaurant}
                            centerRestaurant={this.state.centerRestaurant}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
