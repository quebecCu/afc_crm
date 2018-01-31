import React from 'react';
import {connect} from "react-redux";
import {Responsive, WidthProvider} from 'react-grid-layout';
import TitreValeur from "../components/TitreValeur";
import {getClientRequest} from "../actions/crmClientList";
import {getSupplier} from "../actions/crmGridLayoutSuppliers";
import {store} from '../store';
import {setFromClient,setSelectedTaux} from "../actions/crmContract";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class ContractFile extends React.Component {
	constructor(props) {
		super(props);
		this.showContact = this.showContact.bind(this);
		this.setContactsState = this.setContactsState.bind(this);
		this.getPosition = this.getPosition.bind(this);
		this._handleModify = this._handleModify.bind(this);
		this.dropDownClient = this.dropDownClient.bind(this);
		this.dropDownTaux = this.dropDownTaux.bind(this);
		this.dropDownSouscriptions = this.dropDownSouscriptions.bind(this);
		this._handleClient = this._handleClient.bind(this);
		this._handleAssureur = this._handleAssureur.bind(this);
		this.state = {
      selectedTauxAnnee: this.props.crmContract.contractDisplay.historique_taux[0],
    };
	}

	componentDidMount() {
		console.log(JSON.stringify(this.props.crmContract.contractDisplay.historique_taux[0]))
		this.state.selectedTauxAnnee = this.props.crmContract.contractDisplay.historique_taux[0];
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

	_changeTauxAnnee(taux) {
		store.dispatch(setSelectedTaux(taux));
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

	renderLinkAttribute(attributeName, attributeValue) {
    return (
			<div className="form-group row">
				<label htmlFor="staticEmail" className="col-sm-2 col-form-label">{attributeName}: </label>
				<div className="col-sm-10">
					<button type="button" className="btn btn-link">{attributeValue}</button>
				</div>
			</div>
    );
  }

	renderStaticAttribute(attributeName, attributeValue, width) {
		const inputStyle = {
			padding: '6px 12px',
		}
    return (
			<div className="form-group row">
				<label htmlFor="staticEmail" className={"col-form-label  " + (width === 6 ? "col-sm-6" : "col-sm-2")}>{attributeName}: </label>
				<div className={(width === 6 ? "col-sm-6" : "col-sm-10")}>
					<input style={inputStyle} type="text" readOnly className="form-control-plaintext" id="aga" value={attributeValue}/>
				</div>
			</div>
    );
  }

	render() {
		let {contractDisplay, lilLayout, selectedTaux} = this.props.crmContract;
		let layouts = {lg: lilLayout, md: lilLayout, sm: lilLayout, xs: lilLayout, xxs: lilLayout};

		return (
			<div>
				<h1 className="text-center">Assurances collectives</h1>
				<div className="card mb-3">
					<div className="card-header">
		      	<i className="fa fa-file-o"></i> Contrat
					</div>
					<div className="card-body">
						<div id="accordion">
						  <div className="card">
						    <div className="card-header" id="headingOne">
						      <h5 className="mb-0">
						        <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
						          G&eacute;n&eacute;ral
						        </button>
						      </h5>
						    </div>

						    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
						      <div className="card-body">
										{this.renderStaticAttribute("N° Police",contractDisplay.police)}
										{this.renderLinkAttribute("Client",contractDisplay.nomclient)}
										{this.renderLinkAttribute("Assureur",contractDisplay.nomfournisseur)}
										{this.renderLinkAttribute("Représentant",contractDisplay.nomrepresentant)}
										{this.renderStaticAttribute("AGA",contractDisplay.libellechambrecommerce)}
										{this.renderStaticAttribute("Date de signature",contractDisplay.date_signature)}
										{this.renderStaticAttribute("Mois de renouvellement",contractDisplay.mois_renouvellement)}
										{this.renderStaticAttribute("Notes",contractDisplay.notes)}
										{
												contractDisplay.facultatif.map(element => {
												return this.renderStaticAttribute(element.nom,element.valeur);
											})
										}
						      </div>
						    </div>
						  </div>
						  <div className="card">
						    <div className="card-header" id="headingTwo">
						      <h5 className="mb-0">
						        <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
						          Historique des taux
						        </button>
						      </h5>
						    </div>
						    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
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
																return <button key={element.annee_dep} className={"dropdown-item " + (element.annee_dep === selectedTaux.annee_dep ? "active" : "")}>{element.annee_dep} - {element.annee_fin}</button>
															})
														}
												  </div>
												</div>
											</div>
											<div className="col-md-10 col-xs-12">
												{
													contractDisplay.historique_taux.map((element, index) => {
														if (element.annee_dep === this.selectedTauxAnneDep){
															return <div key={element.annee_dep} className="row">
																<div className="col-sm-6">
																	{this.renderStaticAttribute("Année de début",element.annee_dep,6)}
																	{this.renderStaticAttribute("Année de fin",element.annee_fin,6)}
																	{this.renderStaticAttribute("Nombre d'employés",element.nombre_employés,6)}
																	{this.renderStaticAttribute("Différence",element.différence,6)}
																	{this.renderStaticAttribute("Assurance vie",element.vie,6)}
																	{this.renderStaticAttribute("DMA",element.dma,6)}
																	{this.renderStaticAttribute("PAC",element.pac,6)}
																	{this.renderStaticAttribute("CT vie",element.ct,6)}
																	{this.renderStaticAttribute("LT",element.lt,6)}
																	{this.renderStaticAttribute("AMC individuel",element.amc_ind,6)}
																	{this.renderStaticAttribute("AMC mono",element.amc_mono,6)}
																</div>
																<div className="col-sm-6">
																	{this.renderStaticAttribute("AMC couple",element.amc_couple,6)}
																	{this.renderStaticAttribute("AMC famille",element.amc_fam,6)}
																	{this.renderStaticAttribute("Dentaire individuel",element.dentaire_ind,6)}
																	{this.renderStaticAttribute("Dentaire mono",element.dentaire_mono,6)}
																	{this.renderStaticAttribute("Dentaire couple",element.dentaire_couple,6)}
																	{this.renderStaticAttribute("Dentaire famille",element.dentaire_fam,6)}
																	{this.renderStaticAttribute("MG individuel",element.mg_ind,6)}
																	{this.renderStaticAttribute("MG mono",element.mg_mono,6)}
																	{this.renderStaticAttribute("MG couple",element.mg_couple,6)}
																	{this.renderStaticAttribute("MG famille",element.mg_fam,6)}
																	{this.renderStaticAttribute("PAE",element.pae,6)}
																	{this.renderStaticAttribute("Prime mensuelle",element.prime_mensuelle,6)}
																	{this.renderStaticAttribute("Prime annuelle",element.prime_annuelle,6)}
																</div>
															</div>
														}
													})
												}
											</div>
										</div>
						      </div>
						    </div>
						  </div>
						  <div className="card">
						    <div className="card-header" id="headingThree">
						      <h5 className="mb-0">
						        <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
						          Collapsible Group Item #3
						        </button>
						      </h5>
						    </div>
						    <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
						      <div className="card-body">
						        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
						      </div>
						    </div>
						  </div>
						</div>

						<div>

							<div className="grandTitre">
								<button className="grandTitreContacts" onClick={this.dropDownContacts}>
									<TitreValeur valeur="Historique des taux"/></button>
								<div id="wrapperContacts" className=" wrapper show  ">

								</div>
							</div>

							<div className="grandTitre">
								<button className="grandTitreContacts" onClick={this.dropDownTaux}>
									<TitreValeur valeur="Rémunérations"/></button>
								<div id="wrapperTaux" className=" wrapper show  " style={{backgroundColor: 'white'}}>
									{
										contractDisplay.historique_taux.map((element, index) => {
											return <div className="w3-animate-zoom" key={index}>
												<div className="unePartie">
													<TitreValeur titre="Année de début" valeur={element.annee_dep}/>
													<TitreValeur titre="Année de fin" valeur={element.annee_fin}/>
													<TitreValeur titre="Vie DMA PAC" valeur={element.vie_dma_pac}/>
												</div>
												<div className="unePartie">
													<TitreValeur titre="CT" valeur={element.ct}/>
													<TitreValeur titre="LT" valeur={element.lt}/>
													<TitreValeur titre="AMC" valeur={element.amc}/>
												</div>
												<div className="unePartie">
													<TitreValeur titre="Dentaire" valeur={element.dentaire}/>
													<TitreValeur titre="MG" valeur={element.mg}/>
													<TitreValeur titre="PAE" valeur={element.pae}/>
												</div>
												<div className="unePartie">
													<TitreValeur titre="Date payé base" valeur={element.date_payée_base}/>
													<TitreValeur titre="Montant payé base" valeur={element.montant_payé_base}/>
													<TitreValeur titre="Montant payé boni" valeur={element.montant_payé_boni}/>
													<TitreValeur titre="Pourcentage payable en pourcent"
																 valeur={element.pourcentage_payable_en_pourcent}/>
												</div>
												<div className="unePartie">
													<TitreValeur titre="Montant dû" valeur={element.montant_dû}/>
													<TitreValeur titre="Montant payé" valeur={element.montant_payé}/>
													<TitreValeur titre="Rémunération totale"
																 valeur={element.rémunération_totale}/>
													<TitreValeur titre="Date payée" valeur={element.date_payée}/>
												</div>
												<div className="unePartie">
													<TitreValeur titre="Notes" valeur={element.notes}/>
													<TitreValeur titre="Solde" valeur={element.solde}/>
													<TitreValeur titre="Conseiller n°" valeur={element.idconseiller}/>
													<TitreValeur titre="Nom conseiller" valeur={element.nomconseiller}/>
													<TitreValeur titre="Prénom conseiller" valeur={element.prenomconseiller}/>
												</div>
												<hr/>
											</div>
										})
									}
								</div>
							</div>

							<div className="grandTitre">
								<button className="grandTitreContacts" onClick={this.dropDownSouscriptions}>
									<TitreValeur valeur="Souscriptions"/></button>
								<div id="wrapperSouscriptions" className=" wrapper show  " style={{backgroundColor: 'white'}}>
									{
										contractDisplay.souscriptions.map((element, index) => {
											return <div className="w3-animate-zoom" key={index}>
												<div className="unePartie">
													<TitreValeur titre="Module" valeur={element.libelle}/>
													<TitreValeur titre="Notes du module" valeur={element.module_notes}/>
												</div>
												{
													element.subscriptions.map((element2, index2) => {
														return <div className="unePartie" key={index2}>
															<TitreValeur titre="Souscription" valeur={element2.libelle}/>
															<TitreValeur titre="Notes de la souscription"
																		 valeur={element2.souscription_notes}/>
															<TitreValeur titre="description" valeur={element2.description}/>
															<TitreValeur titre="Ext" valeur={element2.ext}/>
															<TitreValeur titre="Valeur" valeur={element2.valeur}/>
														</div>

													})
												}
												<hr/>
											</div>
										})
									}
								</div>
							</div>

							<div className="form-group">
								<button type="button" className="btn btn-primary"
										onClick={this._handleModify} value={contractDisplay.idcontrat}>
									Modifier le contrat
								</button>
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
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(ContractFile);
