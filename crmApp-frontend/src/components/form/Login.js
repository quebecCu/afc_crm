//import MyInput from './../components/Input';
import React, { Component } from 'react';
import '../../style/Login.css';
import  logoCo from '../../style/images/logoCompany.jpg';
import  '../../style/logoCo.css';
import  '../../style/footer.css';
import validateInput from '../../shared/validations/login';
//import { connect  } from 'react-redux';
import Request from 'superagent' ;
import {store} from '../../store';
import {push} from 'react-router-redux';
//import Img from 'react-image';

class Login extends Component   {
	constructor(props) {
		super(props);

		this._changeUsername = this._changeUsername.bind(this);

		this._changePassword = this._changePassword.bind(this);

		this._emitChange = this._emitChange.bind(this);

		this._login = this._login.bind(this);
	}

	_login(e) {
		e.preventDefault();
		this.props.onSubmit(this.props.formState);
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

	_forgotten(e) {
		store.dispatch(push('/Reset'));
	}

	render() {
		return (
			<div className="logoCompany">
				<div id ="logoCo">
					<img src={logoCo} alt="logoCompany" width="300" height="200" />
				</div>
				<div className="modal fade" id="login-modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
					<div className="modal-dialog">
						<div className="loginmodal-container">
							<h1> Connexion </h1><br/>
							<form method="POST" onSubmit = {this._login}>
								<input className= "form-control" type='text' name="username" placeholder="Nom d'utilisateur" onChange={this._changeUsername} value={this.props.formState.username} required />
								<input className= "form-control" type='password' name="password"  placeholder="Mot de passe" onChange={this._changePassword} value={this.props.formState.password}  required />
								<div className="form-group"><button type= "submit" className="btn btn-primary btn-lg" id="loginButton" disabled={this.props.isloading ? true : false }>Login</button></div>
							</form>
							<div className="login-help">
								<br/>
								<button className="btn btn-primary btn-lg" onClick = {this._forgotten} id="loginButton" > Mot de passe oublié?</button>
							</div>
						</div>
					</div>
				</div>
				<footer className="footer-distributed">
					<div className="footer-left">
						<div>
							<i className="fa fa-map-marker"></i>
							<p><span>4645 Boul Bourque </span> Sherbrooke, QC J1N 2G6</p>
						</div>
					</div>
					<div className="footer-center">
						<div>
							<i className="fa fa-phone"></i>
							<p>+1 (819) 823-1443</p>
						</div>
					</div>
					<div className="footer-right">
						<div>
							<i className="fa fa-envelope"></i>
							<p><a href="mailto:crm.udes@gmail.com">crm.udes@gmail.com</a></p>
						</div>
						<div className="footer-icons">
							<a href="https://ca.linkedin.com/in/alainproulx"><i className="fa fa-linkedin"></i></a>
							<a href="https://github.com/azizou69004/CRM-UDES-2017"><i className="fa fa-github"></i></a>
						</div>
					</div>
					<p className="footer-copyright">  © 2017 CRM Application UDES. All rights reserved </p>
				</footer>
			</div>
		);
	}
}
export default (Login);