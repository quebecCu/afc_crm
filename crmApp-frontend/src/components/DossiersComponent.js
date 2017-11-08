import React, { Component } from 'react';

class DossiersComponent extends Component {

    handleClick() {
        this.props.history.push('/PageAccueil/assu-col/clients/client_1');
    }

    render() {
        if (this.props.historique) {
            this.rows = (
                <tbody>
                {this.props.historique.map(element => {
                    return (
                        <tr onClick={this.handleClick.bind(this)} key={element.nom}>
                            <td>{element.date}</td>
                            <td>{element.nom}</td>
                            <td>{element.type}</td>
                        </tr>
                    );
                })}
                </tbody>
            );
        }
        else if (this.props.collective){
            this.rows = (
                <tbody>
                {this.props.collective.map(element => {
                    return (
                        <tr onClick={this.handleClick.bind(this)} key={element.nom_entreprise}>
                            <td>{element.nom_entreprise}</td>
                            <td>{element.nom_employe}</td>
                            <td>{element.no_police}</td>
                            <td>{element.mois_renouvellement}</td>
                            <td>{element.nom_assureur}</td>
                            <td>{element.status}</td>
                            <td>{element.prospect}</td>
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
                    return (
                        <tr onClick={this.handleClick.bind(this)} key={element.nom}>
                            <td>{element.nom}</td>
                            <td>{element.employes}</td>
                            <td>{element.contact}</td>
                            <td>{element.code}</td>
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