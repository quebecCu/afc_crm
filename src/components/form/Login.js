//import MyInput from './../components/Input';
import React, { Component } from 'react';
import '../../style/Login.css';
import  logoCo from '../../style/images/logoCompany.png';
//import  '../../style/logoCo.css';
import  '../../style/footer.css';
//import { connect  } from 'react-redux';
import {store} from '../../store';
import {push} from 'react-router-redux';
import GoogleMap from "../GoogleMaps"
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
			<div>
				<div className="container" style={{paddingTop: 30 + 'px'}}>
					<div id="logoCo" className="row">
						<div className="col text-center">
							<img src={logoCo} alt="logoCompany" width="250px;" className="img-fluid" />
						</div>
					</div>
			    <div className="card card-login mx-auto mt-5">
			      <div className="card-header">Connexion</div>
			      <div className="card-body">
			        <form method="POST" onSubmit = {this._login} id="login-form"  >
			          <div className="form-group">
			            <label htmlFor="usernameLogin">Nom d'utilisateur</label>
			            <input className="form-control" name="username" id="usernameLogin" type="text" placeholder="Nom d'utilisateur" onChange={this._changeUsername} value={this.props.formState.username} required />
			          </div>
			          <div className="form-group">
			            <label htmlFor="passwordLogin">Mot de passe</label>
			            <input className="form-control" type='password' name="password" id="passwordLogin" placeholder="Mot de passe" onChange={this._changePassword} value={this.props.formState.password}  required />
			          </div>
			          <button type="submit" className="btn btn-primary btn-block" id="loginButton" disabled={this.props.isloading ? true : false }>
									{
										this.props.loadingLogin&&
										<i className="fa fa-refresh fa-spin"/>
									}
									Connexion
								</button>
								<hr/>
								<div className="login-help">
									<br/>
									<button className="btn btn-secondary btn-block" onClick={this._forgotten} id="loginButtonForgotten" > Mot de passe oublié?</button>
								</div>
								<div id="errorPassword" className=" w3-container w3-panel w3-red "   style={{display: 'none'}}>
							    <h3>Mot de passe erroné</h3>
							    <p>En cas de problemes, utilisez "Mots de passe oublié?".</p>
								</div>
			        </form>
			      </div>
			    </div>
			  </div>
				<footer style={{marginTop: 30 + 'px'}}>
					<div className="row">
						<div className="col-xs-12 col-md-4 text-center">
							<div>
								<i className="fa fa-map-marker" ></i>
								<p><span >
								4645 Boul Bourque </span> Sherbrooke, QC J1N 2G6</p>
							</div>
						</div>

						<div className="col-xs-12 col-md-4 text-center">
							<div>
								<i className="fa fa-phone"></i>
								<p><a href="tel:5149691087">+1 (819) 823-1443</a></p>
							</div>
						</div>

						<div className="col-xs-12 col-md-4 text-center">
							<div>
								<i className="fa fa-envelope"></i>
								<p><a href="mailto:crm.udes@gmail.com">crm.udes@gmail.com</a></p>
							</div>
						</div>
					</div>
					<br/>
					<div className="google-map">
						<GoogleMap
							  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
							  loadingElement={<div style={{ height: `100%` }} />}
							  containerElement={<div style={{ height: `270px` }} />}
							  mapElement={<div style={{ height: `100%` }} />}
							/>
		      </div>
				</footer>
				<br/>
				<p className="text-center">  © 2018 CRM Application UDES. All rights reserved </p>
			</div>
		);
	}
}

export default (Login);
