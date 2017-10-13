import React from 'react';
import PropTypes from 'prop-types';
import RestaurantMapMarker from './RestaurantMapMarker';
import GoogleMap from 'google-map-react';


export default class RestaurantsMap extends React.Component {
    static propTypes = {
        zoom: PropTypes.number,
        restaurants: PropTypes.array,
        onRestaurantsChange: PropTypes.func.isRequired,
        googleMapLoader: PropTypes.func.isRequired,
    };

    static defaultProps = {
        zoom: 14,
        restaurants: {},
    };

    constructor(props) {
        super(props);

        this.state = {
            center: [32.078668, 34.781235],
            initDefaultCenter: false,
        }
    }


    componentWillMount() {
        if (!this.state.initDefaultCenter && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    center: [position.coords.latitude, position.coords.longitude],
                    initDefaultCenter: true
                });
            });
        }
    }


    render() {
        return (
            <GoogleMap
                resetBoundsOnResize
                // apiKey={YOUR_GOOGLE_MAP_API_KEY} // set if you need stats etc ...
                libraries
                center={this.state.center}
                zoom={this.props.zoom}
                googleMapLoader={this.props.googleMapLoader}
            >
                {this.props.restaurants.map((restaurant) => {
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