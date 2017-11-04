import React, { Component } from 'react';
//import Login from './Login';
import { connect  } from 'react-redux';
import PageAccueil from '../components/PageAccueil';

import '../style/Login.css';
import {loginRequest, changeForm} from '../actions/crmLogin'

class AccueilPageContainer extends Component   {
	
	render() {
		let { formState } = this.props.crmLogin;
		//gestion derreur sur la div login
		
		return(
		<div className = "row">
		<div className = "col-md-4 col-md-offset-4">
		<PageAccueil 		
					formState = {formState}
					 />
		</div>
		</div>
		
		)
	}
}

// les fonctions redux
//valeurs
function mapStateToProps (state) {
	
	return{
		crmLogin: state.crmLogin
	}
}

//fonctions
const  mapDispatchToProps = (dispatch) => {
	
	return{
		loginRequest: (formData) => {
			dispatch(loginRequest(formData))
		},
		changeForm : (newFormState) => {
			dispatch(changeForm(newFormState))
		}		
	}
}

export default connect(mapStateToProps, mapDispatchToProps) (AccueilPageContainer)
