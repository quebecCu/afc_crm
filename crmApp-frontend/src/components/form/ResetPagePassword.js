//import MyInput from './../components/Input';
import React, { Component } from 'react';
import '../../style/Reset.css';
import Request from 'superagent' ;
import {store} from '../../store';
import {push} from 'react-router-redux';


class ResetPagePassword extends Component   {
	constructor() {
		super();
		this.state = {error: false};
		this._changeNewPassword = this._changeNewPassword.bind(this);
		this._changeConfirmPassword = this._changeConfirmPassword.bind(this);
		this._emitChange = this._emitChange.bind(this);
		this._submit = this._submit.bind(this);
	}

	_submit(e) {
		e.preventDefault();
		this.props.onSubmit(this.props.formState);
	}
	_back(e) {
		e.preventDefault();
		store.dispatch(push('/'));
	}
	
	_changeNewPassword (event){
		this._emitChange({...this.props.formState , newPassword: event.target.value});
	}
	_changeConfirmPassword (event){
		this._emitChange({...this.props.formState , confirmPassword: event.target.value});
	}
	
	_emitChange (newFormState){
		this.props.changeForm(newFormState);
	}
	

	render() {
		return ( 

				<div className ="reset">
				<div className="elelment">
					<h2> </h2>
					<div className="element-main">
						<h1>Mot de passe oublié</h1>
						<p> Entrez votre nouveau mot de passe</p>
						<form method="POST" onSubmit = {this._submit}>
	
						<input  type="password" placeholder="Votre nouveau mot de passe"  onChange={this._changeNewPassword} value={this.props.formState.newPassword} required/>
						<p> Confirmation du mot de passe </p>
						<input  type="password" placeholder="Confirmation du mot de passe"  onChange={this._changeConfirmPassword} value={this.props.formState.confirmPassword} required/>

						<div className="form-group" ><button className="btn btn-primary btn-lg" id ="reset" disabled={this.props.isloading ? true : false }>Changer</button></div>
							<div className="form-group" onClick = {this._back} ><button className="btn btn-primary btn-lg"  id ="reset">Quitter</button>
							</div>
						</form>
						
					</div>
				</div>
				<div className="copy-right">
							<p>© 2017 CRM Application UDES. All rights reserved </p>
				</div>
				</div>
		);
	}
}


export default (ResetPagePassword);