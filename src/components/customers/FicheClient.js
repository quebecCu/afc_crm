import React from 'react';
import {connect} from 'react-redux';
import TitreValeur from "../TitreValeur";
//import '../style/FicheClient.css';
import {Responsive, WidthProvider} from 'react-grid-layout';
import {changeIdDisplay, deleteCustomer, requestGrid} from "../../actions/crmGridLayout";
import {getClientRequest} from "../../actions/crmClientList";
import {setFromClient} from "../../actions/crmContract";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

class FicheClient extends React.Component {
	constructor(props) {
		super(props);
		this.props.getClientRequest(this.props.idClient);
		this.props.requestGrid(this.props.idClient);
		this.showContact = this.showContact.bind(this);
		this.setContactsState = this.setContactsState.bind(this);
		this.getPosition = this.getPosition.bind(this);
		this._handleModify = this._handleModify.bind(this);
		this._handleDelete = this._handleDelete.bind(this);
		this.dropDownClient = this.dropDownClient.bind(this);
		this._handleContract = this._handleContract.bind(this);
	}

	componentWillMount() {
		this.setContactsState();
	}

	_handleContract(event) {
		this.props.changeViewContract("create");
		this.props.changeViewDashboard("contracts");
		let nombreEmployes= 0;
		let sousGroupe = '';
		this.props.optionnalFields.forEach(element => {
			if (element.idRow === 1) {
				nombreEmployes = element.valeur;
			}
			if (element.idRow === 6) {
				sousGroupe = element.valeur;
			}
		});
		this.props.setFromClient({
			idClient: event.target.value,
			name: this.props.client.nom,
			sousGroupe: sousGroupe,
			nombreEmployes: nombreEmployes
		});
	}


	dropDownClient(event){
		    var x = document.getElementById("wrapperClient");
		    if (x.className.indexOf("show") === -1) {
		    	 x.className += "show";
		    	document.getElementById("wrapperClient").style.display = "";

		    } else {
		        x.className = x.className.replace("show", "");
		        document.getElementById("wrapperClient").style.display = "none";
		        }

	}

