import PropTypes from 'prop-types';
import React from 'react';

export default class StarsRating extends React.Component {

    /**
     * @param props - Comes from your rails view.
     */
    constructor(props) {
        super(props);

    }

    static propTypes = {
        displayOnly: PropTypes.bool,
        rating: PropTypes.number.isRequired,
        numStars: PropTypes.number.isRequired,
    };

    static defaultProps = {
        displayOnly: true,
        numStars: StarsRating.defaultStarNum,
    };

    static get starWidth() {
        return 22;
    }

    static get defaultStarNum() {
        return 3;
    }


    render() {
        const topRatingStyle = {
            width: (this.props.rating / this.props.numStars) * 100 + "%"
        };
        const ratingStyle = {
            width: StarsRating.starWidth * this.props.numStars + "px"
        };
        let stars = [];
        for (let i = 0; i < this.props.numStars; i++) {
            stars.push(<span key={i}>★</span>);
        }
        return (
            <div className="stars-rating" style={ratingStyle}>
                <div className="stars-rating-top" style={topRatingStyle}>
                    {stars}
                </div>
                <div className="stars-rating-bottom">
                    {stars}
                </div>
            </div>
        );

    }
}