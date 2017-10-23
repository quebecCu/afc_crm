import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export class ButtonsComponent extends Component {
    render() {
        let buttons;
        if (this.props.page === 'PageAccueil') {
            buttons = [{path: '/PageAccueil/assu-col', nom: 'Assurances collectives'},
                {path: '/PageAccueil/assu-ind', nom: 'Assurances individuelles'},
                {path: '/PageAccueil/placements', nom: 'Placements'},
                {path: '/PageAccueil/fournisseurs', nom: 'Fournisseurs'}];
        }
        else if (this.props.page === 'PageCollectives') {
            buttons = [{path: '/PageAccueil/assu-col/clients', nom: 'Clients'},
                {path: '/PageAccueil/assu-col/fournisseurs', nom:'Fournisseurs'}];
        }
        else if (this.props.page === 'PageCollectivesClients') {
            buttons = [{path: '/PageAccueil/assu-col/clients/NouveauClient', nom: 'Nouveau Client'}]
        }
        return (
            <div>
                {
                    buttons.map(element => {
                        return (
                            <Link to={element.path}><button>{element.nom}</button></Link>
                        );
                    })
                }
            </div>
        );
    }
}