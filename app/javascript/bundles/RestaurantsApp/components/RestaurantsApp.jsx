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


const MAX_DELIVERY_TIME = 120;
const DELIVERY_INTERVAL = 15;

const restaurantFilters = Object.freeze({
    RESTAURANT_NAME: Symbol("restaurantName"),
    MIN_RATING: Symbol("minRating"),
    CUISINE_TYPE: Symbol("cuisineType"),
    MAX_SPEED: Symbol("maxSpeed"),
    IS_10_BIS: Symbol("is10Bis"),
    IS_KOSHER: Symbol("isKosher"),
});

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

class RestaurantFilter {
    constructor() {
        this.filterType = null;
    }

    isFilterApplied(value) {
        return value !== null;
    }

    get defaultValue() {
        return null;
    }

    getFilterType() {
        return this.filterType;
    }

    filter(restaurants) {
        return restaurants;
    }
}

class RestaurantNameFilter extends RestaurantFilter {
    constructor() {
        super();
        this.filterType = restaurantFilters.RESTAURANT_NAME;
    }

    isFilterApplied(value) {
        return value !== null && value.length > 0;
    }

    get defaultValue() {
        return "";
    }

    filter(restaurants, value) {
        if (this.isFilterApplied(value)) {
            const lValue = value.toLowerCase();
            restaurants = restaurants.filter((restaurant) => {
                return (restaurant.name.toLowerCase().indexOf(lValue) >= 0);
            });
        }
        return restaurants;
    }
}


class MinRatingFilter extends RestaurantFilter {
    constructor() {
        super();
        this.filterType = restaurantFilters.MIN_RATING;
    }

    isFilterApplied(value) {
        return value !== null && value > 0;
    }

    get defaultValue() {
        return null;
    }

    filter(restaurants, value) {
        if (this.isFilterApplied(value)) {
            restaurants = restaurants.filter((restaurant) => {
                return restaurant.rating >= value;
            });
        }
        return restaurants;
    }
}

class CuisineTypeFilter extends RestaurantFilter {
    constructor() {
        super();
        this.filterType = restaurantFilters.CUISINE_TYPE;
    }

    isFilterApplied(value) {
        return value !== null && value.label.length > 0;
    }

    get defaultValue() {
        return null;
    }

    filter(restaurants, value) {
        if (this.isFilterApplied(value)) {
            const currCuisineId = value.value;
            restaurants = restaurants.filter((restaurant) => {
                return restaurant.cuisine_types.filter((cuisine) => {
                    return cuisine.id === currCuisineId;
                }).length > 0;
            });
        }
        return restaurants;
    }
}

class MaxSpeedFilter extends RestaurantFilter {
    constructor() {
        super();
        this.filterType = restaurantFilters.MAX_SPEED;
    }

    isFilterApplied(value) {
        return value !== null && value > 0;
    }

    get defaultValue() {
        return 0;
    }

    filter(restaurants, value) {
        if (this.isFilterApplied(value)) {
            const currMaxSpeed = value;
            restaurants = restaurants.filter((restaurant) => {
                return restaurant.speed !== null && restaurant.speed <= currMaxSpeed;
            });
        }
        return restaurants;
    }
}

class Is10BisFilter extends RestaurantFilter {
    constructor() {
        super();
        this.filterType = restaurantFilters.IS_10_BIS;
    }

    isFilterApplied(value) {
        return (value === true);
    }

    get defaultValue() {
        return false;
    }

    filter(restaurants, value) {
        if (this.isFilterApplied(value)) {
            restaurants = restaurants.filter((restaurant) => {
                return restaurant.accepts_10bis;
            });
        }
        return restaurants;
    }
}

class IsKosherFilter extends RestaurantFilter {
    constructor() {
        super();
        this.filterType = restaurantFilters.IS_KOSHER;
    }

    isFilterApplied(value) {
        return (value === true);
    }

    get defaultValue() {
        return false;
    }

