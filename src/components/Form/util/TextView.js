import React from 'react';
import OptionallyDisplayed from './OptionallyDisplayed.js';
import {bool func} from 'prop-types';

export default class TextField extends React.Component{
	constructor(props){
		super(props);
		this.shouldDisplayError = this.shouldDisplayError.bind(this);
	}

	shouldDisplayError(){
		return this.props.showError && this.props.errorText !== '';
	}

	render(){
		const {type, placeholder, text, onFieldChange, errorText} = this.props;
		return(
			<div className="form-field text-field">
				<input type={type || "text"}
				placeholder={placeholder}
				value={this.props.text}
				onChange={this.props.onFieldChange}/>
				<OptionallyDisplayed display={this.shouldDisplayError()}>
					<div className="validation-error">
						<span className={type}>{errorText}</span>
					</div>
				</OptionallyDisplayed>

			</div>
			);
	}
}

TextField.propTypes = {
	showError = bool.isRequired,
	onFieldChange: func.isRequired
}