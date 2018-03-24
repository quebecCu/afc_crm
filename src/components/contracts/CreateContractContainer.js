import React from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router';
import ContractClientPart from './ContractClientPart.js';
import ContractInfoPart from './ContractInfoPart';
import ContractModulesPart from './ContractModulesPart';
import ContractTauxContainer from './ContractTauxContainer';
import ContractRemunerationContainer from './ContractRemunerationContainer';
import {
	changeBigLayout, changeFormContract, changeLilLayout, changeNewFieldContract, changeUpdateFieldContract, getAGA,
	getGrid, createContract,ajouterChambreCommerce,
	sendDeleteFieldContract, sendNewFieldContract, sendUpdateFieldContract, setGrid, updatePosLayout
} from "../../actions/crmContract";
import GridOptionnalContract from "./GridOptionnalContract";
import {bindClientData, getClientRequest} from "../../actions/crmClientList";
import {sendingRequestColl} from "../../actions/crmRechercheCollective";
import LoadingAnimation from "../LoadingAnimation";
import ModalForModalites from "../modal/ModalForModalites";
import {changeLoadingValidation} from "../../actions/crmDashboard";
import {getContract} from "../../actions/crmContract";

class CreateContractContainer extends React.Component {
	constructor(props) {
		super(props);
		this._resetStyle = this._resetStyle.bind(this);
		this._onClickValidate = this._onClickValidate.bind(this);
		this._validateForm = this._validateForm.bind(this);
		this._handleSubmitChamp = this._handleSubmitChamp.bind(this);
		this._changeNameModifyField = this._changeNameModifyField.bind(this);
		this._changeDescModifyField = this._changeDescModifyField.bind(this);
		this._changeIdModifyField = this._changeIdModifyField.bind(this);
		this._handleModifyField = this._handleModifyField.bind(this);
		this._deleteField = this._deleteField.bind(this);
		this.props.requests();
		this.props.bindClientData({
			facultatif: []
		});
		let {formState, contractDisplay, fromClient} = this.props.crmContract;
		//si on display un blank contrat on fait un state vide de toute envie de vivre.
		//si on display un update contrat, le state est "prérempli" de toutes les infos
		if (!this.props.idContract) {
			this.props.getGrid();
			if (this.props.match.params.idClient){
				alert("yah")
			}
			this.props.changeForm({
				...formState, intModulesToDisplay: 1, modulesToDisplay: [], contrat: {
					...formState.contrat,
					idAssureur: '',
					idAGA: '',
					modulesChoisis: [],
					numPolice: '',
					dateEmission: '',
					moisRenouv: '',
					notes: '',
					historiqueTaux: {
						diff: '',
						annee_dep: '',
						annee_fin: '',
						vie: '',
						dma: '',
						pac: '',
						ct: '',
						lt: '',
						amc_ind: '',
						amc_mono: '',
						amc_couple: '',
						amc_fam: '',
						dent_ind: '',
						dent_mono: '',
						dent_couple: '',
						dent_fam: '',
						mg_ind: '',
						mg_mono: '',
						mg_couple: '',
						mg_fam: '',
						pae: '',
						prime_ms: '',
						prime_an: ''
					},
					remuneration: {
						vie: '',
						ct: '',
						lt: '',
						amc: '',
						dent: '',
						mg: '',
						pae: '',
						notes: '',
						recu: '',
						base: '',
						boni: '',
						total: '',
						gtotal: '',
						idConseiller: '',
						split: '',
						bdu: '',
						paye: '',
						dpaye: '',
						solde: ''

					}
				}
			})
		} else {
			this.props.getContractToUpdate(this.props.idContract);
			let contract = contractDisplay;
			let facDisplay = contract.facultatif;

			let modulesChoisis = contract.souscriptions;
			let modulesToUpdate = [];
			let intModulesToDisplay = modulesChoisis.length;
			let modulesToDisplay = [];
			modulesChoisis.forEach((element, index) => {
				modulesToDisplay.push(element.id.toString());
				let modalitesToUpdate = [];
				element.subscriptions.forEach(subs => {
					/*let subsToPush={
						idModalite:subs.id,
						souscription_notes:subs.souscription_notes,
						valeur:subs.valeur,
						idValeur: ''//aller chercher dans le backend :(
					};*/
					modalitesToUpdate.push({
						idModalite: subs.id,
						souscription_notes: subs.souscription_notes,
						valeur: subs.valeur,
						idValeur: subs.idvaleur
					});
				});
				//let toPush={idModule:element.id, module_notes:element.module_notes, modalites:modalitesToUpdate};
				modulesToUpdate.push({
					idModule: element.id,
					module_notes: element.module_notes,
					modalites: modalitesToUpdate
				});
			});


			let toUpdate = {
				idAssureur: contract.idfournisseur,
				idAGA: contract.idchambrecommerce,//LOOOOP,
				idContract: contract.idcontrat,
				idClient: fromClient.idClient,
				modulesChoisis: modulesToUpdate,
				modulesInitiaux: modulesToUpdate,
				numPolice: contract.police,
				dateEmission: contract.date_signature,
				moisRenouv: contract.mois_renouvellement,
				notes: contract.notes,
				historiqueTaux: { //Aller chercher la bonne année?
					diff: '',
					annee_dep: '',
					annee_fin: '',
					vie: '',
					dma: '',
					pac: '',
					ct: '',
					lt: '',
					amc_ind: '',
					amc_mono: '',
					amc_couple: '',
					amc_fam: '',
					dent_ind: '',
					dent_mono: '',
					dent_couple: '',
					dent_fam: '',
					mg_ind: '',
					mg_mono: '',
					mg_couple: '',
					mg_fam: '',
					pae: '',
					prime_ms: '',
					prime_an: ''
				},
				remuneration: { //idem avec année depart et annee fin ?
					vie: '',
					ct: '',
					lt: '',
					amc: '',
					dent: '',
					mg: '',
					pae: '',
					notes: '',
					recu: '',
					base: '',
					boni: '',
					total: '',
					gtotal: '',
					idConseiller: '',
					split: '',
					bdu: '',
					paye: '',
					dpaye: '',
					solde: ''
				}
			};

			let dateDep = parseInt(contract.date_signature[0] + contract.date_signature[1] + contract.date_signature[2] + contract.date_signature[3], 10);
			contract.remuneration.history.forEach(element => {
				if (parseInt(element.annee_dep, 10) === dateDep) {
					toUpdate.remuneration.vie = element.vie;
					toUpdate.remuneration.ct = element.ct;
					toUpdate.remuneration.lt = element.lt;
					toUpdate.remuneration.dent = element.dentaire;
					toUpdate.remuneration.mg = element.mg;
					toUpdate.remuneration.pae = element.pae;
					toUpdate.remuneration.notes = element.notes;
					toUpdate.remuneration.recu = element.date_payée_base;
					toUpdate.remuneration.base = element.montant_payé_base;
					toUpdate.remuneration.boni = element.montant_payé_boni;
					toUpdate.remuneration.split = element.pourcentage_payable_en_pourcent;
					toUpdate.remuneration.total = element.rémunération_totale;
					toUpdate.remuneration.idConseiller = element.idconseiller;
					toUpdate.remuneration.bdu = element.montant_dû;
					toUpdate.remuneration.paye = element.montant_payé;
					toUpdate.remuneration.dpaye = element.date_payée;

				}
			});

			contract.historique_taux.forEach(element => {
				if (parseInt(element.annee_dep, 10) === dateDep) {
					toUpdate.historiqueTaux.diff = element.différence;
					toUpdate.historiqueTaux.anneedep = element.annee_dep;
					toUpdate.historiqueTaux.anneefin = element.annee_fin;
					toUpdate.historiqueTaux.vie = element.vie;
					toUpdate.historiqueTaux.dma = element.dma;
					toUpdate.historiqueTaux.pac = element.pac;
					toUpdate.historiqueTaux.ct = element.ct;
					toUpdate.historiqueTaux.lt = element.lt;
					toUpdate.historiqueTaux.amc_ind = element.amc_ind;
					toUpdate.historiqueTaux.amc_mono = element.amc_mono;
					toUpdate.historiqueTaux.amc_couple = element.amc_couple;
					toUpdate.historiqueTaux.amc_fam = element.amc_fam;
					toUpdate.historiqueTaux.dent_ind = element.dentaire_ind;
					toUpdate.historiqueTaux.dent_mono = element.dentaire_mono;
					toUpdate.historiqueTaux.dent_couple = element.dentaire_couple;
					toUpdate.historiqueTaux.dent_fam = element.dentaire_fam;
					toUpdate.historiqueTaux.mg_ind = element.mg_ind;
					toUpdate.historiqueTaux.mg_mono = element.mg_mono;
					toUpdate.historiqueTaux.mg_couple = element.mg_couple;
					toUpdate.historiqueTaux.mg_fam = element.mg_fam;
					toUpdate.historiqueTaux.pae = element.pae;
					toUpdate.historiqueTaux.prime_ms = element.prime_mensuelle;
					toUpdate.historiqueTaux.prime_an = element.prime_annuelle;
				}
			});

			console.log(toUpdate);
			this.props.changeForm({
				...formState,
				intModulesToDisplay: intModulesToDisplay,
				modulesToDisplay: modulesToDisplay,
				contrat: toUpdate
			});


		}


	}

