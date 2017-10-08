import React from 'react';
import PropTypes from 'prop-types';

export default class CheckboxFilter extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        onCheckChange: PropTypes.func.isRequired,
        isChecked: PropTypes.bool.isRequired,
        inputName: PropTypes.string,
        label: PropTypes.string.isRequired
    };

    render() {
        return (
            <div className="checkbox-wrapper">
                {this.props.label}
                <input
                    name={this.props.inputName}
                    type="checkbox"
                    checked={this.props.isChecked}
                    onChange={this.props.onCheckChange}/>
            </div>
        );
    }
}