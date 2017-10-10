import React from 'react';
import PropTypes from 'prop-types';
import GoogleMap from 'google-map-react';
import MapMarker from './MapMarker';

const AnyReactComponent = ({text}) => <div>{text}</div>;

const fakeMarker = {
    get description() {
        return 'description';
    },
    get title() {
        return 'title';
    },
    get address() {
        return 'address';
    },
    get number() {
        return 'number';
    }
}


export default class MyGoogleMap extends React.Component {
    static propTypes = {
        center: PropTypes.array,
        zoom: PropTypes.number,
        markers: PropTypes.array,
    };

    static defaultProps = {
        center: [32.078668, 34.781235], // TODO: set according to location
        zoom: 14,
        markers: [],
        //greatPlaceCoords: {lat: 32.074974, lng: 34.781770}
    };

    shouldComponentUpdate = true;

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
                options={{
                    scrollwheel: true,
                }}
            >
                {this.props.markers.map((marker) => {
                    if (marker) {
                        return (<MapMarker
                            key={marker.id}
                            lat={marker.location.lat}
                            lng={marker.location.lng}
                            text={marker.title}
                        />)
                        // return (
                        //     <MapMarker
                        //         key={marker.id}
                        //         showBallonState={false}
                        //         onShowBallonStateChange={() => {
                        //         }}
                        //         hoverState={false}
                        //         onHoverStateChange={() => {
                        //         }}
                        //         lat={marker.location.lat}
                        //         lng={marker.location.lng}
                        //         marker={fakeMarker}
                        //     />
                        // )
                    }
                    return false;
                })}

            </GoogleMap>
        );
    }
}