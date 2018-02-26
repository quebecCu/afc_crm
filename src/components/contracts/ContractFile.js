import React from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router'
import {Responsive, WidthProvider} from 'react-grid-layout';
import TitreValeur from "../TitreValeur";
import {getClientRequest} from "../../actions/crmClientList";
import {getSupplier} from "../../actions/crmGridLayoutSuppliers";
import {setFromClient,getContract,setSelectedTaux,setSelectedRemuneration} from "../../actions/crmContract";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class ContractFile extends React.Component {
	constructor(props) {
		super(props);
		this.props.getContract(this.props.idContract);
		this.showContact = this.showContact.bind(this);
		this.setContactsState = this.setContactsState.bind(this);
		this.getPosition = this.getPosition.bind(this);
		this._handleModify = this._handleModify.bind(this);
		this._changeSelectedTaux = this._changeSelectedTaux.bind(this);
		this.dropDownClient = this.dropDownClient.bind(this);
		this.dropDownTaux = this.dropDownTaux.bind(this);
		this.dropDownSouscriptions = this.dropDownSouscriptions.bind(this);
		this._handleClient = this._handleClient.bind(this);
		this._handleAssureur = this._handleAssureur.bind(this);
	}

	componentWillMount() {
		this.setContactsState();
	}

	_handleClient(contract, event) {
		event.preventDefault();
		this.props.displaySubCustomerNav(true);
		let links = this.props.linksSubCustomer;
		let check = true;
		links.forEach(link => {
			if (link.idCustomer === contract.idfournisseur) {
				check = false;
			}
		});
		if (check) {
			links.push({name: contract.nomclient, view: 'customer', idCustomer: contract.idclient});
			this.props.addSubCustomerNav(links);
		}
		this.props.changeViewCollective("customer");
		this.props.changeViewDashboard("collIns");
		this.props.changeLoading(true);
		this.props.getClientRequest(contract.idclient);
	}

	_handleAssureur(contract, event) {
		event.preventDefault();
		this.props.displaySubSupplierNav(true);
		let links = this.props.linksSubSupplier;
		let check = true;
		links.forEach(link => {
			if (link.idSupplier === contract.idfournisseur) {
				check = false;
			}
		});
		if (check) {
			links.push({name: contract.nomfournisseur, view: 'supplierFile', idSupplier: contract.idfournisseur});
			this.props.addSubSupplierNav(links);
		}
		this.props.changeViewSuppliers("supplierFile");
		this.props.changeViewDashboard("suppliers");
		this.props.changeLoading(true);
		this.props.getSupplier(contract.idfournisseur);
	}

	dropDownClient() {
		let x = document.getElementById("wrapperClient");
		if (x.className.indexOf("show") === -1) {
			x.className += "show";
			document.getElementById("wrapperClient").style.display = "";

		} else {
			x.className = x.className.replace("show", "");
			document.getElementById("wrapperClient").style.display = "none";
		}

	}

	dropDownContacts() {
		let x = document.getElementById("wrapperContacts");
		if (x.className.indexOf("show") === -1) {
			x.className += "show";
			document.getElementById("wrapperContacts").style.display = "";

		} else {
			x.className = x.className.replace("show", "");
			document.getElementById("wrapperContacts").style.display = "none";
		}

	}

	dropDownTaux() {
		let x = document.getElementById("wrapperTaux");
		if (x.className.indexOf("show") === -1) {
			x.className += "show";
			document.getElementById("wrapperTaux").style.display = "";

		} else {
			x.className = x.className.replace("show", "");
			document.getElementById("wrapperTaux").style.display = "none";
		}
	}

	dropDownSouscriptions() {
		let x = document.getElementById("wrapperSouscriptions");
		if (x.className.indexOf("show") === -1) {
			x.className += "show";
			document.getElementById("wrapperSouscriptions").style.display = "";

		} else {
			x.className = x.className.replace("show", "");
			document.getElementById("wrapperSouscriptions").style.display = "none";
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

	_changeSelectedTaux(taux) {
		this.props.setSelectedTaux(taux);
	}

	_changeSelectedRemuneration(remuneration) {
		this.props.setSelectedRemuneration(remuneration);
	}

	_handleModify(event) {
		let contract = this.props.contract;
		this.props.clients.forEach(client => {
			if(client.id === contract.idclient) {
				let fromClient =
					{
						idClient: client.id,
						name: client.nom_groupe,
						sousGroupe: '',
						nombreEmployes: '',
						update: true
					};
				this.props.setFromClient(fromClient);
			}
		});
		this.props.changeViewContract("updatecontract");
		//this.props.changeIdDisplay(event.target.value);
	}
	
	_handleModify(match, history, event) {
		history.push(match.url + "/update");
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
		let {contractDisplay, lilLayout, selectedTaux, selectedRemuneration} = this.props.crmContract;
		let layouts = {lg: lilLayout, md: lilLayout, sm: lilLayout, xs: lilLayout, xxs: lilLayout};
		const { match, history } = this.props;

		return (
			<div>
				<h1 className="text-center">Assurances collectives</h1>
				<div className="card mb-3">
					<div className="card-header">
		      	<i className="fa fa-file-o"></i> Contrat
					</div>
					<div className="card-body">
						<div className="text-right">
							<div className="btn-group" role="group" aria-label="Basic example">
								<button type="button" className="btn btn-primary" onClick={this._handleModify.bind(this, match, history)}><i className="fa fa-cog"></i> Modifier</button>
								<button type="button" className="btn btn-danger"><i className="fa fa-close"></i> Supprimer</button>
							</div>
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
												{this.renderStaticAttribute("N° Police",contractDisplay.police,6)}
												{this.renderLinkAttribute("Client",contractDisplay.nomclient,6)}
												{this.renderLinkAttribute("Assureur",contractDisplay.nomfournisseur,6)}
												{this.renderLinkAttribute("Représentant",contractDisplay.nomrepresentant,6)}
											</div>
											<div className="col-sm-6">
												{this.renderStaticAttribute("AGA",contractDisplay.libellechambrecommerce,6)}
												{this.renderStaticAttribute("Date de signature",contractDisplay.date_signature,6)}
												{this.renderStaticAttribute("Mois de renouvellement",contractDisplay.mois_renouvellement,6)}
												{this.renderStaticAttribute("Notes",contractDisplay.notes,6)}
											</div>
										</div>
						      </div>
						    </div>
						  </div>
							<div className="card">
						    <div className="card-header" id="headingTwo">
						      <h5 className="mb-0">
						        <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
						          Informations complémentaires
						        </button>
						      </h5>
						    </div>
						    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
						      <div className="card-body">
										<div className="row">
											{
													contractDisplay.facultatif.map(element => {
													return <div className="col-sm-6">
														{this.renderStaticAttribute(element.nom,element.valeur,6,element.nom)}
													</div>;
												})
											}
										</div>
						      </div>

						    </div>
						  </div>
							<div className="card">
						    <div className="card-header" id="headingThree">
						      <h5 className="mb-0">
						        <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
						          Souscriptions
						        </button>
						      </h5>
						    </div>
						    <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
						      <div className="card-body">
										{
											contractDisplay.souscriptions.map((element, index) => {
												return <div key={index}>
													{this.renderStaticAttribute("Module",element.libelle)}
													{this.renderStaticAttribute("Notes du module",element.module_notes)}
													<div>

															{
																element.subscriptions.map((element2, index2) => {
																	return <details key={index2}> <summary>{element2.libelle}</summary>
																			<div style={{paddingLeft: "20px"}}>
																				{this.renderStaticAttribute("Notes de la souscription",element2.souscription_notes)}
																				{this.renderStaticAttribute("Description",element2.description)}
																				{this.renderStaticAttribute("Ext",element2.ext)}
																				{this.renderStaticAttribute("Valeur",element2.valeur)}
																			</div>
																	  </details>
																})
															}
													</div>

													<hr/>
												</div>
											})
										}
						      </div>
						    </div>
						  </div>
						  <div className="card">
						    <div className="card-header" id="headingFour">
						      <h5 className="mb-0">
						        <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
						          Historique des taux
						        </button>
						      </h5>
						    </div>
						    <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordion">
						      <div className="card-body">
										<div className="row">
											<div className="col-md-2 col-xs-12">
												<div className="dropdown">
													<button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
														{selectedTaux.annee_dep} - {selectedTaux.annee_fin}
													</button>
												  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
												    {
															contractDisplay.historique_taux.map((element, index) => {
																return <button key={index} onClick={this._changeSelectedTaux.bind(this,element)} className={"dropdown-item " + (element.annee_dep === selectedTaux.annee_dep ? "active" : "")}>{element.annee_dep} - {element.annee_fin}</button>
															})
														}
												  </div>
												</div>
											</div>
											<div className="col-md-10 col-xs-12">
												<div className="row">
													<div className="col-sm-6">
														{this.renderStaticAttribute("Année de début",selectedTaux.annee_dep,6)}
														{this.renderStaticAttribute("Nombre d'employés",selectedTaux.nombre_employés,6)}
														{this.renderStaticAttribute("Différence",selectedTaux.différence,6)}
														{this.renderStaticAttribute("Assurance vie",selectedTaux.vie,6)}
														{this.renderStaticAttribute("DMA",selectedTaux.dma,6)}
														{this.renderStaticAttribute("PAC",selectedTaux.pac,6)}
														{this.renderStaticAttribute("CT vie",selectedTaux.ct,6)}
														{this.renderStaticAttribute("LT",selectedTaux.lt,6)}
														{this.renderStaticAttribute("AMC individuel",selectedTaux.amc_ind,6)}
														{this.renderStaticAttribute("AMC mono",selectedTaux.amc_mono,6)}
														{this.renderStaticAttribute("AMC couple",selectedTaux.amc_couple,6)}
														{this.renderStaticAttribute("AMC famille",selectedTaux.amc_fam,6)}
													</div>
													<div className="col-sm-6">
														{this.renderStaticAttribute("Année de fin",selectedTaux.annee_fin,6)}
														{this.renderStaticAttribute("Dentaire individuel",selectedTaux.dentaire_ind,6)}
														{this.renderStaticAttribute("Dentaire mono",selectedTaux.dentaire_mono,6)}
														{this.renderStaticAttribute("Dentaire couple",selectedTaux.dentaire_couple,6)}
														{this.renderStaticAttribute("Dentaire famille",selectedTaux.dentaire_fam,6)}
														{this.renderStaticAttribute("MG individuel",selectedTaux.mg_ind,6)}
														{this.renderStaticAttribute("MG mono",selectedTaux.mg_mono,6)}
														{this.renderStaticAttribute("MG couple",selectedTaux.mg_couple,6)}
														{this.renderStaticAttribute("MG famille",selectedTaux.mg_fam,6)}
														{this.renderStaticAttribute("PAE",selectedTaux.pae,6)}
														{this.renderStaticAttribute("Prime mensuelle",selectedTaux.prime_mensuelle,6)}
														{this.renderStaticAttribute("Prime annuelle",selectedTaux.prime_annuelle,6)}
													</div>
												</div>
											</div>
										</div>
						      </div>
						    </div>
						  </div>
						  <div className="card">
						    <div className="card-header" id="headingFive">
						      <h5 className="mb-0">
						        <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
						          R&eacute;mun&eacute;rations
						        </button>
						      </h5>
						    </div>
						    <div id="collapseFive" className="collapse" aria-labelledby="headingFive" data-parent="#accordion">
						      <div className="card-body">
										<div className="row">
											<div className="col-md-2 col-xs-12">
												<div className="dropdown">
													<button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
														{selectedRemuneration.annee_dep} - {selectedRemuneration.annee_fin}
													</button>
												  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
												    {
															contractDisplay.remuneration.history.map((element, index) => {
																return <button key={index} onClick={this._changeSelectedRemuneration.bind(this,element)} className={"dropdown-item " + (element.annee_dep === selectedRemuneration.annee_dep ? "active" : "")}>{element.annee_dep} - {element.annee_fin}</button>
															})
														}
												  </div>
												</div>
											</div>
											<div className="col-md-10 col-xs-12">
												<div className="row">
													<div className="col-sm-6">
														{this.renderStaticAttribute("Année de début",selectedRemuneration.annee_dep,6)}
														{this.renderStaticAttribute("Vie DMA PAC",selectedRemuneration.vie_dma_pac,6)}
														{this.renderStaticAttribute("CT",selectedRemuneration.ct,6)}
														{this.renderStaticAttribute("LT",selectedRemuneration.lt,6)}
														{this.renderStaticAttribute("AMC",selectedRemuneration.amc,6)}
														{this.renderStaticAttribute("Dentaire",selectedRemuneration.dentaire,6)}
														{this.renderStaticAttribute("MG",selectedRemuneration.mg,6)}
														{this.renderStaticAttribute("PAE",selectedRemuneration.pae,6)}
														{this.renderStaticAttribute("Date payé base",selectedRemuneration.date_payée_base,6)}
														{this.renderStaticAttribute("Montant payé base",selectedRemuneration.montant_payé_base,6)}
														{this.renderStaticAttribute("Montant payé boni",selectedRemuneration.montant_payé_boni,6)}
													</div>
													<div className="col-sm-6">
														{this.renderStaticAttribute("Année de fin",selectedRemuneration.annee_fin,6)}
														{this.renderStaticAttribute("Pourcentage payable en pourcent",selectedRemuneration.pourcentage_payable_en_pourcent,6)}
														{this.renderStaticAttribute("Montant dû",selectedRemuneration.montant_dû,6)}
														{this.renderStaticAttribute("Montant payé",selectedRemuneration.montant_payé,6)}
														{this.renderStaticAttribute("Rémunération totale",selectedRemuneration.rémunération_totale,6)}
														{this.renderStaticAttribute("Date payée",selectedRemuneration.date_payée,6)}
														{this.renderStaticAttribute("Notes",selectedRemuneration.notes,6)}
														{this.renderStaticAttribute("Solde",selectedRemuneration.solde,6)}
														{this.renderStaticAttribute("Conseiller n°",selectedRemuneration.idconseiller,6)}
														{this.renderStaticAttribute("Nom conseiller",selectedRemuneration.nomconseiller,6)}
														{this.renderStaticAttribute("Prénom conseiller",selectedRemuneration.prenomconseiller,6)}
													</div>
												</div>
											</div>
										</div>
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
		crmLogin: state.crmLogin,
		crmDashboard: state.crmDashboard,
		crmGridSuppliersLayout: state.crmGridSuppliersLayout,
		crmContacts: state.crmContacts,
		crmContract: state.crmContract,
		crmNavBar: state.crmNavBar,
		crmRechercheCollective: state.crmRechercheCollective
	}
}

//fonctions
const mapDispatchToProps = (dispatch) => {
	return {
		getClientRequest: (id) => {
			dispatch(getClientRequest(id));
		},
		getSupplier: (id) => {
			dispatch(getSupplier(id));
		},
		setFromClient(client) {
			dispatch(setFromClient(client));
		},
		getContract: (idContract) => {
			dispatch(getContract(idContract));
		},
		setSelectedTaux: (taux) => {
			dispatch(setSelectedTaux(taux));
		},
		setSelectedRemuneration: (remuneration) => {
			dispatch(setSelectedRemuneration(remuneration));
		}
	}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContractFile));
