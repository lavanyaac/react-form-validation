import React from 'react';
import { bool } from 'prop-types';

export default function OptionallyDisplayed(props){
	return(
		this.props.display === true 
			? <div>{this.props.children}</div>
			: null;
		);
}

OptionallyDisplayed.propTypes = {
	display: bool.isRequired
};