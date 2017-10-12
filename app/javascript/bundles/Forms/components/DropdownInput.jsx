import React from 'react';
import {HOC} from 'formsy-react';
import Select from 'react-select';
import PropTypes from 'prop-types';

class DropdownInput extends React.Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        options: PropTypes.array.isRequired,
        label: PropTypes.string.isRequired,
        name: PropTypes.string,
        multi: PropTypes.bool,
    };

    static defaultProps = {
        multi: false,
    }

    render() {
        const className = 'dropdown-input form-group' + (this.props.className || ' ') + (this.props.showRequired() ? 'required' : this.props.showError() ? 'error' : null);
        const errorMessage = this.props.getErrorMessage();
        return (
            <div className={className}>
                {this.props.label}
                <Select
                    name={this.props.name}
                    value={this.props.getValue()}
                    options={this.props.options}
                    onChange={(value) => this.props.setValue(value)}
                    multi={this.props.multi}
                />
                <span className='validation-error'>{errorMessage}</span>
            </div>
        );
    }
};
export default HOC(DropdownInput);