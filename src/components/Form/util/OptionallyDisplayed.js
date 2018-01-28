import React from 'react';
import { bool } from 'prop-types';

export default function OptionallyDisplayed(props){
	return(
		props.display === true 
			? <div>{props.children}</div>
			: null
		);
}

OptionallyDisplayed.propTypes = {
	display: bool.isRequired
};