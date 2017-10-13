import React from 'react';
import {HOC} from 'formsy-react';
import PropTypes from 'prop-types';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';

class AddressInput extends React.Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        label: PropTypes.string.isRequired,
        name: PropTypes.string,
    };

    render() {
        const className = "";
        const errorMessage = this.props.getErrorMessage();
        const inputProps = {
            name: this.props.name,
            value: this.props.getValue(),
            onChange: (value) => this.props.setValue(value),
        };

        const myStyles = {
            input: { padding: 0 },
            root: { marginBottom: '10px' },
        }

        return (
            <div className={className}>
                {this.props.label}
                <PlacesAutocomplete
                    inputProps={inputProps}
                    styles={myStyles}
                />
                <span className='validation-error'>{errorMessage}</span>
            </div>
        );
    }
};
export default HOC(AddressInput);

export function getCoordinates(address) {
    return geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => { return {longitude: latLng.lng, latitude: latLng.lat}})
        .catch(error => null);
}