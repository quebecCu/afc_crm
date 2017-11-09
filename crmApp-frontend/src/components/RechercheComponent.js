import React, { Component } from 'react';
import '../style/RechercheComponent.css';

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
		this._filtre = this._filtre.bind(this);
	}
	_changeNomEntreprise (event){
		this._emitChange({...this.props.formState , nomEntreprise: event.target.value});
		this._filtre ();
	}

	_reset(e) {
		e.preventDefault();
		document.getElementById("nomEmploye").value = "";
		document.getElementById("nomAssureur").value = "";
		document.getElementById("moisRenouvellement").value = "";
		document.getElementById("numeroPolice").value = "";
		document.getElementById("nomEntreprise").value = "";
		document.getElementById("selectedStatut").value = "";
		document.getElementById("prospects").value = "";
		this._filtre ();
	}
	_changeNomEmploye (event){
		this._emitChange({...this.props.formState , nomEmploye: event.target.value});
		this._filtre ();
	}
	_changeMoisRenouvellement (event){
		this._emitChange({...this.props.formState , moisRenouvellement: event.target.value});
		this._filtre ();
	}
	_changeNomAssureur (event){
		this._emitChange({...this.props.formState , nomAssureur: event.target.value});
		this._filtre ();
	}
	_changeNumeroPolice(event){
		this._emitChange({...this.props.formState , numeroPolice: event.target.value});
		this._filtre ();
	}

	_filtre (){
		var inputNumeroPolice,inputNomEmploye,inputNomAssureur,inputNomEntreprise,inputMoisRenouvellement, inputSelectedStatut,
			inputProspect, table, tr,td0,td1, td2,td3, td4, td5,td6, i;
		
		inputNumeroPolice = document.getElementById("numeroPolice").value.toUpperCase();
		inputNomEmploye = document.getElementById("nomEmploye").value.toUpperCase();
		inputNomAssureur = document.getElementById("nomAssureur").value.toUpperCase();
		inputNomEntreprise = document.getElementById("nomEntreprise").value.toUpperCase();
		inputMoisRenouvellement = document.getElementById("moisRenouvellement").value.toUpperCase();
		inputSelectedStatut = document.getElementById("selectedStatut").value.toUpperCase();
		inputProspect = document.getElementById("prospects").value.toUpperCase();
		
		table = document.getElementById("PageCollectivesClientsTable");
		tr = table.getElementsByTagName("tr");
		// Loop through all table rows, and hide those who don't match the search query
		for (i = 0; i < tr.length; i++) {
			td0 = tr[i].getElementsByTagName("td")[0];
			td1 = tr[i].getElementsByTagName("td")[1];
			td2 = tr[i].getElementsByTagName("td")[2];
			td3 = tr[i].getElementsByTagName("td")[3];
			td4 = tr[i].getElementsByTagName("td")[4];
			td5 = tr[i].getElementsByTagName("td")[5];
			td6 = tr[i].getElementsByTagName("td")[6];
			if (td0 || td1 || td2 || td3 ||td4 ||td5 ||td6) {
				if (td6.innerHTML.toUpperCase().indexOf(inputProspect) > -1 &&  td5.innerHTML.toUpperCase().indexOf(inputSelectedStatut) > -1 && td3.innerHTML.toUpperCase().indexOf(inputMoisRenouvellement) > -1 && td0.innerHTML.toUpperCase().indexOf(inputNomEntreprise) > -1 && td4.innerHTML.toUpperCase().indexOf(inputNomAssureur) > -1 
						&& td2.innerHTML.toUpperCase().indexOf(inputNumeroPolice) > -1 && td1.innerHTML.toUpperCase().indexOf(inputNomEmploye) > -1) {
					tr[i].style.display = "";
				} else {
					tr[i].style.display = "none";
				}
			} 
		}
	}

	_emitChange (newFormState){
		this.props.changeFormColl(newFormState);
	}

	render() {

		return(
				<form action="" id="recherche" className="container-fluid">
				<input type="text" id ="nomEntreprise" placeholder="Nom entreprise" onChange={this._changeNomEntreprise} value={this.props.formState.nomEntreprise} />
				<input type="text" id ="nomEmploye" placeholder="Nom employé" onChange={this._changeNomEmploye}  value={this.props.formState.nomEmploye} />
				<input type="text" id ="numeroPolice" placeholder="N° police" onChange={this._changeNumeroPolice} value={this.props.formState.numeroPolice}/>
				<input type="text" id ="moisRenouvellement" placeholder="Mois renouvellement" onChange={this._changeMoisRenouvellement} value={this.props.formState.moisRenouvellement} />
				<input type="text" id ="nomAssureur" placeholder="Assureur" onChange={this._changeNomAssureur}  value={this.props.formState.nomAssureur}/>

				<select  required id = "selectedStatut" onChange={this._filtre} > 
				<option value=""  selected="selected">-- Choisir le statut --</option>
				<option value="actif">Actif</option>
				<option value="annulé">Annulé</option>
				</select>
				
				<select  required name="prospects" id = "prospects" onChange={this._filtre} > 
				<option value=""  selected="selected">-- Type prospect --</option>
				<option value="oui">Prospect</option>
				<option value="non"> Non prospect </option>
				</select>
					<input type="reset" value="Reset"  onClick= {this._reset}/>
					</form>
		);
	}
}

export default (RechercheComponent   )
