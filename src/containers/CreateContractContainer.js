import React from 'react';
import ContractClientPart from '../components/ContractClientPart.js';
import ContractInfoPart from '../components/ContractInfoPart';
import ContractModulesPart from '../components/ContractModulesPart';
import ContractTauxContainer from './ContractTauxContainer';
import ContractRemunerationContainer from './ContractRemunerationContainer';
import {connect} from "react-redux";
import {
	changeBigLayout, changeFormContract, changeLilLayout, changeNewFieldContract, changeUpdateFieldContract, getAGA,
	getEmployesAFC,
	getListAssureurs, sendDeleteFieldContract, sendNewFieldContract, sendUpdateFieldContract, setGrid, updatePosLayout
} from "../actions/crmContract";
import {Responsive, WidthProvider} from 'react-grid-layout';
import GridOptionnalContract from "../components/GridOptionnalContract";
import {getClientRequest} from "../actions/crmClientList";
import {sendingRequestColl} from "../actions/crmRechercheCollective";
const ResponsiveReactGridLayout = WidthProvider(Responsive);


class CreateContractContainer extends React.Component {
	constructor(props){
		super(props);
		this._resetStyle=this._resetStyle.bind(this);
		this._onClickValidate=this._onClickValidate.bind(this);
		this._validateForm=this._validateForm.bind(this);
		this._handleStatic = this._handleStatic.bind(this);
		this._handleNonStatic = this._handleNonStatic.bind(this);
		this._handleDrag = this._handleDrag.bind(this);
		this._handleSubmitChamp = this._handleSubmitChamp.bind(this);
		this._changeNameModifyField = this._changeNameModifyField.bind(this);
		this._changeDescModifyField = this._changeDescModifyField.bind(this);
		this._changeIdModifyField = this._changeIdModifyField.bind(this);
		this._handleModifyField = this._handleModifyField.bind(this);
		this._deleteField = this._deleteField.bind(this);
		this.props.requests();
		let {formState} = this.props.crmContract;
		//si on display un blank contrat on fait un state vide de toute envie de vivre.
		//si on display un update contrat, le state est "prérempli" de toutes les infos
		this.props.changeForm({...formState, intModulesToDisplay:1, modulesToDisplay:[], contrat:{...formState.contrat,
			idAssureur: '',
			idAGA: '',
			modulesChoisis: [],
			numPolice:'222333',
			dateEmission:'',
			moisRenouv:'2233',
			notes:'Salut hehe je test',
			historiqueTaux:{diff: '',
				vie: '',
				dma: 'ererf',
				pac: 'erf',
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
				pae: 'erferf',
				prime_ms: '',
				prime_an: ''
			},
			remuneration:{
				vie:'',
				ct:'',
				lt:'',
				amc:'',
				dent:'',
				mg:'',
				pae:'',
				notes:'rrree',
				recu:'',
				base:'',
				boni:'',
				total:'',
				gtotal:'',
				idConseiller:'',
				split:'',
				bdu:'eferferf',
				paye:'',
				dpaye:'',
			}
		}});
	}

	componentDidUpdate() {
		this._resetStyle();
	}

	_changeNameModifyField(event) {
		this.props.changeUpdateFieldContract({...this.props.crmContract.updateField , name: event.target.value});
	}

	_changeDescModifyField(event) {
		this.props.changeUpdateFieldContract({...this.props.crmContract.updateField , description: event.target.value});
	}

	_changeIdModifyField(event) {
		this.props.changeUpdateFieldContract({...this.props.crmContract.updateField , id: event.target.value});
	}

	_resetStyle(){
		document.getElementById("assureurLabel").className = "col-sm-3 col-form-label";
		document.getElementById("assureur").className = "form-control";
		document.getElementById("AGALabel").className = "col-sm-3 col-form-label";
		document.getElementById("AGA").className = "form-control";
		document.getElementById("dateEmissionLabel").className = "col-sm-3 col-form-label";
		document.getElementById("dateEmission").className = "form-control";
		document.getElementById("moisRenouvLabel").className = "col-sm-3 col-form-label";
		document.getElementById("moisRenouv").className = "form-control";
		document.getElementById("assureurHelp").style.display = "none";
		document.getElementById("AGAHelp").style.display = "none";
		document.getElementById("numPoliceHelp").style.display = "none";
		document.getElementById("dateEmissionHelp").style.display = "none";
		document.getElementById("moisRenouvHelp").style.display = "none";

	}

	componentDidMount(){
		document.getElementById("assureurHelp").style.display = "none";
		document.getElementById("AGAHelp").style.display = "none";
		document.getElementById("numPoliceHelp").style.display = "none";
		document.getElementById("dateEmissionHelp").style.display = "none";
		document.getElementById("moisRenouvHelp").style.display = "none";
	}

	_handleStatic() {
		let { bigLayout } = this.props.crmContract;
		let layout = bigLayout.map(div => {
			return {...div, static: true};
		});
		this.props.changeBigLayout(layout);
	}

	_handleNonStatic() {
		let { bigLayout } = this.props.crmContract;
		let layout = bigLayout.map(div => {
			return {...div, static: false};
		});
		this.props.changeBigLayout(layout);
	}

	_handleDrag(newItem) {
		let { lilLayout } = this.props.crmContract;
		this.props.updatePosLayout(lilLayout, newItem);
	}

