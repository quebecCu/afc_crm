import React, { Component } from 'react';
import logo from '../style/logo.svg';
import '../style/App.css';
import { ButtonsComponent } from "./ButtonsComponent";
import HistoriqueContainer from "../containers/HistoriqueContainer";
import Request from 'superagent' ;
import {store} from '../store';
import {push} from 'react-router-redux';

class PageAccueil extends Component {
	
	constructor(props) {
		super(props);
	}

	
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome  {this.props.formState.username}</h2>
                </div>
                    <ButtonsComponent page='PageAccueil'/>
                <h2 className="titre-historique">Derniers dossiers consultés</h2>
                <HistoriqueContainer page='PageAccueil' history={this.props.history}/>
            </div>
        );
    } 
}

export default (PageAccueil);