	componentDidUpdate() {
		if (!this.props.loading) {
			this._resetStyle();
		}
	}

	_changeNameModifyField(event) {
		this.props.changeUpdateFieldContract({...this.props.crmContract.updateField, name: event.target.value});
	}

	_changeDescModifyField(event) {
		this.props.changeUpdateFieldContract({...this.props.crmContract.updateField, description: event.target.value});
	}

	_changeIdModifyField(event) {
		this.props.changeUpdateFieldContract({...this.props.crmContract.updateField, id: event.target.value});
	}

	_resetStyle() {
		document.getElementById("assureurHelp").style.display = "none";
		document.getElementById("AGAHelp").style.display = "none";
		document.getElementById("numPoliceHelp").style.display = "none";
		document.getElementById("dateEmissionHelp").style.display = "none";
		document.getElementById("moisRenouvHelp").style.display = "none";

	}

	componentDidMount() {
		document.getElementById("assureurHelp").style.display = "none";
		document.getElementById("AGAHelp").style.display = "none";
		document.getElementById("numPoliceHelp").style.display = "none";
		document.getElementById("dateEmissionHelp").style.display = "none";
		document.getElementById("moisRenouvHelp").style.display = "none";
	}

	//On crée un nouveau champ !
	_handleSubmitChamp(event) {
		event.preventDefault();
		let {formState, newField} = this.props.crmContract;
		let x = (formState.facultatif.length % 4) * 3;
		let y = Math.floor(formState.facultatif.length / 4);

		document.getElementById('champNom').value = '';
		document.getElementById('champDescription').value = '';
		document.getElementById('champType').value = '';
		this.props.sendNewFieldContract({form: newField, posx: x, posy: y});
	}

