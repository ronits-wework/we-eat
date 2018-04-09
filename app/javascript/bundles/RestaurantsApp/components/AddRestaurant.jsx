import PropTypes from 'prop-types';
import React from 'react';
import Formsy from 'formsy-react';
import TextInput from '../../Forms/components/TextInput';
import DropdownInput from '../../Forms/components/DropdownInput';
import CheckboxInput from '../../Forms/components/CheckboxInput';
import AddressInput, {getCoordinates} from '../../Forms/components/AddressInput';
import cx from 'classnames';


Formsy.addValidationRule('minTwoChars', function (values, value) {
    return typeof value !== 'undefined' && value !== '' && value.length >= 2;
});


export default class AddRestaurantForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormValid: false,
            isFormSubmitted: false,
            isSubmitting: false,
        }
        this.submit = this.submit.bind(this);
        this.setValid = this.setValid.bind(this);
        this.setInvalid = this.setInvalid.bind(this);

    }

    const stam2 = true;

    static propTypes = {
        cuisines: PropTypes.array.isRequired,
        onClose: PropTypes.func.isRequired,
        onAdd: PropTypes.func.isRequired,
        deliveryTimes: PropTypes.array.isRequired,
    };


    setValid() {
        this.setState({
            isFormValid: true
        });
    }

    setInvalid() {
        this.setState({
            isFormValid: false
        });
    }

    submit(model) {
        this.setState({isFormSubmitted: true});
        if (this.state.isFormValid) {
            const {
                onAdd,
                onClose
            } = this.props;
            this.setState({isSubmitting: true});
            getCoordinates(model.address)
                .then((coords) => {

                    const restaurant = {
                        restaurant: {
                            name: model.restaurantName,
                            speed: model.speed ? model.speed.value : null,
                            cuisine_types: model.cuisineType ? model.cuisineType.map((cuisine) => cuisine.value) : [],
                            address: model.address,
                            longitude: coords ? coords.longitude : null,
                            latitude: coords ? coords.latitude : null,
                            accepts_10bis: model.accepts10bis || false,
                            kosher: model.isKosher || false,
                        }
                    };

                    const data = JSON.stringify(restaurant);

                    return fetch("/restaurants",
                        {
                            method: "POST",
                            body: data,
                            headers: {
                                'Accept': 'application/json, text/plain, */*',
                                'Content-Type': 'application/json'
                            },
                        })
                })
                .then(function (res) {
                    const url = res.url.split('/');
                    const id = url[url.length - 1];
                    onAdd(id);
                    onClose();
                })
                .catch(function (error) {
                    console.error(error);
                });

        }
    }

    render() {
        const formClass = cx('form', {
            'submitted': this.state.isFormSubmitted,
            'not-submitted': !this.state.isFormSubmitted,
            'wait': this.state.isSubmitting,
        });
        return (
            <div className="add-restaurant custom-form">
                <h3 className="form-header">Add a Restaurant</h3>
                <Formsy.Form
                    onSubmit={this.submit}
                    onValid={this.setValid}
                    onInvalid={this.setInvalid}
                    className={formClass}
                >
                    <div className="form-content">
                        <TextInput
                            name="restaurantName"
                            validations="minTwoChars"
                            label="Restaurant Name"
                            validationErrors={{
                                isDefaultRequiredValue: 'Field is required',
                                minTwoChars: "Type at least two characters"
                            }}
                            required/>
                        <DropdownInput
                            name="cuisineType"
                            label="Choose Cuisines"
                            options={this.props.cuisines}
                            multi={true}
                        />
                        <DropdownInput
                            name="speed"
                            label="Delivery time (minutes)"
                            options={this.props.deliveryTimes}
                        />
                        <AddressInput
                            name="address"
                            label="Address"
                        />
                        <CheckboxInput
                            name="accepts10bis"
                            label="Accepts 10bis"
                        />
                        <CheckboxInput
                            name="isKosher"
                            label="Is kosher"
                        />
                    </div>
                    <div className="footer">
                        <button onClick={this.props.onClose}>Cancel</button>
                        <button type="submit" disabled={this.state.isSubmitting}>Submit</button>
                    </div>
                </Formsy.Form>
            </div>
        );
    }
}