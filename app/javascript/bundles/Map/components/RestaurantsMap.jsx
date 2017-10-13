import React from 'react';
import PropTypes from 'prop-types';
import RestaurantMapMarker from './RestaurantMapMarker';
import GoogleMap from 'google-map-react';


export default class RestaurantsMap extends React.Component {
    static propTypes = {
        zoom: PropTypes.number,
        restaurants: PropTypes.array,
        onRestaurantsChange: PropTypes.func.isRequired,
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

        this.loadPromise = null;
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

    loadGoogleMap() {
        // Asynchronously load the Google Maps script, passing in the callback reference
        return this.loadJS('https://maps.googleapis.com/maps/api/js?libraries=places&callback=_$_google_map_initialize_$_')
    }

    loadJS(src) {
        if (this.loadPromise) {
            return this.loadPromise;
        }

        var ref = window.document.getElementsByTagName("script")[0];
        var script = window.document.createElement("script");
        script.src = src;
        script.async = true;
        ref.parentNode.insertBefore(script, ref);
        this.loadPromise = new Promise((resolve, reject) => {

            if (window.google && window.google.maps) {
                resolve(window.google.maps);
                return;
            }

            if (typeof window._$_google_map_initialize_$_ !== 'undefined') {
                reject(new Error('google map initialization error'));
            }

            script.onerror = () => {
                reject(new Error('google map initialization error'));
            };

            window._$_google_map_initialize_$_ = () => {
                delete window._$_google_map_initialize_$_;
                resolve(window.google.maps);
            };
        });
        return this.loadPromise;
    }


    render() {
        return (
            <GoogleMap
                resetBoundsOnResize
                // apiKey={YOUR_GOOGLE_MAP_API_KEY} // set if you need stats etc ...
                libraries
                center={this.state.center}
                zoom={this.props.zoom}
                googleMapLoader={this.loadGoogleMap.bind(this)}
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