	_handleModifyField(event) {
		event.preventDefault();
		let {updateField} = this.props.crmContract;
		this.props.sendUpdateFieldContract(updateField);
	}

	_deleteField(event) {
		this.props.sendDeleteFieldContract(event.target.value);
	}

	_onClickValidate(event) {
		let {formState} = this.props.crmContract;
		//let isValid = this._validateForm();
		//si on est sur un update, on vérifie les tableaux initiaux/modifié pour envoyer au backend du toupdate, todelete ou tocreate
		if (this.props.idContract) {
			let modulesInitiaux = JSON.parse(JSON.stringify(formState.contrat.modulesInitiaux));
			let modulesModifies = JSON.parse(JSON.stringify(formState.contrat.modulesChoisis));
			let modulesToUpdate = [];
			let modulesToDelete = [];
			let modulesToCreate = [];
			//D'abord on check les modules a update pis ceux à delete (si ds initialModules qqchose n'est pas contenu dans les modules
			//a update, on le supprime
			modulesInitiaux.forEach((element) => {
				let contains = false;
				let newElement = element;

				modulesModifies.forEach(el => {
					if (parseInt(el.idModule, 10) === parseInt(element.idModule, 10)) {
						contains = true;
						let modalitesInitiales = element.modalites;
						let modalitesModifiees = el.modalites;

						//on crée l'objet monstrueux <3 (dans chaque module a update on regarde les modalités à suppr/créer/update
						let modalitesToCreate = [];
						let modalitesToUpdate = [];
						let modalitesToDelete = [];
						modalitesInitiales.forEach(modInit => {
							let cont = false;
							modalitesModifiees.forEach(modMod => {
								if (parseInt(modInit.idModalite, 10) === parseInt(modMod.idModalite, 10)) {
									cont = true;
									modalitesToUpdate.push(modMod);
								}

							});
							if (!cont) {
								modalitesToDelete.push(modInit.idModalite);
							}
						});
						//idem now pour les modalites a créer on parcourt dans l'autre senssss :)
						modalitesModifiees.forEach(modMod => {
							let cont = false;
							modalitesInitiales.forEach(modInit => {
								if (parseInt(modMod.idModalite, 10) === parseInt(modInit.idModalite, 10)) {
									cont = true;
								}
							});
							if (!cont) {
								modalitesToCreate.push(modMod);
							}
						});
						delete newElement["modalites"];
						newElement["modalitesToCreate"] = modalitesToCreate;
						newElement["modalitesToUpdate"] = modalitesToUpdate;
						newElement["modalitesToDelete"] = modalitesToDelete;

					}
				});
				if (contains) {
					//on donne a l'élément modalitesToUpdate,toCreate et toDelete

					modulesToUpdate.push(newElement);
				}
				else {
					modulesToDelete.push(element.idModule);
				}
			});
			//Now on loop dans l'autre sens pour savoir les modules à créer
			modulesModifies.forEach(element => {
				let contains = false;
				modulesInitiaux.forEach(el => {
					if (parseInt(el.idModule, 10) === parseInt(element.idModule, 10)) {
						contains = true;
					}
				});
				if (!contains) {
					modulesToCreate.push(element);
				}
			});

		}

		this._validateForm();
		//Si on est en create, on crée le bordel sinan na
		if(!this.props.idContract){
			this.props.createContract(formState);
		}
	}

