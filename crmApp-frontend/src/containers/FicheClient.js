import React from 'react';
import {TitreValeur} from '../js/components/TitreValeur.js';
import '../style/FicheClient.css';
import update from 'react-addons-update';


export class FicheClient extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            contactHidden: [true]
        };
        this.showContact = this.showContact.bind(this);
        this.setContactsState=this.setContactsState.bind(this);
        this.getPosition = this.getPosition.bind(this);
    }

    componentWillMount(){
            this.setContactsState();
    }

    // appelé avant de monter l'élément. Crée l'array state pour savoir quels contacts doivent etre cachés
    // si 4 contacts, ca va créer un array de length 4 [true,true,true,true] --> on cache tout au début
    setContactsState(){
        var nbContacts = this.props.client.contacts.length;
        for(var i = 0; i < nbContacts-1; i++){
            var initial = this.state.contactHidden;
            var newArray = update(initial, {$push:[true]});
            this.setState({contactHidden:newArray});
        }
    }
    // pour trouver la position de l'élément (contact) dans l'array client.contacts.
    // important pour savoir ce qui doit être caché (quel contact s'affiche en fonction de où on clique)
    getPosition(id){
        var position;
        for(var i = 0; i < this.props.client.contacts.length; i++) {
            if (this.props.client.contacts[i].id === id) {
                position = i;
            }
        }
        return position;
    }

    //ici l'argument qu'on donne est la position du client cliqué dans l'array props.client.contacts
    showContact(position){
        var etat = this.state.contactHidden[position];
        var nouveauState = this.state.contactHidden.splice(position, 1, !etat);
        //on force l'update pour que le component re-render et affiche le contact sur lequel on a cliqué
        this.forceUpdate();
    }

    render(){
        var client = this.props.client;
        return (
        <div className="container">
            <h1>Assurances collectives</h1>
            <h2>Fiche client</h2>
            <div className="grandTitre">
                <TitreValeur valeur={client.nomEntreprise} />
            </div>
            <div className="unePartie">
                <TitreValeur titre="Date" valeur={client.date}/>
                <TitreValeur titre="Nombre employés" valeur={client.nbEmployes} />
                    <TitreValeur titre="Rue" valeur={client.adresse.rue} />
                    <TitreValeur titre="Ville" valeur={client.adresse.ville} />
                    <TitreValeur titre="Province" valeur={client.adresse.province} />
                    <TitreValeur titre="Code postal" valeur={client.adresse.codePostal} />

                <TitreValeur titre="Numéro de téléphone" valeur={client.numTel} />
                <TitreValeur titre="Extension" valeur={client.extension} />
                <TitreValeur titre="Secteur d'activité" valeur={client.secteurActi} />
                <TitreValeur titre="Division (sous groupe)" valeur={client.division} />
                <TitreValeur titre="Chambre de commerce" valeur={client.chambreCommerce} />
                <TitreValeur titre="AGA" valeur={client.AGA} />
                <TitreValeur titre="RVER" valeur={client.RVER} />
            </div>
            <div className ="grandTitre">
                <TitreValeur valeur="Contacts" />
            </div>
            <div className="partieContacts">
                <TitreValeur titre="Référent dossier client" valeur={client.referentDossClient}/>
                {
                    client.contacts.map(element => {
                        var position = this.getPosition(element.id);
                        return(<div>
                            <div className="contactClicable" onClick={()=>this.showContact(position)}>
                                <TitreValeur titre="Nom" valeur={element.nom} />
                                <TitreValeur titre="Prénom" valeur={element.prenom} />
                            </div>
                            {!this.state.contactHidden[position] && <div className="cachable">
                                <TitreValeur titre="Sexe" valeur={element.sexe} />
                                <TitreValeur titre="N° de téléphone" valeur={element.numTel.cell} />
                                <TitreValeur titre="E-mail" valeur={element.email} />
                                <TitreValeur titre="Poste/rôle" valeur={element.poste} />
                            </div>}
                        </div>);
                    })
                }
            </div>
            <div className="grandTitre">
                <TitreValeur valeur={client.assureurs[0].nomCompagnie} />
            </div>
            <div className="unePartie">
                <TitreValeur titre="Référent" valeur={client.assureurs[0].referent} />
                <TitreValeur titre="Police" valeur={client.assureurs[0].police} />
                <TitreValeur titre="Mois renouvellement" valeur={client.assureurs[0].moisRenouv} />
                <TitreValeur titre="Admissible (mois)" valeur={client.assureurs[0].admissible} />
                <TitreValeur titre="Heures min" valeur={client.assureurs[0].heuresMin} />
                <TitreValeur titre="Mise à pied" valeur={client.assureurs[0].miseApied} />
                <TitreValeur titre="Prime mensuelle" valeur={client.assureurs[0].primeMens} />
                <TitreValeur titre="Date MAJ prime" valeur={client.assureurs[0].dateMAJPrime} />
                <TitreValeur titre="Vendeur 2" valeur={client.assureurs[0].vendeur2} />
                <TitreValeur titre="Split" valeur={client.assureurs[0].split} />
            </div>
            <div className="grandTitre">
                <TitreValeur valeur="Divers" />
            </div>
            <div className="unePartie">
                <TitreValeur titre="Goodies" valeur={client.poste} />
                <TitreValeur titre="Provenance client" valeur={client.provenance} />
                <TitreValeur titre="Infos complémentaires" valeur={client.infos} />



            </div>
        </div>
        )

    }
}
