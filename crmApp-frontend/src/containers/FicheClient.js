import React from 'react';
import TitreValeur from "../components/TitreValeur";
//import '../style/FicheClient.css';

class FicheClient extends React.Component {
	constructor(props) {
		super(props);
		this.showContact = this.showContact.bind(this);
		this.setContactsState = this.setContactsState.bind(this);
		this.getPosition = this.getPosition.bind(this);
	}

	componentWillMount() {
		this.setContactsState();
	}

	// appelé avant de monter l'élément. Crée l'array state pour savoir quels contacts doivent etre cachés
	// si 4 contacts, ca va créer un array de length 4 [true,true,true,true] --> on cache tout au début
	setContactsState() {
		/*var nbContacts = this.props.client.contacts.length;
		for (var i = 0; i < nbContacts - 1; i++) {
			var initial = this.state.contactHidden;
			var newArray = update(initial, {$push: [true]});
			this.setState({contactHidden: newArray});
		}*/
	}

	// pour trouver la position de l'élément (contact) dans l'array client.contacts.
	// important pour savoir ce qui doit être caché (quel contact s'affiche en fonction de où on clique)
	getPosition(id) {
		/*var position;
		for (var i = 0; i < this.props.client.contacts.length; i++) {
			if (this.props.client.contacts[i].id === id) {
				position = i;
			}
		}
		return position;*/
	}

	//ici l'argument qu'on donne est la position du client cliqué dans l'array props.client.contacts
	showContact(position) {
		/*var etat = this.state.contactHidden[position];
		var nouveauState = this.state.contactHidden.splice(position, 1, !etat);
		//on force l'update pour que le component re-render et affiche le contact sur lequel on a cliqué
		this.forceUpdate();*/
	}

	render() {
		var client = this.props.client;
		return (
			<div className="container">
				<h1>Assurances collectives</h1>
				<h2>Fiche client</h2>
				<div className="grandTitre">
					<TitreValeur titre="Nom du groupe" valeur={client.nom_groupe}/>
				</div>
				<div className="unePartie">
					<TitreValeur titre="Date" valeur={client.date_creation}/>
					<TitreValeur titre="Responsable" valeur={client.responsable}/>
					<TitreValeur titre="Activité" valeur={client.activite}/>
					<TitreValeur titre="Etat" valeur={client.etat}/>
					<TitreValeur titre="Est un prospect" valeur={client.prospect}/>
					<TitreValeur titre="Rue" valeur=''/>
					<TitreValeur titre="Ville" valeur=''/>
					<TitreValeur titre="Province" valeur=''/>
					<TitreValeur titre="Code postal" valeur=''/>

					{this.props.optionnalFields.map(element => {
						return (
							<TitreValeur key={element.idRow} titre={Object.keys(element)[1]} valeur={element[Object.keys(element)[1]]}/>
						);
					})}
				</div>
				<div className="grandTitre">
					<TitreValeur valeur="Contacts"/>
				</div>
				<div className="grandTitre">
					<TitreValeur titre = "Assureur"/>
				</div>
				<div className="grandTitre">
					<TitreValeur valeur="Divers"/>
				</div>
				<div className="unePartie">
					<TitreValeur titre="Goodies"/>
					<TitreValeur titre="Provenance client"/>
					<TitreValeur titre="Infos complémentaires"/>
				</div>
			</div>
		)

	}
}

export default (FicheClient);
