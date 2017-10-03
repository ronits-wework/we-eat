import PropTypes from 'prop-types';
import React from 'react';
import {BrowserRouter as Router, Route, BrowserRouter, Switch} from 'react-router-dom'
import Restaurants from "./Restaurants";
import SearchInput, {createFilter} from 'react-search-input'


export default class RestaurantsApp extends React.Component {

    /**
     * @param props - Comes from your rails view.
     */
    constructor(props) {
        super(props);

        this.state = {
            restaurants: [],
            displayedRestaurants: [],
            restaurantFilter: null,
            minRating: null,
            cuisineTypeFilter: null,
            maxSpeed: null,
        };
    }

    static get minRestaurantFilterLength() {
        return 2;
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
    }

    searchRestaurantUpdated(term) {
        this.setState({restaurantFilter: term});
        this.filterRestaurants();
    }

    filterRestaurants() {
        let restaurants = this.state.restaurants.slice();

        if (this.state.restaurantFilter && this.state.restaurantFilter.length >= RestaurantsApp.minRestaurantFilterLength) {
            const restaurantFilter = this.state.restaurantFilter.toLowerCase();
            restaurants = restaurants.filter((restaurant) => {
                return (restaurant.name.toLowerCase().indexOf(restaurantFilter) >= 0);
            });
        }

        this.setState({displayedRestaurants: restaurants});
    }

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
                                   <div>
                                       <div>
                                           <SearchInput className="search-input"
                                                        onChange={this.searchRestaurantUpdated.bind(this)}/>
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
