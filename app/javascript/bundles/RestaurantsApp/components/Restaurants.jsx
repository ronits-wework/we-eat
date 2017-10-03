import PropTypes from 'prop-types';
import React from 'react';
import RestaurantCard from "./RestaurantCard";


export default class Restaurants extends React.Component {

    /**
     * @param props - Comes from your rails view.
     */
    constructor(props) {
        super(props);
    }

    static propTypes = {
        restaurants: PropTypes.array.isRequired,
    };


    render() {
        const restaurantList = this.props.restaurants.map((restaurant) => {
            return (
                <div key={restaurant.id} className="restaurant-card-wrapper">
                    <RestaurantCard restaurant={restaurant}/>
                </div>
            )
        });
        return (
            <div className="restaurants">
                <h1>
                    Restaurants
                </h1>
                {restaurantList}
            </div>
        );
    }
}
