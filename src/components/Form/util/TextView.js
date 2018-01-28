import React from 'react';
import OptionallyDisplayed from './OptionallyDisplayed.js';
import {bool, func} from 'prop-types';

export default class TextField extends React.Component{
	constructor(props){
		super(props);
		this.shouldDisplayError = this.shouldDisplayError.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
	}

	shouldDisplayError(){
		return this.props.showError && this.props.errorText !== '';
	}

	handleFocus(){
		this.props.handleOnFocus(this.props.id);
	}

	handleBlur(){
		console.log('blur handle', this.props)
		this.props.handleOnBlur(this.props.id, this.props.text||'');
	}

	render(){
		const {type, text, onFieldChange, errorText, id} = this.props;
		console.log('blur render', type, text, onFieldChange, errorText, id)
		return(
			<div className="form-field text-field">
				<input type={type || "text"}
				value={text}
				onChange={onFieldChange}
				onFocus={this.handleFocus}
				onBlur={this.handleBlur}
				id={id}/>
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
	showError: bool.isRequired,
	onFieldChange: func.isRequired
}