import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../NavBar.css';
import {PageCollectives} from "../PageCollectives";
import {PageFournisseurs} from "../PageFournisseurs";
import {PageCollectivesClients} from "../PageCollectivesClients";
import {
    Route
} from 'react-router-dom'

export class BarreNav extends Component {
    constructor(props) {
        super(props);
        this.state = { prevPath: ''};
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.location !== this.props.location) {
            this.setState({ prevPath: this.props.location });
        }
    }
    render() {
        let liens = [{path: '/', nom: 'Accueil'},
            {path: '/assu-ind', nom: 'Assurances individuelles'},
            {path: '/assu-col', nom: 'Assurances collectives'},
            {path: '/placements', nom: 'Placements'},
            {path: '/fournisseurs', nom: 'Fournisseurs'},
            {path: '/', nom: 'Déconnexion'},
            {path: '/', nom: 'Retour'}];

        switch (this.props.location.pathname){
            case "/assu-ind":
                liens[1].active = true;
                break;
            case "/assu-col":
                liens[2].active = true;
                break;
            case "/placements":
                liens[3].active = true;
                break;
            case "/fournisseurs":
                liens[4].active = true;
                break;
            case "/assu-col/clients":
                liens[2].active = true;
                break;
        }
        return (
            <div id="pageNavBar">
                <div id="navBar">
                    <h2>AFC inc.</h2>
                    <ul>
                        {
                            liens.map(element => {
                                if (element.active) {
                                    return (
                                        <Link to={element.path} style={{textDecoration: 'none'}} ><li className='active'>{element.nom}</li></Link>
                                    );
                                }

                                else if (element.nom === 'Retour') {
                                    return (
                                        <Link to={this.state.prevPath} style={{textDecoration: 'none'}}><li>{element.nom}</li></Link>
                                    );
                                }
                                else {
                                    return (
                                        <Link to={element.path} style={{textDecoration: 'none'}}><li>{element.nom}</li></Link>
                                    );
                                }
                            })
                        }
                    </ul>
                </div>
                <div id="main">
                    <Route exact path={'/assu-col'} component={PageCollectives}/>
                    <Route path={'/fournisseurs'} component={PageFournisseurs}/>

                    <Route path="/assu-col/clients" component={PageCollectivesClients}/>
                </div>
            </div>
        );
    }
}