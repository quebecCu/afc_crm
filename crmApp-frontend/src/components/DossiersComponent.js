import React, { Component } from 'react';

export class DossiersComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <tbody>
                {this.props.dossiers.map(element => {
                    return (
                        <tr>
                            <td>{element.date}</td>
                            <td>{element.nom}</td>
                            <td>{element.type}</td>
                        </tr>
                    );
                })}
            </tbody>
        );
    }
}