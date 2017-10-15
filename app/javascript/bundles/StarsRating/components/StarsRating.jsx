import PropTypes from 'prop-types';
import React from 'react';
import RatingStar from './RatingStar'


const DEFAULT_STAR_NUM = 3;

const starRatingEvents = Object.freeze({
    STAR_CLICK: Symbol("starClick"),
    STAR_ENTER: Symbol("starEnter"),
    STAR_LEAVE: Symbol("starLeave"),
    ENTER: Symbol("enter"),
    LEAVE: Symbol("leave")
});


export default class StarsRating extends React.Component {

    /**
     * @param props - Comes from your rails view.
     */
    constructor(props) {
        super(props);

        this.state = {
            hoveredStar: null,
            clickedStar: null,
            rating: this.props.interactiveRating ? 0 : this.props.rating,
            isHoverMode: false,
        }

        this.isHoverMode = false;
    }

    static propTypes = {
        interactiveRating: PropTypes.bool,
        rating: PropTypes.number,
        numStars: PropTypes.number.isRequired,
        onRating: PropTypes.func,
    };

    static defaultProps = {
        interactiveRating: true,
        rating: 0,
        numStars: DEFAULT_STAR_NUM,
        onRating: () => {
        },
    };


    handleEvent(eventName, eventParams) {
        if (!this.props.interactiveRating) {
            return;
        }

        switch (eventName) {
            case starRatingEvents.STAR_CLICK:
                this.handleStarClick(eventParams.starNum);
                break;
            case starRatingEvents.STAR_ENTER:
                this.handleStarMouseEnter(eventParams.starNum);
                break;
            case starRatingEvents.STAR_LEAVE:
                this.handleStarMouseLeave(eventParams.starNum);
                break;
            case starRatingEvents.ENTER:
                this.handleMouseEnter();
                break;
            case starRatingEvents.LEAVE:
                this.handleMouseLeave();
                break;
        }
    }

    handleStarClick(i) {
        const newRating = (i + 1);
        this.setState({
            clickedStar: i,
            rating: newRating,
            isHoverMode: false
        });
        this.props.onRating(newRating);
    }

    handleStarMouseEnter(i) {
        this.setState({hoveredStar: (i + 1)});
    }

    handleStarMouseLeave(i) {
        this.setState({hoveredStar: null});
    }

    handleMouseEnter() {
        this.setState({isHoverMode: true});
    }

    handleMouseLeave() {
        this.setState({isHoverMode: false});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.rating != this.state.rating) {
            this.setState({rating: nextProps.rating});
            this.props.onRating(nextProps.rating);
        }
    }

    render() {
        let stars = [];
        const starClass = this.state.isHoverMode ? "to-be-rated" : "rated";
        let rating = (this.state.isHoverMode && this.state.hoveredStar) ? this.state.hoveredStar : this.state.rating;
        const starsToRate = Math.floor(rating);
        let partialStarRating = rating - starsToRate;
        for (let i = 0; i < this.props.numStars; i++) {
            let ratingPercent = 0;
            if (i < starsToRate) {
                ratingPercent = 100;
            }
            else if (i === starsToRate) {
                ratingPercent = partialStarRating * 100;
            }
            stars.push(
                <RatingStar
                    key={i} starClass={starClass}
                    ratingPercent={ratingPercent}
                    onClick={() => this.handleEvent(starRatingEvents.STAR_CLICK, {starNum: i})}
                    onMouseEnter={() => this.handleEvent(starRatingEvents.STAR_ENTER, {starNum: i})}
                    onMouseLeave={() => this.handleEvent(starRatingEvents.STAR_LEAVE, {starNum: i})}
                />);
        }
        return (
            <div className="stars-rating"
                 onMouseEnter={() => this.handleEvent(starRatingEvents.ENTER, {})}
                 onMouseLeave={() => this.handleEvent(starRatingEvents.LEAVE, {})}>
                {stars}
            </div>
        );

    }
}
