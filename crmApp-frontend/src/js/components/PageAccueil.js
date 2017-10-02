import React, { Component } from 'react';
import logo from '../../style/logo.svg';
import '../../style/App.css';

import { ButtonsComponent } from "./ButtonsComponent";
import { HistoriqueContainer } from "../../containers/HistoriqueContainer";

export class PageAccueil extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome Mr X</h2>
                </div>
                    <ButtonsComponent page='PageAccueil'/>
                <h2 className="titre-historique">Derniers dossiers consultés</h2>
                <HistoriqueContainer/>
            </div>
        );
    }
}