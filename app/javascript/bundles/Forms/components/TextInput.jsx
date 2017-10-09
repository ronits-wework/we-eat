import React from 'react';
import {HOC} from 'formsy-react';

class TextInput extends React.Component {

    render() {
        const className = 'text-input form-group' + (this.props.className || ' ') + (this.props.showRequired() ? 'required' : this.props.showError() ? 'error' : null);
        const errorMessage = this.props.getErrorMessage();
        return (
            <div className={className}>
                {this.props.label}
                <input value={this.props.getValue()} onChange={(e) => this.props.setValue(e.target.value)}/>
                <span className='validation-error'>{errorMessage}</span>
            </div>
        );
    }
};
export default HOC(TextInput);