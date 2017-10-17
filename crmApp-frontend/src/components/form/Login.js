//import MyInput from './../components/Input';
import React, { Component } from 'react';
import '../../style/Login.css';
import validateInput from '../../shared/validations/login';
//import { connect  } from 'react-redux';
import Request from 'superagent' ;




class Login extends Component   {
	constructor(props) {
		super(props);
		
//		this.state = {
//				username:'',
//				password: '',
//				errors: {},
//				isLoading: false,
//				resultat:''
//		};
		
		
		this._changeUsername = this._changeUsername.bind(this);

		this._changePassword = this._changePassword.bind(this);

		this._emitChange = this._emitChange.bind(this);

		this._login = this._login.bind(this);
	}

	_login(e) {
		e.preventDefault();
		this.props.onSubmit(this.props.formState);
		// rajouter ces fonctions dans le container
		//TODO
//		const { errors, username, password, isLoading , resultat} = this.state;
//		this.setState({ errors: {}, isLoading: true });
//		var server = "http://localhost:3002/login";
//		axios.post(server, {
//			username: username,
//			password: password
//		})
//		.then(function (response) {
//			callbackResponse: {response.data.res}
//		})
//		.catch(function (error) {
//			console.log(error);
//		});

	}
	
	_changeUsername (event){
		this._emitChange({...this.props.formState , username: event.target.value});
	}
	
	_changePassword (event){
		this._emitChange({...this.props.formState , password: event.target.value});
	}
	
	_emitChange (newFormState){
		this.props.changeForm(newFormState);
	}
	
//	onChange(e) {
//		this.setState({[e.target.name]: e.target.value});
//	}

	render() {
//		const { errors, username, password, isLoading , resultat} = this.state;
		console.log(this.props, "sdfsdfdsf"); 

		return (

				<div className="modal fade" id="login-modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
				<div className="modal-dialog">
				<div className="loginmodal-container">
				<h1> Connexion </h1><br/>
				<form>
				<input type="text" name="username" placeholder="Nom d'utilisateur" onChange={this._changeUsername} value={this.props.formState.username} required />
				<input type="password" name="password"  placeholder="Mot de passe" onChange={this._changePassword} value={this.props.formState.password}  required />
				<div className="form-group" onClick = {this._login} ><button className="btn btn-primary btn-lg" id="loginButton" disabled={this.props.isloading ? true : false }>Login</button></div>
				</form>
				<div className="login-help">
				<a href="#"> Demande de session utilisateur / invité</a> <br/>
				<a href="#"> Mot de passe oublié?</a>
				</div>
				</div>
				</div>
				</div> 
		);
	}
}


export default (Login);