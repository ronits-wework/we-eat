import PropTypes from 'prop-types';
import React from 'react';
import {BrowserRouter as Router, Route, BrowserRouter, Switch} from 'react-router-dom'
import Restaurants from "./Restaurants";
import SearchInput, {createFilter} from 'react-search-input'
import Select from 'react-select';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;


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

    static get minRestaurantFilterLength() {
        return 2;
    }

    static get deliveryTimes() {
        let times = [];
        const maxTime = 120;
        const interval = 15;
        for (let i = interval; i <= maxTime; i += interval) {
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

    filterRestaurants() {
        let restaurants = this.state.restaurants.slice();

        // filter by restaurant name
        if (this.state.restaurantFilter && this.state.restaurantFilter.length >= RestaurantsApp.minRestaurantFilterLength) {
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
        if (this.state.maxSpeed) {
            const currMaxSpeed = this.state.maxSpeed.value;
            restaurants = restaurants.filter((restaurant) => {
                return restaurant.speed !== null && restaurant.speed <= currMaxSpeed;
            });
        }

        // filter by min rating

        // filter by 10bis

        // filter by kosher

        this.setState({displayedRestaurants: restaurants});
    }

    handle(props) {
        const { value, dragging, index, ...restProps } = props;
        return (
            <Tooltip
                prefixCls="rc-slider-tooltip"
                overlay={value}
                visible={dragging}
                placement="top"
                key={index}
            >
                <Handle value={value} {...restProps} />
            </Tooltip>
        );
    };

    render() {
        return (
            <Router history={BrowserRouter}>
                <div>
                    <div className="header">
                        <h1>WeEat</h1>
                    </div>
                    <Switch>
                        <Route exact={true} path={"/"}
                               render={() => (
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
                                           <Select
                                               name="speed"
                                               value={this.state.maxSpeed}
                                               options={RestaurantsApp.deliveryTimes.map((time) => {
                                                   return {value: time, label: time + " minutes"};
                                               })}
                                               onChange={this.maxSpeedFiltered.bind(this)}
                                               placeholder="Delivery time limit"
                                           />
                                       </div>
                                       <Restaurants restaurants={this.state.displayedRestaurants}/>
                                   </div>
                               )}/>
                        <Route render={() => <h1>404 not found </h1>}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}
