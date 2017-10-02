import React, { Component } from 'react';
import '../../style/RechercheComponent.css';

export class RechercheComponent extends Component {
    render() {
        return(
            <form action="" id="recherche">
                <input type="text" placeholder="Nom entreprise"/>
                <input type="text" placeholder="Nom employé"/>
                <input type="text" placeholder="N° police"/>
                <input type="text" placeholder="Mois renouvellement"/>
                <input type="text" placeholder="Assureur"/>
                <input type="submit" value="Rechercher" />
            </form>
        );
    }
}