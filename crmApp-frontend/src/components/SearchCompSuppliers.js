import React, { Component } from 'react';
import '../style/RechercheComponent.css';
import Request from 'superagent' ;
import {store} from '../store';
import {push} from 'react-router-redux';
//import state  from '../reducer/crmRechercheCollective';
import { connect  } from 'react-redux';
import {searchRequestColl, changeFormColl, getRequestClientColl} from '../actions/crmRechercheCollective';

class SearchCompSuppliers extends Component {

    constructor(props) {
        super(props);

        this._changeNomEntreprise = this._changeNomEntreprise.bind(this);
        this._changeNomContact = this._changeNomContact.bind(this);
        this._changeCode = this._changeCode.bind(this);
        this._changeNombreEmployes = this._changeNombreEmployes.bind(this);
        this._emitChange = this._emitChange.bind(this);
        this._recherche = this._recherche.bind(this);
    }


    _recherche(e) {
        e.preventDefault();
        this.props.onSubmit(this.props.formState);
    }
    _changeNombreEmployes (event){
        this._emitChange({...this.props.formState , nombreEmployes: event.target.value});
    }
    _changeNomContact (event){
        this._emitChange({...this.props.formState , nomContact: event.target.value});
    }
    _changeNomEntreprise (event){
        this._emitChange({...this.props.formState , nomEntreprise: event.target.value});
    }
    _changeCode(event){
        this._emitChange({...this.props.formState , code: event.target.value});
    }
    _emitChange (newFormState){
        this.props.changeForm(newFormState);
    }

//	_forgotten(e) {
//		store.dispatch(push('/Reset'));
//	}

    render() {

        return(
            <form action="">
                <div id="recherche">
                    <input type="text" placeholder="Nom entreprise" onChange={this._changeNomEntreprise} value={this.props.formState.nomEntreprise} />
                    <input type="text" placeholder="Nombre d'employés" onChange={this._changeNombreEmployes}  value={this.props.formState.nombreEmployes} />
                    <input type="text" placeholder="Nom d'un contact" onChange={this._changeNomContact} value={this.props.formState.nomContact}/>
                    <input type="text" placeholder="Code" onChange={this._changeCode} value={this.props.formState.code} />
                    <input type="submit" value="Rechercher" />
                </div>
            </form>
        );
    }
}

export default SearchCompSuppliers;
