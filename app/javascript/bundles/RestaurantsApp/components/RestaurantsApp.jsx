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


const MIN_RESTAURANT_FILTER_LENGTH = 1;
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

        this.state = {
            restaurants: [],
            displayedRestaurants: [],
            cuisineTypes: [],
            restaurantFilter: "",
            minRating: null,
            cuisineTypeFilter: null,
            maxSpeed: 0,
            is10bisFilter: false,
            isKosherFilter: false,
            filtersApplied: false,
            addRestModalIsOpen: false,
            selectedRestaurant: null,
            centerRestaurant: null,
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
        if (this.state.filtersApplied) {
            this.setState({
                restaurantFilter: "",
                minRating: null,
                cuisineTypeFilter: null,
                maxSpeed: 0,
                is10bisFilter: false,
                isKosherFilter: false
            }, this.filterRestaurants);
        }
    };

    areFiltersApplied() {
        const noFilters = (
            (this.state.restaurantFilter === null || this.state.restaurantFilter.length === 0) &&
            (this.state.minRating === null || this.state.minRating === 0) &&
            (this.state.cuisineTypeFilter === null || this.state.cuisineTypeFilter.length === 0) &&
            (this.state.maxSpeed === 0) &&
            (!this.state.is10bisFilter) &&
            (!this.state.isKosherFilter)
        );

        return !noFilters;
    }

    searchRestaurantUpdated = (term) => {
        this.setState({restaurantFilter: term}, this.filterRestaurants);
    };

    cuisineTypeFiltered = (cuisine) => {
        this.setState({cuisineTypeFilter: cuisine}, this.filterRestaurants);
    };

    maxSpeedFiltered = (time) => {
        this.setState({maxSpeed: time}, this.filterRestaurants);
    };

    minRatingFiltered = (minRating) => {
        this.setState({minRating: minRating}, this.filterRestaurants);
    };

    is10bisFiltered = (event) => {
        this.setState({is10bisFilter: event.target.checked}, this.filterRestaurants);
    };

    isKosherFiltered = (event) => {
        this.setState({isKosherFilter: event.target.checked}, this.filterRestaurants);
    };

    filterRestaurants() {
        let restaurants = this.state.restaurants.slice();

        // filter by restaurant name
        if (this.state.restaurantFilter && this.state.restaurantFilter.length >= MIN_RESTAURANT_FILTER_LENGTH) {
            const restaurantFilter = this.state.restaurantFilter.toLowerCase();
            restaurants = restaurants.filter((restaurant) => {
                return (restaurant.name.toLowerCase().indexOf(restaurantFilter) >= 0);
            });
        }

        // filter by cuisine type
        if (this.state.cuisineTypeFilter) {
            const currCuisineId = this.state.cuisineTypeFilter.value;
            restaurants = restaurants.filter((restaurant) => {
                return restaurant.cuisine_types.filter((cuisine) => {
                    return cuisine.id === currCuisineId;
                }).length > 0;
            });
        }

        // filter by max speed
        if (this.state.maxSpeed && this.state.maxSpeed > 0) {
            const currMaxSpeed = this.state.maxSpeed;
            restaurants = restaurants.filter((restaurant) => {
                return restaurant.speed !== null && restaurant.speed <= currMaxSpeed;
            });
        }

        // filter by min rating
        if (this.state.minRating > 0) {
            restaurants = restaurants.filter((restaurant) => {
                return restaurant.rating >= this.state.minRating;
            });
        }

        // filter by 10bis
        if (this.state.is10bisFilter > 0) {
            restaurants = restaurants.filter((restaurant) => {
                return restaurant.accepts_10bis;
            });
        }

        // filter by kosher
        if (this.state.isKosherFilter > 0) {
            restaurants = restaurants.filter((restaurant) => {
                return restaurant.kosher;
            });
        }

        this.setState({
            displayedRestaurants: restaurants,
            filtersApplied: this.areFiltersApplied(),
        });
    }


    render() {
        const sliderTimes = {};
        RestaurantsApp.deliveryTimes.map((time) => sliderTimes[time] = time);
        const clearBtnClass = cx('clear-filters-btn', {
            'disabled': !this.state.filtersApplied,
        });
        return (
            <div className="restaurants-app">
                <div className="top-part">
                    <div className="search-restaurants-wrapper">
                        <a onClick={this.openModal}
                           className="add-restaurant-btn">+</a>
                        <SearchInput className="search-input"
                                     placeholder="Search restaurants"
                                     onChange={this.searchRestaurantUpdated}
                                     value={this.state.restaurantFilter}
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
                        value={this.state.cuisineTypeFilter}
                        options={this.state.cuisineTypes.map((cuisine) => {
                            return {value: cuisine.id, label: cuisine.cuisine};
                        })}
                        onChange={this.cuisineTypeFiltered}
                        placeholder="Cuisine"
                    />
                    <div className="slider-wrapper">
                        <span>Delivery time limit (minutes)</span>
                        <Slider min={0}
                                max={MAX_DELIVERY_TIME}
                                step={DELIVERY_INTERVAL}
                                marks={sliderTimes}
                                onChange={this.maxSpeedFiltered}
                                onAfterChange={this.maxSpeedFiltered}
                                value={this.state.maxSpeed}
                        />
                    </div>
                    <StarsRatingFilter
                        onRating={this.minRatingFiltered}
                        rating={this.state.minRating}
                    />
                    <CheckboxFilter
                        onCheckChange={this.is10bisFiltered}
                        isChecked={this.state.is10bisFilter}
                        label={"Only 10bis"}
                        inputName={"is10bis"}
                    />
                    <CheckboxFilter
                        onCheckChange={this.isKosherFiltered}
                        isChecked={this.state.isKosherFilter}
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
