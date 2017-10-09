import PropTypes from 'prop-types';
import React from 'react';
import StarsRating from "../../StarsRating/components/StarsRating";
import {MAX_RESTAURANT_RATING} from './RestaurantsApp'
import Modal from 'react-modal';
import AddReviewForm from "./AddReview";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        height: '400px',
        width: '400px',
    }
};

export default class RestaurantCard extends React.Component {

    /**
     * @param props - Comes from your rails view.
     */
    constructor(props) {
        super(props);

        this.state = {
            rateModalIsOpen: false,
            userRating: 0,
        }

        this.openRateModal = this.openRateModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeRateModal = this.closeRateModal.bind(this);
    }

    static propTypes = {
        restaurant: PropTypes.object.isRequired,
    };

    openRateModal() {
        this.setState({rateModalIsOpen: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        //this.subtitle.style.color = '#f00';
    }

    closeRateModal() {
        this.setState({rateModalIsOpen: false});
    }


    render() {
        const restaurant = this.props.restaurant;
        const cuisineTypes = restaurant.cuisine_types.map((cuisineType) => cuisineType.cuisine);
        return (
            <div key={restaurant.id} className="card restaurant-card">
                <div className="card-block text-center">
                    <img className="restaurant-logo" src={restaurant.logo}/>
                    <h4 className="card-title">{restaurant.name}</h4>

                    <div className="card-body">
                        <div>{restaurant.address}</div>
                        {restaurant.speed && (<div>{restaurant.speed} minute delivery</div>)}
                        {restaurant.kosher === true && (<div>Kosher</div>)}
                        {restaurant.rating && (
                            <StarsRating
                                rating={parseFloat(restaurant.rating)}
                                interactiveRating={false}
                                numStars={MAX_RESTAURANT_RATING}
                            />
                        )}
                        {restaurant.accepts_10bis && (
                            <img className="icon-10-bis restaurant-icon"/>
                        )}
                        <div>
                            {cuisineTypes}
                        </div>
                        <button onClick={this.openRateModal}>Rate</button>
                        <Modal
                            isOpen={this.state.rateModalIsOpen}
                            onAfterOpen={this.afterOpenModal}
                            onRequestClose={this.closeRateModal}
                            style={customStyles}
                            contentLabel="Rate restaurant"
                            shouldCloseOnOverlayClick={false}
                        >
                            <AddReviewForm
                                restaurant={restaurant}
                                onClose={this.closeRateModal}
                            />
                        </Modal>
                    </div>
                </div>
            </div>
        );

    }
}
