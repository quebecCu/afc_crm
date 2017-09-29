//import MyInput from './../components/Input';
import React, { Component } from 'react';
import './Login.css';
import validateInput from './shared/validations/login'
import { connect  } from 'react-redux';
import Request from 'superagent' ;
import axios from 'axios';



export class Login extends React.Component   {
	constructor(props) {
		super(props)
		this.state = {
			username:'',
			password: '',
			errors: {},
			isLoading: false,
			resultat:''
		};
		this.onChange = this.onChange.bind(this);
		this.submit = this.submit.bind(this);
	}


	submit(e) {
		e.preventDefault();
		const { errors, username, password, isLoading , resultat} = this.state;
		this.setState({ errors: {}, isLoading: true });
		var server = "http://localhost:3002/login";

		axios.post(server, {
			username: username,
			password: password
		})
		.then(function (response) {
			
			 callbackResponse: {response.data.res}

		
		})
		.catch(function (error) {
			console.log(error);
		});

	}

	onChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}





	render() {
		const { errors, username, password, isLoading , resultat} = this.state;

		return (



				<div className="modal fade" id="login-modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
				<div className="modal-dialog">
				<div className="loginmodal-container">
				<h1> Connexion </h1><br/>
				<form>
				<input type="text" name="username" placeholder="Nom d'utilisateur" onChange={this.onChange} value={this.state.username} required />
				<input type="password" name="password"  placeholder="Mot de passe" onChange={this.onChange} value={this.state.password}  required />
				<div className="form-group" onClick = {this.submit} ><button className="btn btn-primary btn-lg" disabled={this.isLoading}>Login</button></div>
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