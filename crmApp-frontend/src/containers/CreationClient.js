import React, { Component } from 'react';
import {GridCreationClient} from "../components/form/GridCreationClient";

export class CreationClient extends Component {
    constructor(props) {
        super(props);
        this.handleStatic = this.handleStatic.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitChamp = this.handleSubmitChamp.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleNonStatic = this.handleNonStatic.bind(this);
        this.state = {
            nbChamp: 14,
            grid: [
                {key: '1', label: 'nomEntreprise', nom: "Nom de l'entreprise "},
                {key: '2', label: 'date', nom: "Date "},
                {key: '3', label: 'nombreEmployes', nom: "Nombre d'employés "},
                {key: '4', label: 'rue', nom: "Rue "},
                {key: '5', label: 'ville', nom: "Ville "},
                {key: '6', label: 'province', nom: "Province "},
                {key: '7', label: 'codePostal', nom: "Code postal "},
                {key: '8', label: 'tel', nom: "Numéro de téléphone "},
                {key: '9', label: 'extension', nom: "Extension "},
                {key: '10', label: 'secteur', nom: "Secteur d'activité "},
                {key: '11', label: 'division', nom: "Division (sous-groupe) "},
                {key: '12', label: 'chambre', nom: "Chambre de commerce "},
                {key: '13', label: 'aga', nom: "AGA "},
                {key: '14', label: 'rver', nom: "RVER "},
            ]
        }
    }

    componentWillMount() {
        let layout = [];
        let y = 0;
        for (let i=0 ; i < 14 ; i++){
            let key = (i+1).toString();
            let x = (i % 4)*3;
            if(i % 4 === 0 && i !== 0) {
                y++;
            }
            layout.push({i: key, x: x, y: y, w: 3, h: 1, minW: 3})
        }
        this.setState({layout: layout});
    }

    handleStatic() {
        let stateCopy = Object.assign({}, this.state);
        stateCopy.layout = stateCopy.layout.slice();

        for (let champ = 0; champ < this.state.layout.length ; champ++) {
            stateCopy.layout[champ] = Object.assign({}, stateCopy.layout[champ]);
            stateCopy.layout[champ].static = true;
            this.setState(stateCopy);
        }
    }

    handleDrag(newItem) {
        this.setState({ layout: newItem });
    }

    handleNonStatic() {
        let stateCopy = Object.assign({}, this.state);
        stateCopy.layout = stateCopy.layout.slice();

        for (let champ = 0; champ < this.state.layout.length ; champ++) {
            stateCopy.layout[champ] = Object.assign({}, stateCopy.layout[champ]);
            stateCopy.layout[champ].static = false;
            this.setState(stateCopy);
        }
    }

    handleSubmit(event) {
       event.preventDefault();
    }

    handleSubmitChamp(event) {
        event.preventDefault();
        let stateCopy = this.state;
        stateCopy.layout = stateCopy.layout.slice();
        console.log(this.state.nbChamp);
        let key = (this.state.nbChamp+1).toString();
        console.log(key);
        let x = (this.state.nbChamp % 4)*3;
        let y=3;
        if(this.state.nbChamp % 4 === 0 && this.state.nbChamp !== 0) {
            y++;
        }
        stateCopy.layout.push({i: key, x: x, y: y, w: 3, h: 1, minW: 3});


        stateCopy.grid = stateCopy.grid.slice();
        stateCopy.grid.push({key: key, label: document.getElementById('champId').value, nom: document.getElementById('champNom').value});

        this.setState(stateCopy);
        this.setState({nbChamp: parseInt(key)});
        console.log(this.state);
    }

    render() {
        return (
            <GridCreationClient handleStatic={this.handleStatic} handleSubmit={this.handleSubmit} layout={this.state.layout}
                                handleDrag={this.handleDrag} handleNonStatic={this.handleNonStatic}
                                handleSubmitChamp={this.handleSubmitChamp} grid={this.state.grid}/>
        )
    }
}