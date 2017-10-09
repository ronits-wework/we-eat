import React from 'react';
import {HOC} from 'formsy-react';

class CheckboxInput extends React.Component {

    render() {
        const className = 'checkbox-input form-group' + (this.props.className || ' ') + (this.props.showRequired() ? 'required' : this.props.showError() ? 'error' : null);
        const errorMessage = this.props.getErrorMessage();
        return (
            <div className={className}>
                <input
                    name={this.props.inputName}
                    type="checkbox"
                    checked={this.props.getValue()}
                    onChange={(e) => this.props.setValue(e.target.checked)}/>
                {this.props.label}
                <span className='validation-error'>{errorMessage}</span>
            </div>
        );
    }
};
export default HOC(CheckboxInput);