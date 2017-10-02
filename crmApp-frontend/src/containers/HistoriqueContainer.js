import React, { Component } from 'react';
import { DossiersComponent } from "../js/components/DossiersComponent";
import '../style/PageAccueil.css';

export class HistoriqueContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { historique: [{date: "20/09/2017", nom: "Kim", type: "Individuelle"},{date: "18/09/2017", nom: "Co", type: "Collective"}],
                dossiers: [
                    {nom: 'Eagle', employe: 'Bob lee', police: '76A34F', mois: 'Juin', assureur: 'Enterprise'},
                    {nom: 'Hut', employe: 'Marine Hu', police: '76B74C', mois: 'Octobre', assureur: 'Enterprise'},
                    {nom: 'Goal', employe: 'Fry Rob', police: '43H98O', mois: 'Septembre', assureur: 'Pomm'},
                    {nom: 'GRILL', employe: 'Some Guy', police: 'FFFFFF', mois: 'Decembre', assureur: 'Med'},
                    {nom: 'Fukiko Corp.', employe: 'Fukiko Garbe', police: '123432', mois: 'Decembre', assureur: 'Gilles Garbe'}
                ],
                fournisseur: [
                    {nom: 'Enterprise', contact: 'Gael Fou'},
                    {nom: 'Pomm', contact: 'Sasha Du'},
                    {nom: 'Med', contact: 'Elo Si'},
                    {nom: 'RE', contact: 'Maxime Tar'}
                ]
            };
        }
    componentWillMount() {
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
                    <table>
                        <thead>
                        <tr>
                            <th>Nom de l'entreprise</th>
                            <th>Nom employé</th>
                            <th>N° de police</th>
                            <th>Mois de renouvellement</th>
                            <th>Assureur</th>
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
                            <th>Nom contact</th>
                        </tr>
                        </thead>
                        <DossiersComponent fournisseur={this.state.fournisseur} history={this.props.history}/>
                    </table>
                );
                break;
            default:

                break;
        }
    }
    render() {
        return this.table;
    }
}