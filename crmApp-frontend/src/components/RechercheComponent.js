import React, { Component } from 'react';
import '../style/RechercheComponent.css';
import Request from 'superagent' ;
import {store} from '../store';
import {push} from 'react-router-redux';


class RechercheComponent extends Component {
	
	constructor(props) {
		super(props);
		
		this._changeNomEntreprise = this._changeNomEntreprise.bind(this);
		this._changeNomAssureur = this._changeNomAssureur.bind(this);
		this._changeNumeroPolice = this._changeNumeroPolice.bind(this);
		this._changeNomEmploye = this._changeNomEmploye.bind(this);
		this._emitChange = this._emitChange.bind(this);
		this._recherche = this._recherche.bind(this);
	}
//	
//	nomEmploye: '',
//	moisRenouvellement:'',
//	clientActif: true,
//	statutProspect: false


	_recherche(e) {
		e.preventDefault();
		this.props.onSubmit(this.props.formState);
	}
	_changeNomEmploye (event){
		this._emitChange({...this.props.formState , nomEmploye: event.target.value});
	}
	_changeNomAssureur (event){
		this._emitChange({...this.props.formState , nomAssureur: event.target.value});
	}
	_changeNomEntreprise (event){
		this._emitChange({...this.props.formState , nomEntreprise: event.target.value});
	}
	_changeNumeroPolice(event){
		this._emitChange({...this.props.formState , numeroPolice: event.target.value});
	}
	_emitChange (newFormState){
		this.props.changeForm(newFormState);
	}
	
//	_forgotten(e) {
//		store.dispatch(push('/Reset'));
//	}
	
    render() {
        return(
            <form action="" id="recherche" style={{display: 'flex', justifyContent: 'flex-start', textAlign: 'left'}}>
                <input type="text" placeholder="Nom entreprise" onChange={this._changeNomEntreprise} value={this.props.formState.nomEntreprise} />
                <input type="text" placeholder="Nom employé" onChange={this._changeNomEmploye}  value={this.props.formState.nomEmploye} />
                <input type="text" placeholder="N° police"onChange={this._changeNumeroPolice} value={this.props.formState.numeroPolice}/>
                <input type="text" placeholder="Mois renouvellement" value={this.props.formState.numeroPolice}/>
                <input type="text" placeholder="Assureur" onChange={this._changeNomAssureur}  value={this.props.formState.nomAssureur}/>
                <select>
                    <option value="actif">Actif</option>
                    <option value="annulé">Annulé</option>
                </select>
                <div>
                    <input type="checkbox" id="prospects" name="prospects" value="prospects"/>
                    <label for="prospects">Prospects</label>
                </div>
                <input type="submit" value="Rechercher" />
            </form>
        );
    }
}

export default (RechercheComponent);