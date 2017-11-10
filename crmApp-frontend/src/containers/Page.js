import React, { Component } from 'react';
import {FicheClient} from './FicheClient.js';

class Page1 extends Component{
    constructor(props){
        console.log("WTTTTf");
        super(props);
        this.state = {
            clients: [
                {
                    id: 123456,
                    nomEntreprise: "NomEntreprise X",
                    date: "22-06-1992",
                    nbEmployes: 4,
                    adresse: {
                        rue: "78 bis Avenue de Belfort",
                        ville: "Bondy",
                        province: "seine St Denis",
                        codePostal: 93140
                    },
                    numTel: "0123456789",
                    extension: "1121",
                    secteurActi: "Commerce",
                    division: "Site de Bondy",
                    AGA: "AGA",
                    RVER: "RVER",
                    chambreCommerce: "ChambreX",
                    referentDossClient: "Paul Mendes",
                    contacts: [
                        {
                            id: 310,
                            nom: "Mendes",
                            prenom: "Paul",
                            dateNaissance: "06-05-2013",
                            sexe: "H",
                            numTel:
                                {
                                    bureau: "023456683",
                                    cell: "345768490"
                                },

                            email: "paul.mendes@mail.com",
                            poste: "PDG"
                        },
                        {
                            id: 120,
                            nom: "Perez",
                            prenom: "Marina",
                            dateNaissance: "04-04-2015",
                            sexe: "F",
                            numTel:
                                {
                                    bureau: "",
                                    cell: "0656789456"
                                },
                            email: "Perez.marina@mail.com",
                            poste: "Responsable RH"
                        }
                    ],
                    assureurs: [
                        {
                            nomCompagnie: "assureur",
                            referent: "Aline Ladriere",
                            police: "#123432",
                            moisRenouv: 12,
                            admissible: 4,
                            heuresMin: 30,
                            miseApied: 4,
                            primeMens: 300,
                            primeAnn: 200,
                            dateMAJPrime: "13-07-2009",
                            vendeur2: "Pierrick Levendeur",
                            split: "50%",
                        }
                    ],
                    historiqueTaux: [
                        {
                            annee: 2010,
                            employes: 6,
                            compagnie: "assureur2",
                            difference: "x",
                            vie: "x",
                        },
                        {
                            annee: 2011,
                            employes: 8,
                            compagnie: "assureur2",
                            diff: 4,
                            vie: "x"
                        }
                    ],
                    poste: "Bulletin, calendrier, carte noel, carte voeux",
                    provenance: "Bouche à oreille",
                    infos: "Première fiche client"
                }
            ],
        }

    }

    render(){
    	console.log('hey');
        return <FicheClient client={this.state.clients[0]}/>;
    }

}

export default (Page1);