    filter(restaurants, value) {
        if (this.isFilterApplied(value)) {
            restaurants = restaurants.filter((restaurant) => {
                return restaurant.kosher;
            });
        }
        return restaurants;
    }
}

function RestaurantFilterFactory(filterType) {
    switch(filterType) {
        case restaurantFilters.RESTAURANT_NAME:
            return new RestaurantNameFilter();
            break;
        case restaurantFilters.MIN_RATING:
            return new MinRatingFilter();
            break;
        case restaurantFilters.CUISINE_TYPE:
            return new CuisineTypeFilter();
            break;
        case restaurantFilters.MAX_SPEED:
            return new MaxSpeedFilter();
            break;
        case restaurantFilters.IS_10_BIS:
            return new Is10BisFilter();
            break;
        case restaurantFilters.IS_KOSHER:
            return new IsKosherFilter();
            break;
    }
}

export const MAX_RESTAURANT_RATING = 3;

export default class RestaurantsApp extends React.Component {

    /**
     * @param props - Comes from your rails view.
     */
    constructor(props) {
        super(props);

        this.filters = {};
        this.defaultFilterValues = {};
        Object.keys(restaurantFilters).forEach((key) => {
            const filterType = restaurantFilters[key];
            const filter = RestaurantFilterFactory(filterType);
            this.filters[filterType] = filter;
            this.defaultFilterValues[filterType] = filter.defaultValue;
        });

        let filterValues = {};
        Object.keys(restaurantFilters).forEach((key) => {
            const filterType = restaurantFilters[key];
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
        const keys = Object.keys(restaurantFilters);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            const filterType = restaurantFilters[key];
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
        Object.keys(restaurantFilters).forEach((key) => {
            const filterType = restaurantFilters[key];
            filterValues[filterType] = this.state.filterValues[filterType];
        });
        filterValues[filterType] = value;
        this.setState({filterValues}, this.filterRestaurants);
    };

    filterRestaurants() {
        let restaurants = this.state.restaurants.slice();

        Object.keys(restaurantFilters).forEach((key) => {
            const filterType = restaurantFilters[key];
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
                                     onChange={(value) => this.filterChanged(restaurantFilters.RESTAURANT_NAME, value)}
                                     value={this.state.filterValues[restaurantFilters.RESTAURANT_NAME]}
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
                        value={this.state.filterValues[restaurantFilters.CUISINE_TYPE]}
                        options={this.state.cuisineTypes.map((cuisine) => {
                            return {value: cuisine.id, label: cuisine.cuisine};
                        })}
                        onChange={(value) => this.filterChanged(restaurantFilters.CUISINE_TYPE, value)}
                        placeholder="Cuisine"
                    />
                    <div className="slider-wrapper">
                        <span>Delivery time limit (minutes)</span>
                        <Slider min={0}
                                max={MAX_DELIVERY_TIME}
                                step={DELIVERY_INTERVAL}
                                marks={sliderTimes}
                                onChange={(value) => this.filterChanged(restaurantFilters.MAX_SPEED, value)}
                                onAfterChange={(value) => this.filterChanged(restaurantFilters.MAX_SPEED, value)}
                                value={this.state.filterValues[restaurantFilters.MAX_SPEED]}
                        />
                    </div>
                    <StarsRatingFilter
                        onRating={(value) => this.filterChanged(restaurantFilters.MIN_RATING, value)}
                        rating={this.state.filterValues[restaurantFilters.MIN_RATING]}
                    />
                    <CheckboxFilter
                        onCheckChange={(value) => this.filterChanged(restaurantFilters.IS_10_BIS, value.target.checked)}
                        isChecked={this.state.filterValues[restaurantFilters.IS_10_BIS]}
                        label={"Only 10bis"}
                        inputName={"is10bis"}
                    />
                    <CheckboxFilter
                        onCheckChange={(value) => this.filterChanged(restaurantFilters.IS_KOSHER, value.target.checked)}
                        isChecked={this.state.filterValues[restaurantFilters.IS_KOSHER]}
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
