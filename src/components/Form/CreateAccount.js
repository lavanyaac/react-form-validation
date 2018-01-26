import React, {Component} from 'react';
import TextView from './util/TextView';
import {run, ruleRunner} from './validation/ ruleRunner';
import { required, mustMatch, minLength } from. './Validation/rules';


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
		this.state = {
			showErrors: false,
			validationErrors = {}
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
			const newState = update(this.state, {
				[field]: {$set: e.target.value}
			});
			newState.validationErrors = run(newState, fieldValidations);
			this.setState(newState);
		};
	}

	handleSubmitClicked(){
		this.setState({showErrors: true});
		if(Object.keys(this.state.validationErrors).length) return null;
		return this.props.onCreateAccount(this.state);
	}

	render(){
		return(
			<div className="create account">
				<h2> Create New Account </h2>
				<label>First Name
					<TextView	showError={this.state.showErrors}
										text={this.props.firstName} onFieldChanged={this.handleFieldChanged("firstName")}
										errorText={this.errorFor("firstName")} />
				</label>
				<label>Email Address
					<TextView	showError={this.state.showErrors} type="email"
										text={this.props.emailAddress} onFieldChanged={this.handleFieldChanged("emailAddress")}
										errorText={this.errorFor("emailAddress")} />
				</label>
				<label>Passowrd
					<TextView	showError={this.state.showErrors} type="password"
										text={this.props.password1} onFieldChanged={this.handleFieldChanged("password1")}
										errorText={this.errorFor("password1")} />
				</label>
				<label>Confirm Passowrd
					<TextView	showError={this.state.showErrors} type="password"
										text={this.props.password2} onFieldChanged={this.handleFieldChanged("password2")}
										errorText={this.errorFor("password2")} />
				</label>
				<button type="submit" value="create account" onClick={this.handleSubmitClicked}>Submit</button>
			</div>
			);
	}
}