	_validateForm() {
		this._resetStyle();
		let {formState} = this.props.crmContract;
		//let isValid = true;
		if (!formState.contrat.idAssureur) {
			document.getElementById("assureurLabel").className += " text-danger";
			document.getElementById("assureur").className += " is-invalid";
			document.getElementById("assureurHelp").style.display = "block";
			//isValid = false;
		}
		if (!formState.contrat.idAGA) {
			document.getElementById("AGALabel").className += " text-danger";
			document.getElementById("AGA").className += " is-invalid";
			document.getElementById("AGAHelp").style.display = "block";
			//isValid = false;
		}
		if (!formState.contrat.numPolice) {
			document.getElementById("numPoliceLabel").className += " text-danger";
			document.getElementById("numPolice").className += " is-invalid";
			document.getElementById("numPoliceHelp").style.display = "block";
			//isValid = false;
		}
		if (!formState.contrat.dateEmission) {//check les regex
			document.getElementById("dateEmissionLabel").className += " text-danger";
			document.getElementById("dateEmission").className += " is-invalid";
			document.getElementById("dateEmissionHelp").style.display = "block";
			//isValid = false;
		}
		if (!formState.contrat.moisRenouv) {//check les regex
			document.getElementById("moisRenouvLabel").className += " text-danger";
			document.getElementById("moisRenouv").className += " is-invalid";
			document.getElementById("moisRenouvHelp").style.display = "block";
			//isValid = false;
		}

		//return isValid;


	}

