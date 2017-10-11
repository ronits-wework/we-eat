import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import RestaurantCard from "../../RestaurantsApp/components/RestaurantCard";
import ReactTooltip from 'react-tooltip';

export default class RestaurantMapMarker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isHovered: false,
        }

        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    static propTypes = {
        text: PropTypes.string,
        restaurant: PropTypes.object.isRequired,
        onRestaurantsChange: PropTypes.func.isRequired,
    };

    static defaultProps = {
        text: "",
    };

    onMouseEnter() {
        this.setState({isHovered: true});
    }

    onMouseLeave() {
        this.setState({isHovered: false});
    }

    render() {
        const markerClass = cx('map-marker', {
            'hovered': this.state.isHovered,
        });
        return (
            <div className={markerClass}
                 onMouseEnter={this.onMouseEnter}
                 onMouseLeave={this.onMouseLeave}
                 data-tip=""
                 data-for="restaurants-map-tooltip"
            >
                <img className="marker-icon" />
                <div className="marker-text">
                    {this.props.text}
                </div>
                <ReactTooltip
                    id="restaurants-map-tooltip"
                    class="map-marker-tooltip"
                    type="light"
                    effect='solid'
                    delayHide={200}
                >
                    {this.props.restaurant && this.state.isHovered && (
                        <RestaurantCard
                            restaurant={this.props.restaurant}
                            onRestaurantChange={this.props.onRestaurantsChange}
                        />
                    )}
                </ReactTooltip>
            </div>

        )
    }
}