	dropDownContacts(event){
	    var x = document.getElementById("wrapperContacts");
	    if (x.className.indexOf("show") === -1) {
	    	 x.className += "show";
	    	document.getElementById("wrapperContacts").style.display = "";

	    } else {
	        x.className = x.className.replace("show", "");
	        document.getElementById("wrapperContacts").style.display = "none";
	        }

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

	_handleModify(event) { 
		this.props.handleClick("customerFile"); 
		this.props.changeIdDisplay(event.target.value); 
	}

	_handleDelete(event) {
		this.props.deleteCustomer(event.target.value);
	}

	renderLinkAttribute(attributeName, attributeValue) {
    return (
			<div className="form-group row">
				<label htmlFor="staticEmail" className="col-sm-6 col-form-label"><strong>{attributeName}:</strong> </label>
				<div className="col-sm-6">
					<button type="button" className="btn btn-link">{attributeValue}</button>
				</div>
			</div>
    );
  }

	renderStaticAttribute(attributeName, attributeValue, width, key) {
		const inputStyle = {
			padding: '6px 12px',
		}
    return (
			<div key={key} className="form-group row">
				<label htmlFor="staticEmail" className={"col-form-label  " + (width === 6 ? "col-sm-6" : "col-sm-2")}><strong>{attributeName}:</strong> </label>
				<div className={(width === 6 ? "col-sm-6" : "col-sm-10")}>
					<input style={inputStyle} type="text" readOnly className="form-control-plaintext" id="aga" value={attributeValue}/>
				</div>
			</div>
    );
  }

	render() {
		let {isAdmin} = this.props.crmLogin;
		let {loading} = this.props.crmDashboard;
		let {layouts} = this.props.crmGridLayout;
		let {contacts} = this.props.crmContacts;
		let client = this.props.crmClientList.client;
		return (
			<div className="container">
				<h1 className="text-center">Assurances collectives</h1>
				<div className="card mb-3">
					<div className="card-header">
		      	<i className="fa fa-file-o"></i> Client
					</div>
					<div className="card-body">
						<div className="text-right">
							{
								isAdmin && <button type="button" className="btn btn-danger"
															  onClick={this._handleDelete} value={client.idclient}>
															Passer la fiche client en annulé
														</button>
							}
							<button type="button" className="btn btn-secondary"
									onClick={this._handleContract}
									value={client.idclient}>
								<i className="fa fa-plus"></i> Créer un contrat avec ce client
							</button>
							<button type="button" className="btn btn-primary" onClick={this._handleModify}><i className="fa fa-cog"></i> Modifier</button>
							<button type="button" className="btn btn-danger"><i className="fa fa-close"></i> Supprimer</button>
						</div>
						<br/>
						<div id="accordion">
						  <div className="card">
						    <div className="card-header" id="headingOne">
						      <h5 className="mb-0">
						        <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
						          Information G&eacute;n&eacute;rale
						        </button>
						      </h5>
						    </div>

						    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
						      <div className="card-body">
										<div className="row">
											<div className="col-sm-6">
												{this.renderStaticAttribute("Nom du groupe",client.nom,6)}
												{this.renderStaticAttribute("Date",client.date_creation,6)}
												{this.renderStaticAttribute("Responsable",client.responsable,6)}
												{this.renderStaticAttribute("Activité",client.forme_type,6)}
												{
													client.prospect && this.renderStaticAttribute("Est un prospect","Oui",6)
												}
												{
													!client.prospect && this.renderStaticAttribute("Est un prospect","Non",6)
												}
												{this.renderStaticAttribute("Relevés",client.releve,6)}
											</div>
											<div className="col-sm-6">
												{this.renderStaticAttribute("Téléphone principal",client.tel_principal,6)}
												{this.renderStaticAttribute("Extension",client.ext_tel_principal,6)}
												{this.renderStaticAttribute("Rue",client.rue,6)}
												{this.renderStaticAttribute("Ville",client.ville,6)}
												{this.renderStaticAttribute("Province",client.province,6)}
												{this.renderStaticAttribute("Code postal",client.codepostal,6)}
											</div>
											<div className="col-sm-12">
												{this.renderStaticAttribute("Notes",client.notes)}
											</div>
										</div>
						      </div>
						    </div>
						  </div>
							<div className="card">
						    <div className="card-header" id="headingTwo">
						      <h5 className="mb-0">
						        <button className="btn btn-link" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
						          Information Compl&eacute;mentaire
						        </button>
						      </h5>
						    </div>

						    <div id="collapseTwo" className="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">
						      <div className="card-body">
										<div className="row">
											{
												client.facultatif.map(element => {
													return (
														<div className="col-sm-6">
															{this.renderStaticAttribute(element.nom,element.valeur,6,element.idRow)}
														</div>
													);
												})
											}
										</div>
						      </div>
						    </div>
						  </div>
							<div className="card">
						    <div className="card-header" id="headingThree">
						      <h5 className="mb-0">
						        <button className="btn btn-link" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
						          Contacts
						        </button>
						      </h5>
						    </div>

						    <div id="collapseThree" className="collapse show" aria-labelledby="headingThree" data-parent="#accordion">
						      <div className="card-body">
										{ 
											contacts.map(contact => { 
												return ( 
													<div>
														<div className="row" key={contact.idpersonne}> 
															<div className="col-sm-6">
																{this.renderStaticAttribute("Titre",contact.libelletitre,6)}
																{this.renderStaticAttribute("Prénom",contact.prenom,6)}
																{this.renderStaticAttribute("Nom",contact.nom,6)}
																{this.renderStaticAttribute("Poste",contact.libelleposte,6)}
															</div> 
															<div className="col-sm-6"> 
																{this.renderStaticAttribute("N° de Téléphone",contact.num_tel_principal,6)}
																{this.renderStaticAttribute("Extension",contact.ext_tel_principal,6)}
																{this.renderStaticAttribute("Mail",contact.mail,6)}
																{
																	client.prospect && this.renderStaticAttribute("Décideur","Oui",6)
																} 
																{ 
																	!client.prospect && this.renderStaticAttribute("Décideur","Non",6)
																} 
															</div> 
														</div> 
														<hr/>
													</div>
												); 
											}) 
										}
						      </div>
						    </div>
						  </div>
						</div>
					</div>
				</div>
			</div>
		)

	}
}

function mapStateToProps(state) {

	return {
		crmClientList: state.crmClientList,
		crmLogin: state.crmLogin,
		crmDashboard: state.crmDashboard,
		crmGridLayout: state.crmGridLayout,
		crmContacts: state.crmContacts
	}
}

//fonctions
const mapDispatchToProps = (dispatch) => {
	return {
		getClientRequest: (idClient) => {
			dispatch(getClientRequest(idClient));
		},
		changeIdDisplay: (newId) => {
			dispatch(changeIdDisplay(newId))
		},
		deleteCustomer: (id) => {
			dispatch(deleteCustomer(id));
		},
		requestGrid: (id) => {
			dispatch(requestGrid(id));
		},
		setFromClient:(fromClient) => {
			dispatch(setFromClient(fromClient))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(FicheClient);
