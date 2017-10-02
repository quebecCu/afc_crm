import React from 'react';
import {FicheClient} from './FicheClient.js';

export class page1 extends React.Component{
    constructor(props){
        console.log("WTTTTf");
        super(props);
        this.state = {
            clients: [
                {
                    id: 123456,
                    nomEntreprise: "Fukiko Corporation",
                    date: "22-06-1992",
                    nbEmployes: 4,
                    adresse: {
                        rue: "78 bis Avenue de Belfort",
                        ville: "Bondy",
                        province: "seine St Denis",
                        codePostal: 93140
                    },
                    numTel: "0178085828",
                    extension: "",
                    secteurActi: "Revente de chiens",
                    division: "Site de Bondy",
                    AGA: null,
                    RVER: "",
                    chambreCommerce: "93bitch",
                    referentDossClient: "Biscotte Bibi",
                    contacts: [
                        {
                            id: 310,
                            nom: "Garbe",
                            prenom: "Fukiko",
                            dateNaissance: "06-05-2013",
                            sexe: "mâle",
                            numTel:
                                {
                                    bureau: "O178085828",
                                    cell: "0626252711"
                                },

                            email: "FukiCutieDog@Doggy.dog",
                            poste: "PDG secteur chiens"
                        },
                        {
                            id: 120,
                            nom: "Garbe",
                            prenom: "Bibichoune",
                            dateNaissance: "04-04-2015",
                            sexe: "femelle",
                            numTel:
                                {
                                    bureau: "",
                                    cell: "0626252711"
                                },
                            email: "BiscotteRules@kittykat.chat",
                            poste: "Responsable chats"
                        }
                    ],
                    assureurs: [
                        {
                            nomCompagnie: "assureur",
                            referent: "Gilles Garbe",
                            police: "#123432",
                            moisRenouv: 12,
                            admissible: 4,
                            heuresMin: 30,
                            miseApied: 4,
                            primeMens: 300,
                            primeAnn: 200,
                            dateMAJPrime: "13-07-2009",
                            vendeur2: null,
                            split: null,
                        }
                    ],
                    historiqueTaux: [
                        {
                            annee: 2010,
                            employes: 6,
                            compagnie: "assureur2",
                            difference: null,
                            vie: null,
                        },
                        {
                            annee: 2011,
                            employes: 8,
                            compagnie: "assureur2",
                            diff: 4,
                            vie: null
                        }
                    ],
                    poste: "Bulletin, calendrier, carte noel, carte voeux",
                    provenance: "gueule à oreille",
                    infos: "C'est un très bon chien"
                }
            ],
        }

    }

    render(){
        return <FicheClient client={this.state.clients[0]}/>;
    }
}