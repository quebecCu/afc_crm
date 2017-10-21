import React, { Component } from 'react';
//import Login from './Login';
import { connect  } from 'react-redux';
import Reset from '../components/form/Reset';

import '../style/Reset.css';
/// TODO 
import {resetRequest, changeForm} from '../actions/crmReset'

class ResetPage extends Component   {
	
	render() {
		let { formState , isLoading, error } = this.props.crmReset;
		return(
		<div className = "row">
		<div className = "col-md-4 col-md-offset-4">
		<Login 		onSubmit = {this.props.resetRequest}
					formState = {formState}
					isLoading = {isLoading}
					error = {error}
					changeForm = {this.props.changeForm} />
		</div>
		</div>
		
		)
	}
}

// les fonctions redux
//valeurs
function mapStateToProps (state) {
	
	return{
		crmReset: state.crmReset
	}
}

//fonctions
const  mapDispatchToProps = (dispatch) => {
	
	return{
		resetRequest: (formData) => {
			dispatch(resetRequest(formData))
		},
		changeForm : (newFormState) => {
			dispatch(changeForm(newFormState))
		}		
	}
}

export default connect(mapStateToProps, mapDispatchToProps) (ResetPage)
