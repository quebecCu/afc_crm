import React, { Component } from 'react';
import { HistoriqueContainer } from "./containers/HistoriqueContainer";
import {RechercheComponent} from "./components/RechercheComponent";

export class PageCollectivesClients extends Component {
    render() {
        return(
                <div>
                    <h1>Assurances collectives</h1>
                    <h2>Clients</h2>
                    <HistoriqueContainer/>
                    <RechercheComponent/>
                </div>
        );
    }
}