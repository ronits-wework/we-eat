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
    };

    render() {
        return (
            <div className="dropdown-input form-group">
                {this.props.label}
                <Select
                    name={this.props.name}
                    value={this.props.getValue()}
                    options={this.props.options}
                    onChange={(value) => this.props.setValue(value)}
                />
            </div>
        );
    }
};
export default HOC(DropdownInput);