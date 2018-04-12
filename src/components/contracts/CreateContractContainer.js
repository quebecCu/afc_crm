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
	getGrid, createContract, getContractToUpdate, setFromClient,
	sendDeleteFieldContract, sendNewFieldContract, sendUpdateFieldContract, setGrid, updatePosLayout
} from "../../actions/crmContract";
import GridOptionnalContract from "./GridOptionnalContract";
import {bindClientData, getClientRequest} from "../../actions/crmClientList";
import {sendingRequestColl} from "../../actions/crmRechercheCollective";
import LoadingAnimation from "../LoadingAnimation";
import ModalForModalites from "./modal/ModalForModalites";
import {changeLoadingValidation} from "../../actions/crmDashboard";

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
		let {formState, fromClient} = this.props.crmContract;
		this.state = {
      crmContract: this.props.crmContract
    };

		//si on display un blank contrat on fait un state vide de toute envie de vivre.
		//si on display un update contrat, le state est "prérempli" de toutes les infos
		if (!this.props.idContract) {

			let historiqueTaux = {
				annee_dep: '',
				annee_fin: '',
				diff: '',
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
			};
			let remunerationToAdd: {
				vie:'',
				ct:'',
				lt:'',
				amc:'',
				dent:'',
				mg:'',
				pae:'',
				notes:'',
				recu:'',
				base:'',
				boni:'',
				total:'',
				gtotal:'',
				idConseiller:'',
				split:'',
				bdu:'',
				paye:'',
				dpaye:'',
			};
			this.props.getGrid();
			this.props.setFromClient({
				idClient: '',
				name: '',
				update: false
			});
			this.props.changeForm({
				...formState,
				intModulesToDisplay: 1,
				modulesToDisplay: [],
				historiqueToAdd: historiqueTaux,
				remunerationToAdd: remunerationToAdd,
				contrat: {
					...formState.contrat,
					idAssureur: '',
					idAGA: '',
					modulesSupprimes: [],
					modulesInitiaux: [],
					modulesAlreadySelected: [],
					numPolice: '',
					dateEmission: '',
					moisRenouv: '',
					notes: '',
					idContract:'',
					idRepresentant: '',
					historiqueTaux: [],
					remuneration: []
				}
			})
		} else {
			this.props.getContractToUpdate(this.props.idContract);
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


		this._validateForm();
		//Si on est en create, on crée le bordel sinan na
		if (this.props.idContract) {

		}else{
			if (formState.historiqueToAdd.annee_dep !== ""){
				formState.contrat.historiqueTaux.push(formState.historiqueToAdd);
			}
			if (formState.remunerationToAdd.annee_dep !== ""){
				formState.contrat.remuneration.push(formState.remunerationToAdd);
			}
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
		let {formState, newField, types, updateField, fromClient} = this.props.crmContract;
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
												idContract={this.props.idContract}
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
		setFromClient: (fromClient) => {
			dispatch(setFromClient(fromClient));
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
		getContractToUpdate: (idContract) => {
			dispatch(getContractToUpdate(idContract));
		}
	}
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateContractContainer));
