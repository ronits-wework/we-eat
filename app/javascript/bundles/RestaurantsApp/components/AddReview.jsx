import PropTypes from 'prop-types';
import React from 'react';
import Formsy from 'formsy-react';
import TextInput from '../../Forms/components/TextInput';
import StarsRatingFilter from "../../StarsRating/components/StarsRatingFilter"


export default class AddReviewForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormValid: false,
            isFormSubmitted: false,
            userRating: 0,
        }
        this.submit = this.submit.bind(this);
        this.setValid = this.setValid.bind(this);
        this.setInvalid = this.setInvalid.bind(this);

    }

    static propTypes = {
        restaurant: PropTypes.object.isRequired,
        onClose: PropTypes.func.isRequired,
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
            this.props.onClose();
            const review = {
                review: {
                    rating: this.state.userRating,
                    restaurant_id: this.props.restaurant.id,
                    name: model.userName,
                    comment: model.comment
                }
            };

            const data = JSON.stringify(review);
            fetch("/reviews",
                {
                    method: "POST",
                    body: data,
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                })
                .then(function (response) {

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
            <div className="add-review custom-form">
                <h3 className="form-header">Rate {this.props.restaurant.name}</h3>
                <Formsy.Form onSubmit={this.submit} onValid={this.setValid} onInvalid={this.setInvalid}
                             className={formClass}>
                    <div className="form-content">
                        <TextInput
                            name="userName"
                            label="Name"
                        />
                        <TextInput
                            name="comment"
                            label="Comment"
                        />
                        <StarsRatingFilter
                            minRatingFiltered={(rating) => {
                                this.setState({userRating: rating})
                            }}
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