import React from 'react';
import PropTypes from 'prop-types';
import GoogleMap from 'google-map-react';
import RestaurantMapMarker from './RestaurantMapMarker';


export default class RestaurantsMap extends React.Component {
    static propTypes = {
        center: PropTypes.array,
        zoom: PropTypes.number,
        restaurants: PropTypes.object,
        onRestaurantsChange: PropTypes.func.isRequired,
    };

    static defaultProps = {
        center: [32.078668, 34.781235], // TODO: set according to location
        zoom: 14,
        restaurants: {},
    };

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <GoogleMap
                resetBoundsOnResize
                // apiKey={YOUR_GOOGLE_MAP_API_KEY} // set if you need stats etc ...
                center={this.props.center}
                zoom={this.props.zoom}
            >
                {Object.keys(this.props.restaurants).map((id) => {
                    const restaurant = this.props.restaurants[id];
                    return (<RestaurantMapMarker
                        key={restaurant.id}
                        lat={restaurant.latitude}
                        lng={restaurant.longitude}
                        text={restaurant.name}
                        restaurant={restaurant}
                        onRestaurantsChange={this.props.onRestaurantsChange}
                    />)
                })}
            </GoogleMap>
        );
    }
}