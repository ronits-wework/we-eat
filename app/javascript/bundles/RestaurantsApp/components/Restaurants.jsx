import PropTypes from 'prop-types';
import React from 'react';
import RestaurantCard from "./RestaurantCard";


export default class Restaurants extends React.Component {

    static propTypes = {
        restaurants: PropTypes.array.isRequired,
        onRestaurantsChange: PropTypes.func.isRequired,
        onRestaurantClick: PropTypes.func.isRequired,
        onRestaurantEnter: PropTypes.func.isRequired,
        onRestaurantLeave: PropTypes.func.isRequired,
    };


    render() {
        const restaurantList = this.props.restaurants.map((restaurant) => {
            return (
                <div
                    key={restaurant.id}
                    className="restaurant-card-wrapper"
                    onClick={() => this.props.onRestaurantClick(restaurant)}
                    onMouseEnter={() => this.props.onRestaurantEnter(restaurant)}
                    onMouseLeave={() => this.props.onRestaurantLeave(restaurant)}
                >
                    <RestaurantCard
                        restaurant={restaurant}
                        onRestaurantChange={this.props.onRestaurantsChange}
                    />
                </div>
            )
        });
        return (
            <div className="restaurants">
                {restaurantList}
            </div>
        );
    }
}
