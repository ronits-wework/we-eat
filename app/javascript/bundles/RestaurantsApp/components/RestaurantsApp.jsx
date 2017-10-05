import React from 'react';
import Restaurants from "./Restaurants";
import SearchInput from 'react-search-input'
import Select from 'react-select';
import Slider from 'rc-slider';
import StarsRatingFilter from "../../Widgets/components/StarsRatingFilter";

const Handle = Slider.Handle;

const MIN_RESTAURANT_FILTER_LENGTH = 2;
const MAX_DELIVERY_TIME = 120;
const DELIVERY_INTERVAL = 15;


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
            restaurantFilter: null,
            minRating: null,
            cuisineTypeFilter: null,
            maxSpeed: null,
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
        fetch("/restaurants.json")
            .then(res => {
                return res.json();
            }).then((restaurants) => {
            this.setState({
                restaurants,
                displayedRestaurants: restaurants
            });
        });

        fetch("/cuisine_types.json")
            .then(res => {
                return res.json();
            }).then((cuisineTypes) => {
            this.setState({
                cuisineTypes
            });
        });
    }

    searchRestaurantUpdated(term) {
        this.setState({restaurantFilter: term}, this.filterRestaurants);
    }

    cuisineTypeFiltered(cuisine) {
        this.setState({cuisineTypeFilter: cuisine}, this.filterRestaurants);
    }

    maxSpeedFiltered(time) {
        this.setState({maxSpeed: time}, this.filterRestaurants);
    }

    minRatingFiltered(minRating) {
        this.setState({minRating: minRating}, this.filterRestaurants);
    }

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

        // filter by kosher

        this.setState({displayedRestaurants: restaurants});
    }

    render() {
        const sliderTimes = {};
        RestaurantsApp.deliveryTimes.map((time) => sliderTimes[time] = time);
        return (
            <div className="restaurants-app">
                <div className="search-restaurants-wrapper">
                    <SearchInput className="search-input"
                                 placeholder="Search restaurants"
                                 onChange={this.searchRestaurantUpdated.bind(this)}/>
                </div>
                <div>
                    <Select
                        name="cuisine"
                        value={this.state.cuisineTypeFilter}
                        options={this.state.cuisineTypes.map((cuisine) => {
                            return {value: cuisine.id, label: cuisine.cuisine};
                        })}
                        onChange={this.cuisineTypeFiltered.bind(this)}
                        placeholder="Cuisine"
                    />
                    <div className="slider-wrapper">
                        <span>Set delivery time limit (minutes)</span>
                        <Slider min={0}
                                max={MAX_DELIVERY_TIME}
                                step={DELIVERY_INTERVAL}
                                marks={sliderTimes}
                                onAfterChange={this.maxSpeedFiltered.bind(this)}/>
                    </div>
                    <div>
                        <StarsRatingFilter
                            minRatingFiltered={this.minRatingFiltered.bind(this)}
                        />
                    </div>
                </div>
                <Restaurants restaurants={this.state.displayedRestaurants}/>
            </div>
        );
    }
}
