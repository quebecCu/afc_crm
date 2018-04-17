//import MyInput from './../components/Input';
import React, { Component } from 'react';
import  logoCo from '../../style/images/logoCompany.png';
import '../../style/Reset.css';
import GoogleMap from "../shared/GoogleMaps"


class Reset extends Component   {
	constructor() {
		super();
		this.state = {error: false};
		this._changeEmail = this._changeEmail.bind(this);
		this._emitChange = this._emitChange.bind(this);
		this._submit = this._submit.bind(this);
	}

	_submit(e) {
		e.preventDefault();
		this.props.onSubmit(this.props.formState);
	}
	_back(e) {
		e.preventDefault();
		window.location.href='/';
	}

	_changeEmail (event){
		this._emitChange({...this.props.formState , email: event.target.value});
	}

	_emitChange (newFormState){
		this.props.changeForm(newFormState);
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
						<div className="card-header">Mot de passe oubli&eacute;</div>
			      <div className="card-body">
							<form method="POST" onSubmit = {this._submit}>
								<div className="form-group">
									<label htmlFor="usernameLogin">Entrez le courriel courrespondant a votre dossier</label>
									<input className="form-control" id="courriel" type="email" placeholder="Votre adresse courriel" onChange={this._changeEmail} value={this.props.formState.email} required />
								</div>
								<div>
									<button className="btn btn-primary float-left" id ="reset" disabled={this.props.isloading ? true : false }>Valider</button>
									<button className="btn btn-danger float-right" onClick = {this._back}  id ="reset" >Annul&eacute;</button>
								</div>

							</form>
							<div id="resetPasswordMsg" className=" w3-container w3-panel w3-green "   style={{display: 'none'}}>
						    <h3>Veuillez consulter vos courriels</h3>
						    <p>un lien de réinitialisation vous a été envoyé.</p>
						  </div>
						  <div id="resetPasswordMsgFail" className=" w3-container w3-panel w3-red "   style={{display: 'none'}}>
						    <h3>Le courriel entré est introuvable dans nos dossiers</h3>
						    <p>Veuillez réessayer ou contacter votre administrateur.</p>
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
			</div>
		);
	}
}


export default (Reset);