	render() {
		let {contractDisplay, formState, newField, types, updateField, fromClient} = this.props.crmContract;
		let {dossiersState} = this.props.crmRechercheCollective;
		let {client} = this.props.crmClientList;
		let {isAdmin} = this.props.crmLogin;
		return (
		<div>
			{
				this.props.loading && <LoadingAnimation/>
			}
			{
				!this.props.loading &&
				<div>
					<h1 className="text-center">Assurances collectives</h1>
					<div className="card mb-3">
						<div className="card-header">
							<i className="fa fa-file-o"></i>
								{
									!this.props.idContract
									&& <span> Cr&eacute;ation d'un contrat</span>
								}
								{
									this.props.idContract
									&& <span> Modification d'un contrat</span>
								}
						</div>
						<div className="card-body">
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
												<div className="col-xs-12 col-sm-6">
													<ContractClientPart changeForm={this.props.changeForm}
																				 clients={dossiersState} getClient={this.props.getClientRequest}
																				 formState={formState}
																				 client={client} fromClient={fromClient}
																				 />
												</div>
												<div className="col-xs-12 col-sm-6">
													<ContractInfoPart formState={formState}
																				   changeForm={this.props.changeForm}/>
												</div>
											</div>
							      </div>
							    </div>
							  </div>
								<div className="card">
							    <div className="card-header" id="headingTwo">
							      <h5 className="mb-0">
							        <button className="btn btn-link" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
							          Information Compl&eacute;mentaires
							        </button>
							      </h5>
							    </div>

							    <div id="collapseTwo" className="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">
							      <div className="card-body">
											<GridOptionnalContract
																   formState={formState}
																   isAdmin={isAdmin}
																   newField={newField}
																   types={types}
																   changeNewField={this.props.changeNewFieldContract}
																   setGrid={this.props.setGrid}
																   changeLilLayout={this.props.changeLilLayout}
																   updatePosLayout={this.props.updatePosLayout}
																   handleSubmitChamp={this._handleSubmitChamp}
											/>
							      </div>
							    </div>
							  </div>
								<div className="card">
							    <div className="card-header" id="headingThree">
							      <h5 className="mb-0">
							        <button className="btn btn-link" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
							          Modules
							        </button>
							      </h5>
							    </div>
							    <div id="collapseThree" className="collapse show" aria-labelledby="headingThree" data-parent="#accordion">
							      <div className="card-body">
											<ContractModulesPart formState={formState}
												changeForm={this.props.changeForm}
												view={this.props.view}
											/>
							      </div>
							    </div>
							  </div>
								<div className="card">
							    <div className="card-header" id="headingFour">
							      <h5 className="mb-0">
							        <button className="btn btn-link" data-toggle="collapse" data-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
							          Historique des taux
							        </button>
							      </h5>
							    </div>
							    <div id="collapseFour" className="collapse show" aria-labelledby="headingFour" data-parent="#accordion">
							      <div className="card-body">
											<ContractTauxContainer formState={formState} changeForm={this.props.changeForm}/>
							      </div>
							    </div>
							  </div>
								<div className="card">
							    <div className="card-header" id="headingFive">
							      <h5 className="mb-0">
							        <button className="btn btn-link" data-toggle="collapse" data-target="#collapseFive" aria-expanded="true" aria-controls="collapseFive">
							          R&eacute;mun&eacute;ration
							        </button>
							      </h5>
							    </div>
							    <div id="collapseFive" className="collapse show" aria-labelledby="headingFive" data-parent="#accordion">
							      <div className="card-body">
											<ContractRemunerationContainer formState={formState} changeForm={this.props.changeForm}/>
							      </div>
							    </div>
							  </div>
							</div>
							<ModalForModalites/>
							{
								this.props.isAdmin &&
									formState.facultatif.map(element => {
									return (
										<div className="modal fade" id={element.idattrcontratcoll + "modal"}
											 key={element.idattrcontratcoll + "modal"}
											 tabIndex="-100" role="dialog" aria-labelledby="myModalLabel">
											<div className="modal-dialog" role="document">
												<div className="modal-content">
													<div className="modal-header">
														<h4 className="modal-title" id="myModalLabel">Modification du champ
															: {element.label}</h4>
														<button type="button" className="close" data-dismiss="modal"
																aria-label="Close">
															<span aria-hidden="true">&times;</span>
														</button>
													</div>
													<div className="modal-body">
														<form onSubmit={this._handleModifyField}>
															<div className="form-group">
																<label htmlFor="modificationNomChamp" className="control-label">Nouveau titre du champ</label>
																<input type="text" className="form-control"
																	   id="modificationNomChamp"
																	   name="modificationNomChamp"
																	   onChange={this._changeNameModifyField}
																	   value={updateField.name} required/>
															</div>
															<div className="form-group">
																<label htmlFor="modificationDescChamp"
																	   className="control-label">Nouvelle description du champ</label>
																<input type="text" className="form-control"
																	   id="modificationDescChamp"
																	   name="modificationDescChamp"
																	   onChange={this._changeDescModifyField}
																	   value={updateField.description} required/>
															</div>
															<button type="button" className="btn btn-danger"
																	data-dismiss="modal"
																	value={element.idattrcontratcoll}
																	onClick={this._deleteField}>Supprimer le champ
															</button>
															<button type="submit" className="btn btn-primary"
																	value={element.idattrcontratcoll}
																	onClick={this._changeIdModifyField}>Modifier le champ
															</button>
														</form>
													</div>
												</div>
											</div>
										</div>
									);
								})
							}
							<div style={{padding: 20 + "px"}} className="text-center" >
							  <button className="btn btn-primary mx-auto" id="validateForm" onClick={this._onClickValidate}>Valider</button>
							</div>
						</div>
					</div>
				</div>
			}
		</div>
	)
	}
}