	//On crée un nouveau champ !
	_handleSubmitChamp(event) {
		event.preventDefault();
		let {formState, newField} = this.props.crmContract;
		let x = (formState.facultatif.length % 4)*3;
		let y = Math.floor(formState.facultatif.length/4);

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

	_onClickValidate(event){
		//let {formState} = this.props.crmContract;
		//let isValid = this._validateForm();
		this._validateForm();
	}

	_validateForm(){
		this._resetStyle();
		let {formState} = this.props.crmContract;
		//let isValid = true;
		if(!formState.contrat.idAssureur){
			document.getElementById("assureurLabel").className += " text-danger";
			document.getElementById("assureur").className += " is-invalid";
			document.getElementById("assureurHelp").style.display = "block";
			//isValid = false;
		}
		if(!formState.contrat.idAGA){
			document.getElementById("AGALabel").className += " text-danger";
			document.getElementById("AGA").className += " is-invalid";
			document.getElementById("AGAHelp").style.display = "block";
			//isValid = false;
		}
		if(!formState.contrat.numPolice) {
			document.getElementById("numPoliceLabel").className += " text-danger";
			document.getElementById("numPolice").className += " is-invalid";
			document.getElementById("numPoliceHelp").style.display = "block";
			//isValid = false;
		}
		if(!formState.contrat.dateEmission){//check les regex
			document.getElementById("dateEmissionLabel").className += " text-danger";
			document.getElementById("dateEmission").className += " is-invalid";
			document.getElementById("dateEmissionHelp").style.display = "block";
			//isValid = false;
		}
		if(!formState.contrat.moisRenouv){//check les regex
			document.getElementById("moisRenouvLabel").className += " text-danger";
			document.getElementById("moisRenouv").className += " is-invalid";
			document.getElementById("moisRenouvHelp").style.display = "block";
			//isValid = false;
		}

		//return isValid;



	}

	render(){
		let { formState, bigLayout, lilLayout, newField, types, updateField } = this.props.crmContract;
		let {dossiersState} = this.props.crmRechercheCollective;
		let {client} = this.props.crmClientList;
		let {isAdmin} = this.props.crmLogin;
		let layout = bigLayout;
		let layouts = {lg:layout, md:layout, sm:layout, xs:layout, xxs:layout};
		return <div>
			<ResponsiveReactGridLayout className="layout" layouts={layouts} rowHeight={40}
									   breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
									   cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
									   compactType={null}
									   autoSize = {true}
									   onDragStop={this._handleDrag} onResizeStop={this._handleDrag}
			>
				<div key="1"><ContractClientPart changeForm={this.props.changeForm}
												 clients={dossiersState} getClient={this.props.getClientRequest}
												 formState={formState} comesFrom={this.props.comesFrom}
												 client={client}
				/></div>
				<div key="2"><ContractInfoPart formState={formState}
											   changeForm={this.props.changeForm}/></div>
				<div key="3"><ContractModulesPart formState={formState} changeForm = {this.props.changeForm}/></div>
				<div key="4">
					<GridOptionnalContract lilLayout={lilLayout}
										   bigLayout={bigLayout}
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
			</ResponsiveReactGridLayout>

			<ContractTauxContainer formState={formState} changeForm={this.props.changeForm}/>
			<ContractRemunerationContainer formState={formState} changeForm={this.props.changeForm} />
			{
				formState.facultatif.map(element => {
					return (
						<div className="modal fade" id={element.idattrcontratcoll+"modal"} key={element.idattrcontratcoll+"modal"}
							 tabIndex="-100" role="dialog" aria-labelledby="myModalLabel">
							<div className="modal-dialog" role="document">
								<div className="modal-content">
									<div className="modal-header">
										<h4 className="modal-title" id="myModalLabel">Modification du champ : {element.label}</h4>
										<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div className="modal-body">
										<form onSubmit={this._handleModifyField}>
											<div className="form-group">
												<label htmlFor="modificationNomChamp" className="control-label">Nouveau titre du champ</label>
												<input type="text" className="form-control" id="modificationNomChamp"
													   name="modificationNomChamp" onChange={this._changeNameModifyField}
													   value={updateField.name} required/>
											</div>
											<div className="form-group">
												<label htmlFor="modificationDescChamp" className="control-label">Nouvelle description du champ</label>
												<input type="text" className="form-control" id="modificationDescChamp"
													   name="modificationDescChamp" onChange={this._changeDescModifyField}
													   value={updateField.description} required/>
											</div>
											<button type="button" className="btn btn-danger" data-dismiss="modal"
													value={element.idattrcontratcoll} onClick={this._deleteField}>Supprimer le champ</button>
											<button type="submit" className="btn btn-primary"
													value={element.idattrcontratcoll} onClick={this._changeIdModifyField}>Modifier le champ</button>
										</form>
									</div>
								</div>
							</div>
						</div>
					);
				})
			}
			<button onClick={this._handleStatic}>Rendre le grid static</button>
			<button onClick={this._handleNonStatic}>Rendre le grid non-static</button>

			<button id="validateForm" onClick={this._onClickValidate}>Créer le contrat</button>
		</div>;
	}
}

function mapStateToProps(state) {

	return {
		crmContract: state.crmContract,
		crmRechercheCollective: state.crmRechercheCollective,
		crmClientList: state.crmClientList,
		crmLogin : state.crmLogin
	}
}

//fonctions
const mapDispatchToProps = (dispatch) => {
	return {

		changeForm : (newFormState) => {
			dispatch(changeFormContract(newFormState))
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
		requests:() => {
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
		}
	}
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateContractContainer);
