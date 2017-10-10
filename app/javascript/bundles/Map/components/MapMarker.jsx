import PropTypes from 'prop-types';
import React from 'react';
import ReactTooltip from 'react-tooltip';
import cx from 'classnames';

export default class MapMarker extends React.Component {
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
        //ratingPercent: PropTypes.number,
    };

    static defaultProps = {
        text: "",
        //starClass: "",
        //ratingPercent: 0,
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
                 data-tip={this.props.text}
            >
                <img className="marker-icon" />
                <div className="marker-text">
                    {this.props.text}
                </div>
                <ReactTooltip type="light" effect='solid' />
            </div>

        )
    }
}
