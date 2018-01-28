import React, {Component} from 'react';
import TextView from './util/TextView';
import {run, ruleRunner} from './validation/ruleRunner';
import { required, mustMatch, minLength } from './validation/rules';
import update from 'immutability-helper';

const fieldValidations = [
	ruleRunner("firstName", "First Name", required),
	ruleRunner("emailAddress", "Email Address", required),
	ruleRunner("password1", "Password", required, minLength(6)),
	ruleRunner("password2", "Password Confirmation", mustMatch("password1", "Password")),
];


export default class CreateAccount extends Component{

	constructor(props){
		super(props);
		this.handleFieldChanged = this.handleFieldChanged.bind(this);
		this.handleSubmitClicked = this.handleSubmitClicked.bind(this);
		this.errorFor = this.errorFor.bind(this);
		this.getGroupClassName = this.getGroupClassName.bind(this);
		this.handleOnFocus = this.handleOnFocus.bind(this);
		this.handleOnBlur = this.handleOnBlur.bind(this);
		this.state = {
			showErrors: false,
			validationErrors: {},
			labelautomation: {}
		}
	}

	componentWillMount(){
		this.setState({validationErrors: run(this.state, fieldValidations)});
	}

	errorFor(field){
		return this.state.validationErrors[field] || '';
	}

	handleFieldChanged(field){
		return(e) => {
			// console.log("target value", field, e.target.value);
			const newState = update(this.state, {
				[field]: {$set: e.target.value}
			});
			newState.validationErrors = run(newState, fieldValidations);
			this.setState(newState);
		};
	}
	getGroupClassName(field){
		return this.state.labelautomation[field]? 'focused': '';
	}

	handleOnFocus(id){
		console.log('focus')
		if(!this.getGroupClassName(id)){
			const newState = update(this.state, {
					labelautomation:{
						[id]: {$set: true}
					}
				});
			this.setState(newState);
			console.log(newState.labelautomation)
		}
	}

	handleOnBlur(id, text){
		console.log('blur', id, text)
		if(text === ''){
			const newState = update(this.state, {
				labelautomation:{
					[id]: {$set: false}
				}
			});
			this.setState(newState);
		}
	}

	handleSubmitClicked(){
		this.setState({showErrors: true});
		if(Object.keys(this.state.validationErrors).length !== 0) return null;
		return this.props.onCreateAccount(this.state);
	}

	render(){
		return(
			<div className="create-account">
				<h2> Create New Account </h2>
				<div className={`form-group ${this.getGroupClassName("firstName")}`}>
				<label className="lbl firstname" htmlFor="firstName">First Name</label>
					<TextView	showError={this.state.showErrors} type="text" id="firstName"
										text={this.state.firstName} onFieldChange={this.handleFieldChanged("firstName")}
										handleOnFocus={this.handleOnFocus} handleOnBlur={this.handleOnBlur}
										errorText={this.errorFor("firstName")} />
				</div>
				<div className={`form-group ${this.getGroupClassName("email")}`}>
				<label className="lbl email" htmlFor="email">Email Address</label>
					<TextView	showError={this.state.showErrors} type="email" id="email"
										text={this.state.emailAddress} onFieldChange={this.handleFieldChanged("emailAddress")}
										handleOnFocus={this.handleOnFocus} handleOnBlur={this.handleOnBlur}
										errorText={this.errorFor("emailAddress")} />
				</div>
				<div className={`form-group ${this.getGroupClassName("password1")}`}>
				<label className="lbl password1" htmlFor="password1">Password </label>
					<TextView	showError={this.state.showErrors} type="password" id="password1"
										text={this.state.password1} onFieldChange={this.handleFieldChanged("password1")}
										handleOnFocus={this.handleOnFocus} handleOnBlur={this.handleOnBlur}
										errorText={this.errorFor("password1")} />
				</div>
				<div className={`form-group ${this.getGroupClassName("password2")}`}>
				<label className="lbl password2" htmlFor="password2">Confirm Password</label>
					<TextView	showError={this.state.showErrors} type="password" id="password2"
										text={this.state.password2} onFieldChange={this.handleFieldChanged("password2")}
										handleOnFocus={this.handleOnFocus} handleOnBlur={this.handleOnBlur}
										errorText={this.errorFor("password2")} />
				</div>
				<button type="submit" value="create account" onClick={this.handleSubmitClicked}>Submit</button>
			</div>
			);
	}
}