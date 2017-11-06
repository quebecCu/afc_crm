import React, { Component } from 'react';
//import Login from './Login';
import { connect  } from 'react-redux';
import Login from '../components/form/Login';

import '../style/Login.css';
/// TODO 
import {loginRequest, changeForm} from '../actions/crmLogin'

class LoginPage extends Component {
	
	render() {
		let { formState , isLoading, error } = this.props.crmLogin;
		//gestion derreur sur la div login
		
		return(
			<div className = "row">
				<div className = "col-md-4 col-md-offset-4">
					<Login 		onSubmit = {this.props.loginRequest}
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

export default connect(mapStateToProps, mapDispatchToProps) (LoginPage)
