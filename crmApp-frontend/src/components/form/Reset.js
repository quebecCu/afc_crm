//import MyInput from './../components/Input';
import React, { Component } from 'react';
import '../../style/Reset.css';
import Request from 'superagent' ;
import {store} from '../../store';
import {push} from 'react-router-redux';



class Reset extends Component   {
	constructor(props) {
		super(props);
		
		this._changeEmail = this._changeEmail.bind(this);
		this._emitChange = this._emitChange.bind(this);
		this._submit = this._submit.bind(this);
	}

	_submit(e) {
		e.preventDefault();
		this.props.onSubmit(this.props.formState);
	}
	
	_changeEmail (event){
		this._emitChange({...this.props.formState , email: event.target.value});
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
						<p> Entrez le courriel courrespondant a votre dossier</p>
						<form>
							<input type="text" placeholder="Your e-mail address" value="aziz.zouaoui@brp.com" onChange={this._changeEmail} />
							<input type="submit" placeholder="Reset my Password"  />
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


export default (Reset);