function mapStateToProps(state) {
	return {
		crmContract: state.crmContract,
		crmRechercheCollective: state.crmRechercheCollective,
		crmClientList: state.crmClientList,
		crmLogin: state.crmLogin,
		crmDashboard: state.crmDashboard,
	}
}

//fonctions
const mapDispatchToProps = (dispatch) => {
	return {
		createContract: (contract) =>{
			dispatch(createContract(contract));
		},
		changeForm: (newFormState) => {
			dispatch(changeFormContract(newFormState));
		},
		getGrid: (facDisplay) => {
			dispatch(getGrid(facDisplay));
		},
		changeBigLayout: (layout) => {
			dispatch(changeBigLayout(layout));
		},
		changeLilLayout: (layout) => {
			dispatch(changeLilLayout(layout));
		},
		sendingRequestColl: () => {
			dispatch(sendingRequestColl());
		},
		requests: () => {
			dispatch(getAGA());
		},
		getClientRequest: (id) => {
			dispatch(getClientRequest(id));
		},
		updatePosLayout: (layout, menus) => {
			dispatch(updatePosLayout(layout, menus));
			dispatch(changeBigLayout(menus));
			dispatch(changeLilLayout(layout));
		},
		setGrid: (grid) => {
			dispatch(setGrid(grid));
		},
		changeNewFieldContract: (newField) => {
			dispatch(changeNewFieldContract(newField))
		},
		changeUpdateFieldContract: (updateField) => {
			dispatch(changeUpdateFieldContract(updateField))
		},
		sendNewFieldContract: (newField) => {
			dispatch(sendNewFieldContract(newField))
		},
		sendUpdateFieldContract: (updateField) => {
			dispatch(sendUpdateFieldContract(updateField))
		},
		sendDeleteFieldContract: (id) => {
			dispatch(sendDeleteFieldContract(id))
		},
		bindClientData: (client) => {
			dispatch(bindClientData(client));
		},
		getContract: (idContract) => {
			dispatch(getContract(idContract));
		}
	}
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateContractContainer));
