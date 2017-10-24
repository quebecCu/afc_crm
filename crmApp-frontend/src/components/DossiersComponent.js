import React, { Component } from 'react';

class DossiersComponent extends Component {
    constructor(props) {
        super(props);
    }
    handleClick() {
        this.props.history.push('/PageAccueil/assu-col/clients/client_1');
    }

    render() {
        console.log(this.props.fournisseur);
        if (this.props.historique) {
            this.rows = (
                <tbody>
                {this.props.historique.map(element => {
                    return (
                        <tr onClick={this.handleClick.bind(this)}>
                            <td>{element.date}</td>
                            <td>{element.nom}</td>
                            <td>{element.type}</td>
                        </tr>
                    );
                })}
                </tbody>
            );
        }
        else if (this.props.dossiers){
            this.rows = (
                <tbody>
                {this.props.dossiers.map(element => {
                    return (
                        <tr onClick={this.handleClick.bind(this)}>
                            <td>{element.nom}</td>
                            <td>{element.employe}</td>
                            <td>{element.police}</td>
                            <td>{element.mois}</td>
                            <td>{element.assureur}</td>
                        </tr>
                    );
                })}
                </tbody>
            );
        }
        else {
            this.rows = (
                <tbody>
                {this.props.fournisseur.map(element => {
                    console.log(element);
                    return (
                        <tr onClick={this.handleClick.bind(this)}>
                            <td>{element.nom}</td>
                            <td>{element.contact}</td>
                        </tr>
                    );
                })}
                </tbody>
            );
        }
        return this.rows;
    }
}

export default (DossiersComponent);