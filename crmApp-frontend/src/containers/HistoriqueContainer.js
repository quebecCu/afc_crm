import React, { Component } from 'react';
import { DossiersComponent } from "../components/DossiersComponent";
import '../PageAccueil.css';

export class HistoriqueContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { dossiers: [{date: "20/09/2017", nom: "Kim", type: "Individuelle"},{date: "18/09/2017", nom: "Co", type: "Collective"}] };
    }
    render() {
        return(
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Nom</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <DossiersComponent dossiers={this.state.dossiers} />
            </table>
        );
    }
}