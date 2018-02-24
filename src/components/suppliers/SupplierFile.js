import React from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router'
import TitreValeur from "../TitreValeur";
import LoadingAnimation from "../LoadingAnimation";
import {getSupplier} from "../../actions/crmGridLayoutSuppliers";
import {changeLoading} from "../../actions/crmDashboard";

class SupplierFile extends React.Component {
	constructor(props) {
		super(props);
		this.props.getSupplier(this.props.idSupplier);
		this.showContact = this.showContact.bind(this);
		this.setContactsState = this.setContactsState.bind(this);
		this.getPosition = this.getPosition.bind(this);
		this._handleModify = this._handleModify.bind(this);
		this.dropDownClient = this.dropDownClient.bind(this);
	}

	componentWillMount() {
		this.setContactsState();
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

	_handleModify(match, history, event) {
		history.push(match.url + "/update");
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
		let {layouts} = this.props.crmGridSuppliersLayout;
		let {contacts} = this.props.crmContacts;
		let {loading} = this.props.crmDashboard;
		let supplier = this.props.crmGridSuppliersLayout.requiredFields;
		let optionnalFields = this.props.crmGridSuppliersLayout.grid;
		const { match, history } = this.props;
		return (
			<div className="container">
				<h1 className="text-center">Assurances collectives</h1>
				<div className="card mb-3">
					<div className="card-header">
		      	<i className="fa fa-file-o"></i> Fournisseur
					</div>
					<div className="card-body">
						<div className="text-right">
							<button type="button" className="btn btn-primary" onClick={this._handleModify.bind(this, match, history)} value={supplier.id}><i className="fa fa-cog"></i> Modifier</button>
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
												{this.renderStaticAttribute("Nom du groupe",supplier.nomEntreprise,6)}
												{this.renderStaticAttribute("Code",supplier.code,6)}
												{this.renderStaticAttribute("Téléphone principal",supplier.telephone,6)}
												{this.renderStaticAttribute("Extension",supplier.extension,6)}
												{
													supplier.lilGroup && this.renderStaticAttribute("Petits groupes","Oui",6)
												}
												{
													!supplier.lilGroup && this.renderStaticAttribute("Petits groupes","Non",6)
												}
												{this.renderStaticAttribute("Nombre d'employés petits groupes",supplier.employesLilGroup,6)}
											</div>
											<div className="col-sm-6">
												{this.renderStaticAttribute("Rue",supplier.rue,6)}
												{this.renderStaticAttribute("Ville",supplier.ville,6)}
												{this.renderStaticAttribute("Province",supplier.province,6)}
												{this.renderStaticAttribute("Code postal",supplier.codePostal,6)}
												{
													supplier.bigGroup && this.renderStaticAttribute("Grands groupes","Oui",6)
												}
												{
													!supplier.bigGroup && this.renderStaticAttribute("Grands groupes","Non",6)
												}
												{this.renderStaticAttribute("Nombre d'employés petits groupes",supplier.employesBigGroup,6)}
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
												optionnalFields.map(element => {
													return (
														<div className="col-sm-6">
															{this.renderStaticAttribute(element.label,element.value,6,element.idattrfournisseur)}
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
																	contact.estdecideur && this.renderStaticAttribute("Décideur","Oui",6)
																} 
																{ 
																	!contact.estdecideur && this.renderStaticAttribute("Décideur","Non",6)
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
		crmLogin: state.crmLogin,
		crmDashboard: state.crmDashboard,
		crmGridSuppliersLayout: state.crmGridSuppliersLayout,
		crmContacts: state.crmContacts,

	}
}

//fonctions
const mapDispatchToProps = (dispatch) => {
	return {
		changeLoading: (boolean) => {
			dispatch(changeLoading(boolean));
		},
		getSupplier: (id) => {
			dispatch(getSupplier(id));
		},
	}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SupplierFile));
