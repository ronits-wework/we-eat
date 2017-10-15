import React from 'react';
import PropTypes from 'prop-types';

export default class CheckboxFilter extends React.Component {

    static propTypes = {
        onCheckChange: PropTypes.func.isRequired,
        isChecked: PropTypes.bool.isRequired,
        inputName: PropTypes.string,
        label: PropTypes.string.isRequired
    };

    render() {
        return (
            <div className="checkbox-wrapper">
                <input
                    name={this.props.inputName}
                    type="checkbox"
                    checked={this.props.isChecked}
                    onChange={this.props.onCheckChange}/>
                {this.props.label}
            </div>
        );
    }
}