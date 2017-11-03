import React, { Component } from 'react';
import DossiersComponent from "../components/DossiersComponent";
import '../style/PageAccueil.css';

class HistoriqueContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { historique: [{date: "20/09/2017", nom: "Kim", type: "Individuelle"},{date: "18/09/2017", nom: "Co", type: "Collective"}],
                dossiers: [
                    {nom: 'Eagle', employe: 'Bob lee', police: '76A34F', mois: 'Juin', assureur: 'Enterprise', statut: 'actif', prospect : 'prospect'},
                    {nom: 'Hut', employe: 'Marine Hu', police: '76B74C', mois: 'Octobre', assureur: 'Enterprise', statut: 'annulé', prospect : 'prospect'},
                    {nom: 'Goal', employe: 'Fry Rob', police: '43H98O', mois: 'Septembre', assureur: 'Pomm', statut: 'annulé', prospect : ''},
                    {nom: 'GRILL', employe: 'Some Guy', police: 'FFFFFF', mois: 'Decembre', assureur: 'Med', statut: 'actif', prospect : ''},
                    {nom: 'Fukiko Corp.', employe: 'Fukiko Garbe', police: '123432', mois: 'Decembre', assureur: 'Gilles Garbe', statut: 'actif', prospect : 'prospect'}
                ]
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
                    <table id="PageCollectivesClientsTable">
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
                        <DossiersComponent dossiers={this.state.dossiers} history={this.props.history}/>
                    </table>
                );
                break;
            case 'PageFournisseurs':
                this.table = (
                    <table>
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
                );
                break;
            default:

                break;
        }
        return this.table;
    }
}

export default (HistoriqueContainer);