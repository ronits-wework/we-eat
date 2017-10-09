import PropTypes from 'prop-types';
import React from 'react';
import Formsy from 'formsy-react';
import TextInput from '../../Forms/components/TextInput';
import DropdownInput from '../../Forms/components/DropdownInput';
import CheckboxInput from '../../Forms/components/CheckboxInput';


Formsy.addValidationRule('minTwoChars', function (values, value) {
    return typeof value !== 'undefined' && value !== '' && value.length >= 2;
});


export default class AddRestaurantForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormValid: false,
            isFormSubmitted: false,
        }
        this.submit = this.submit.bind(this);
        this.setValid = this.setValid.bind(this);
        this.setInvalid = this.setInvalid.bind(this);

    }

    static propTypes = {
        cuisines: PropTypes.array.isRequired,
        onClose: PropTypes.func.isRequired,
        onAdd: PropTypes.func.isRequired,
        deliveryTimes: PropTypes.array.isRequired,
    };

    getInitialState() {
        return {
            isFormValid: false
        }
    }

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
            const restaurant = {
                restaurant: {
                    name: model.restaurantName,
                    speed: model.speed.value || null,
                    cuisine_types: model.cuisineType ? [model.cuisineType.value] : [],
                    accepts_10bis: model.accepts10bis || false,
                    kosher: model.isKosher || false,
                }
            };

            const data = JSON.stringify(restaurant);
            const onAdd = this.props.onAdd;
            const onClose = this.props.onClose;

            fetch("/restaurants",
                {
                    method: "POST",
                    body: data,
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                })
                .then(function (response) {
                    onAdd();
                    onClose();
                })
                .catch(function (error) {
                    console.log(error);
                });

        }
    }

    render() {
        let formClass = this.state.isFormSubmitted ? "submitted" : "not-submitted";
        formClass += " form";
        return (
            <div className="add-restaurant custom-form">
                <h3 className="form-header">Add a Restaurant</h3>
                <Formsy.Form onSubmit={this.submit} onValid={this.setValid} onInvalid={this.setInvalid}
                             className={formClass}>
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
                            label="Choose a Cuisine"
                            options={this.props.cuisines}
                        />
                        <DropdownInput
                            name="speed"
                            label="Delivery time (minutes)"
                            options={this.props.deliveryTimes}
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
                        <button type="submit">Submit</button>
                    </div>
                </Formsy.Form>
            </div>
        );
    }
}