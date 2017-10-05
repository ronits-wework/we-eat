import PropTypes from 'prop-types';
import React from 'react';

class RatingStar extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        starClass: PropTypes.string, //PropTypes.oneOf(['rated', 'toBeRated', 'unrated']),
        ratingPercent: PropTypes.number,
    };

    static defaultProps = {
        starClass: "",
        ratingPercent: 0,
    };

    render() {
        const starRatingStyle = {
            width: this.props.ratingPercent + "%"
        };
        return (
            <div className="rating-star">
                <div className="rating-star-colored" style={starRatingStyle}>
                    <span className={this.props.starClass}>★</span>
                </div>
                <div className="rating-star-empty">
                    <span>★</span>
                </div>
            </div>

        )
    }
}

export default class StarsRating extends React.Component {

    /**
     * @param props - Comes from your rails view.
     */
    constructor(props) {
        super(props);
    }

    static propTypes = {
        displayOnly: PropTypes.bool,
        rating: PropTypes.number,
        numStars: PropTypes.number.isRequired,
    };

    static defaultProps = {
        displayOnly: true,
        rating: 0,
        numStars: StarsRating.defaultStarNum,
    };

    static get defaultStarNum() {
        return 3;
    }


    render() {
        let stars = [];
        const starsToRate = Math.floor(this.props.rating);
        let partialStarRating = this.props.rating - starsToRate;
        for (let i = 0; i < this.props.numStars; i++) {
            let ratingPercent = 0;
            if (i < starsToRate) {
                ratingPercent = 100;
            }
            else if (i === starsToRate) {
                ratingPercent = partialStarRating * 100;
            }
            stars.push(<RatingStar key={i} starClass="rated" ratingPercent={ratingPercent} />);
        }
        return (
            <div className="stars-rating">
                {stars}
            </div>
        );

    }
}
