import PropTypes from 'prop-types';
import React from 'react';
import {MAX_RESTAURANT_RATING} from '../../RestaurantsApp/components/RestaurantsApp'
import StarsRating from './StarsRating'

export default class StarsRatingFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isFiltering: false,
            rating: 0,
        }
    }

    static propTypes = {
        onRating: PropTypes.func.isRequired,
        rating: PropTypes.number
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.rating != this.props.rating) {
            this.setState({ rating: nextProps.rating});
        }
    }

    render() {
        return (
            <div className="stars-rating-filter-wrapper">
                <div className="stars-rating-filter">
                    <StarsRating
                        numStars={MAX_RESTAURANT_RATING}
                        interactiveRating={true}
                        onRating={this.props.onRating.bind(this)}
                        rating={this.state.rating}
                    />
                    <button type="button" className="close" aria-label="Close"
                            onClick={() => {
                                this.setState({ rating: 0});
                            }}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        )
    }
}
