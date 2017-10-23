import React, { Component } from 'react';
import { HistoriqueContainer } from "../containers/HistoriqueContainer";
import  RechercheComponent  from "./RechercheComponent";

export class PageFournisseurs extends Component {
    render() {
        return(

            <div>
                <h1>Fournisseurs</h1>
                <HistoriqueContainer page="PageFournisseurs" history={this.props.history}/>
                <RechercheComponent/>
            </div>

        );
    }
}