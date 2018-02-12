import React, { Component } from 'react';
import HistoriqueContainer from "../containers/HistoriqueContainer";

class PageAccueil extends Component {


    render() {
        return (
          <div>
            <div className="jumbotron">
              <h1 className="display-4">Bonjour {localStorage.getItem('username')}</h1>
              <p className="lead">Bienvenue sur votre page d'accueil.</p>
            </div>
            <h2 className="titre-historique">Derniers dossiers consultés</h2>
            <HistoriqueContainer page='PageAccueil' history={this.props.history}/>
          </div>
        );
    }
}

export default (PageAccueil);
