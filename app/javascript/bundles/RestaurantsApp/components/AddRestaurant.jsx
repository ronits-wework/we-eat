import PropTypes from 'prop-types';
import React from 'react';
import Formsy from 'formsy-react';
import TextInput from '../../Forms/components/TextInput';
import DropdownInput from '../../Forms/components/DropdownInput';


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
        onCancel: PropTypes.func.isRequired,
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
        if (!this.state.isFormValid) {

        }
        this.setState({isFormSubmitted: true});
    }

    render() {
        let formClass = this.state.isFormSubmitted ? "submitted" : "not-submitted";
        formClass += " form";
        return (
            <div className="add-restaurant custom-form">
                <h3 className="form-header">Add a Restaurant</h3>
                <Formsy.Form onSubmit={this.submit} onValid={this.setValid} onInvalid={this.setInvalid} className={formClass}>
                    <div className="form-content">
                        <TextInput
                            name="restaurantName"
                            validations="minTwoChars"
                            validationError="Restaurant name must have at least two characters"
                            label="Restaurant Name"
                            validationErrors={{
                                isDefaultRequiredValue: 'Field is required'
                            }}
                            required/>
                        <DropdownInput
                            name="cuisineType"
                            label="Choose a cuisine"
                            options={this.props.cuisines}
                            required
                        />
                    </div>
                    <div className="footer">
                        <button onClick={this.props.onCancel}>Cancel</button>
                        <button type="submit">Submit</button>
                    </div>
                </Formsy.Form>
            </div>
        );
    }
}