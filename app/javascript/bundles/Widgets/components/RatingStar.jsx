import PropTypes from 'prop-types';
import React from 'react';

export default class RatingStar extends React.Component {
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
            <div className="rating-star" onClick={this.props.onClick}
                 onMouseEnter={this.props.onMouseEnter} onMouseLeave={this.props.onMouseLeave}>
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
