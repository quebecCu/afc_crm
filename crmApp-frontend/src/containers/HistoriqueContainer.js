import React, { Component } from 'react';
import DossiersComponent from "../components/DossiersComponent";
import '../style/PageAccueil.css';

class HistoriqueContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { historique: [{date: "20/09/2017", nom: "Kim", type: "Individuelle"},{date: "18/09/2017", nom: "Co", type: "Collective"}],
            };
        }


    render() {
        switch (this.props.page) {
            case 'PageAccueil':
                this.table = (
                    <table>
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Nom</th>
                            <th>Type</th>
                        </tr>
                        </thead>
                        <DossiersComponent historique={this.state.historique} history={this.props.history}/>
                    </table>
                );
                break;
            case 'PageCollectivesClients':
                this.table = (
                		<div style={{ overflow: 'auto', height:'300px',}}>
                    <table id="PageCollectivesClientsTable" >
                        <thead>
                        <tr>
                            <th>Nom de l'entreprise</th>
                            <th>Nom employé</th>
                            <th>N° de police</th>
                            <th>Mois de renouvellement</th>
                            <th>Assureur</th>
                            <th>Statut</th>
                            <th>Prospect</th>
                        </tr>
                        </thead>
                        <DossiersComponent collective={this.props.dossiersState} history={this.props.history}/>
                    </table>
                        </div>
                );
                break;
            case 'PageFournisseurs':
                this.table = (
                		<div style={{ overflow: 'auto', height:'300px',}}>
                    <table id="PageFournisseursTable" >
                        <thead>
                        <tr>
                            <th>Nom de l'assurance</th>
                            <th>Nombre d'employés</th>
                            <th>Nom contact</th>
                            <th>Code</th>
                        </tr>
                        </thead>
                        <DossiersComponent fournisseur={this.props.dossiersState} history={this.props.history}/>
                    </table>
                        </div>

                );
                break;
            default:

                break;
        }
        return this.table;
    }
}

export default (HistoriqueContainer);