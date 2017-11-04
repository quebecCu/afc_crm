import React, { Component } from 'react';
import '../style/RechercheFournisseur.css';
import Request from 'superagent' ;
import {store} from '../store';
import {push} from 'react-router-redux';
//import state  from '../reducer/crmRechercheCollective';
import { connect  } from 'react-redux';
import {searchRequestColl, changeFormColl, sendingRequestColl} from '../actions/crmRechercheCollective'

class RechercheComponent extends Component {

	constructor(props) {
		super(props);

		this._changeNomEntreprise = this._changeNomEntreprise.bind(this);
		this._changeNomAssureur = this._changeNomAssureur.bind(this);
		this._changeNumeroPolice = this._changeNumeroPolice.bind(this);
		this._changeNomEmploye = this._changeNomEmploye.bind(this);
		this._emitChange = this._emitChange.bind(this);
		this._reset = this._reset.bind(this);
		this._changeMoisRenouvellement = this._changeMoisRenouvellement.bind(this);


	}
	_changeNomEntreprise (event){
		this._emitChange({...this.props.formState , nomEntreprise: event.target.value});

		var input, filter, table, tr, td, i;
		input = document.getElementById("nomEntreprise");
		filter = input.value.toUpperCase();
		table = document.getElementById("PageCollectivesClientsTable");
		tr = table.getElementsByTagName("tr");
		// Loop through all table rows, and hide those who don't match the search query
		for (i = 0; i < tr.length; i++) {
			td = tr[i].getElementsByTagName("td")[0];
			if (td) {
				if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
					tr[i].style.display = "";
				} else {
					tr[i].style.display = "none";
				}
			} 
		}
	}

	_reset(e) {
		e.preventDefault();
		document.getElementById("nomEmploye").value = "";
		document.getElementById("nomAssureur").value = "";
		document.getElementById("moisRenouvellement").value = "";
		document.getElementById("numeroPolice").value = "";
		document.getElementById("nomEntreprise").value = "";
		document.getElementById("prospects").checked = false;
		document.getElementById("prospects").value = "on";
		
		
		var input, filter, table, tr, td, i;
		input = document.getElementById("selectedStatut");
		filter = input.value.toUpperCase();
		table = document.getElementById("PageCollectivesClientsTable");
		tr = table.getElementsByTagName("tr");
		// Loop through all table rows, and hide those who don't match the search query
		for (i = 0; i < tr.length; i++) {
			td = tr[i].getElementsByTagName("td")[5];
			tr[i].style.display = "";
		}
	}
	_changeNomEmploye (event){
		this._emitChange({...this.props.formState , nomEmploye: event.target.value});

		var input, filter, table, tr, td, i;
		input = document.getElementById("nomEmploye");
		filter = input.value.toUpperCase();
		table = document.getElementById("PageCollectivesClientsTable");
		tr = table.getElementsByTagName("tr");
		// Loop through all table rows, and hide those who don't match the search query
		for (i = 0; i < tr.length; i++) {
			td = tr[i].getElementsByTagName("td")[1];
			if (td) {
				if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
					tr[i].style.display = "";
				} else {
					tr[i].style.display = "none";
				}
			} 
		}
	}
	_changeMoisRenouvellement (event){
		this._emitChange({...this.props.formState , moisRenouvellement: event.target.value});

		var input, filter, table, tr, td, i;
		input = document.getElementById("moisRenouvellement");
		filter = input.value.toUpperCase();
		table = document.getElementById("PageCollectivesClientsTable");
		tr = table.getElementsByTagName("tr");
		// Loop through all table rows, and hide those who don't match the search query
		for (i = 0; i < tr.length; i++) {
			td = tr[i].getElementsByTagName("td")[3];
			if (td) {
				if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
					tr[i].style.display = "";
				} else {
					tr[i].style.display = "none";
				}
			} 
		}
	}
	_changeNomAssureur (event){
		this._emitChange({...this.props.formState , nomAssureur: event.target.value});

		var input, filter, table, tr, td, i;
		input = document.getElementById("nomAssureur");
		filter = input.value.toUpperCase();
		table = document.getElementById("PageCollectivesClientsTable");
		tr = table.getElementsByTagName("tr");
		// Loop through all table rows, and hide those who don't match the search query
		for (i = 0; i < tr.length; i++) {
			td = tr[i].getElementsByTagName("td")[4]; 
			if (td) {
				if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
					tr[i].style.display = "";
				} else {
					tr[i].style.display = "none";
				}
			} 
		}
	}
	_changeNumeroPolice(event){
		this._emitChange({...this.props.formState , numeroPolice: event.target.value});

		var input, filter, table, tr, td, i;
		input = document.getElementById("numeroPolice");
		filter = input.value.toUpperCase();
		table = document.getElementById("PageCollectivesClientsTable");
		tr = table.getElementsByTagName("tr");
		// Loop through all table rows, and hide those who don't match the search query
		for (i = 0; i < tr.length; i++) {
			td = tr[i].getElementsByTagName("td")[2];
			if (td) {
				if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
					tr[i].style.display = "";
				} else {
					tr[i].style.display = "none";
				}
			} 
		}
	}

	_selectStatut (event){
		var input, filter, table, tr, td, i;
		input = document.getElementById("selectedStatut");
		filter = input.value.toUpperCase();
		table = document.getElementById("PageCollectivesClientsTable");
		tr = table.getElementsByTagName("tr");
		// Loop through all table rows, and hide those who don't match the search query
		for (i = 0; i < tr.length; i++) {
			td = tr[i].getElementsByTagName("td")[5];
			if (td) {
				if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
					tr[i].style.display = "";
				} else {
					tr[i].style.display = "none";
				}
			} 
		}
	}


	_checkBoxVal(event){
		var checkValue = document.getElementById("prospects").value;
		if (checkValue === "on"){
			var input, filter, table, tr, td, i;
			input = "prospect";
			filter = input.toUpperCase();
			table = document.getElementById("PageCollectivesClientsTable");
			tr = table.getElementsByTagName("tr");
			// Loop through all table rows, and hide those who don't match the search query
			for (i = 0; i < tr.length; i++) {
				td = tr[i].getElementsByTagName("td")[6];
				if (td) {
					if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
						tr[i].style.display = "";
					} else {
						tr[i].style.display = "none";
					}
				} 
			}
			document.getElementById("prospects").value = "off";
		}
		else {
			
			var input, filter, table, tr, td, i;
			input = document.getElementById("selectedStatut");
			filter = input.value.toUpperCase();
			table = document.getElementById("PageCollectivesClientsTable");
			tr = table.getElementsByTagName("tr");
			// Loop through all table rows, and hide those who don't match the search query
			for (i = 0; i < tr.length; i++) {
				td = tr[i].getElementsByTagName("td")[5];
				tr[i].style.display = "";
			}
			document.getElementById("prospects").value = "on";
		}



	}
	_emitChange (newFormState){
		this.props.changeFormColl(newFormState);
	}


	render() {

		return(
				<form action="" id="recherche" style={{display: 'flex', justifyContent: 'flex-start', textAlign: 'left'}}>
				<input type="text" id ="nomEntreprise" placeholder="Nom entreprise" onChange={this._changeNomEntreprise} value={this.props.formState.nomEntreprise} />
				<input type="text" id ="nomEmploye" placeholder="Nom employé" onChange={this._changeNomEmploye}  value={this.props.formState.nomEmploye} />
				<input type="text" id ="numeroPolice" placeholder="N° police" onChange={this._changeNumeroPolice} value={this.props.formState.numeroPolice}/>
				<input type="text" id ="moisRenouvellement" placeholder="Mois renouvellement" onChange={this._changeMoisRenouvellement} value={this.props.formState.moisRenouvellement} />
				<input type="text" id ="nomAssureur" placeholder="Assureur" onChange={this._changeNomAssureur}  value={this.props.formState.nomAssureur}/>

				<select id = "selectedStatut" onChange={this._selectStatut} > 
				<option value="actif">Actif</option>
				<option value="annulé">Annulé</option>
				</select>
				<div >
				<input type="checkbox"  onChange={this._checkBoxVal} name="prospects" id="prospects" />
					<label for="prospects">Prospects</label>
					</div>
					<input type="reset" value="Reset"  onClick= {this._reset}/>
					</form>
		);
	}
}

export default (RechercheComponent   )
