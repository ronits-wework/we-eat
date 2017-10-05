import PropTypes from 'prop-types';
import React from 'react';
import {MAX_RESTAURANT_RATING} from '../../RestaurantsApp/components/RestaurantsApp'
import StarsRating from './StarsRating'

export default class StarsRatingFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isFiltering: false,
        }
    }

    static propTypes = {
        minRatingFiltered: PropTypes.func.isRequired,
    };

    render() {
        return (
            <div className="stars-rating-filter">
                <StarsRating
                    ref={instance => { this.starsRating = instance; }}
                    numStars={MAX_RESTAURANT_RATING}
                    interactiveRating={true}
                    ratingCallback={this.props.minRatingFiltered.bind(this)}
                />
                <span onClick={() => {this.starsRating.setRating(0)}}>X</span>
            </div>

        )
    }
}
