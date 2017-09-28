import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export class ButtonsComponent extends Component {
    render() {
        let buttons;
        if (this.props.page === 'PageAccueil') {
            buttons = [{path: '/assu-col', nom: 'Assurances collectives'},
                {path: '/assu-ind', nom: 'Assurances individuelles'},
                {path: '/placements', nom: 'Placements'},
                {path: '/fournisseurs', nom: 'Fournisseurs'}];
        }
        else if (this.props.page === 'PageCollectives') {
            buttons = [{path: '/assu-col/clients', nom: 'Clients'},
                {path: '/assu-col/fournisseurs', nom:'Fournisseurs'}];
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