import React from 'react';
import PropTypes from 'prop-types';
import RestaurantMapMarker from './RestaurantMapMarker';
import GoogleMap from 'google-map-react';


export default class RestaurantsMap extends React.Component {
    static propTypes = {
        restaurants: PropTypes.array,
        onRestaurantsChange: PropTypes.func.isRequired,
        googleMapLoader: PropTypes.func.isRequired,
        selectedRestaurant: PropTypes.object,
        centerRestaurant: PropTypes.object,
    };

    static defaultProps = {
        restaurants: {},
    };

    constructor(props) {
        super(props);

        this.state = {
            center: [32.078668, 34.781235],
            zoom: 14,
        }
    }


    componentWillMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    center: [position.coords.latitude, position.coords.longitude],
                });
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.centerRestaurant !== nextProps.centerRestaurant) {
            const restaurant = nextProps.centerRestaurant;
            this.setState({
                center: [parseFloat(restaurant.latitude), parseFloat(restaurant.longitude)],
                zoom: 16,
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
                zoom={this.state.zoom}
                googleMapLoader={this.props.googleMapLoader}
            >
                {this.props.restaurants.map((restaurant) => {
                    return (<RestaurantMapMarker
                        key={restaurant.id}
                        lat={restaurant.latitude}
                        lng={restaurant.longitude}
                        text={restaurant.name}
                        restaurant={restaurant}
                        isSelected={(this.props.selectedRestaurant ? (this.props.selectedRestaurant.id === restaurant.id) : false)}
                        onRestaurantsChange={this.props.onRestaurantsChange}
                    />)
                })}
            </GoogleMap>
        );
    }
}