import PropTypes from 'prop-types';
import React from 'react';
import StarsRating from "../../Widgets/components/StarsRating";

export default class RestaurantCard extends React.Component {

    /**
     * @param props - Comes from your rails view.
     */
    constructor(props) {
        super(props);
    }

    static propTypes = {
        restaurant: PropTypes.object.isRequired,
    };


    render() {
        const restaurant = this.props.restaurant;
        return (
            <div key={restaurant.id} className="card restaurant-card">
                <div className="card-block text-center">
                    <img className="restaurant-logo" src={restaurant.logo}/>
                    <h4 className="card-title">{restaurant.name}</h4>

                    <div className="card-body">
                        <div>{restaurant.address}</div>
                        {restaurant.speed && (<div>{restaurant.speed} minute delivery</div>)}
                        {restaurant.kosher === true && (<div>Kosher</div>)}
                        {restaurant.rating && (<StarsRating rating={parseInt(restaurant.rating)}/>)}
                        {restaurant.accepts_10bis && (
                            <img src="assets/10bis.png" className="icon-10-bis restaurant-icon"/>
                        )}
                    </div>
                </div>
            </div>
        );

    }
}
