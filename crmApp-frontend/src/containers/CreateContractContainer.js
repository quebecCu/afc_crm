import React from 'react';
import ContractClientPart from '../components/ContractClientPart.js';
import ContractInfoPart from '../components/ContractInfoPart';
import ContractModulesPart from '../components/ContractModulesPart';
import ContractTauxContainer from './ContractTauxContainer';
import ContractRemunerationContainer from './ContractRemunerationContainer';
import {connect} from "react-redux";
import {
	changeBigLayout, changeFormContract, changeLilLayout, getAGA, getEmployesAFC,
	getListAssureurs
} from "../actions/crmContract";
import {Responsive, WidthProvider} from 'react-grid-layout';
import GridOptionnalContract from "../components/GridOptionnalContract";
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
		this.props.getAGA();
		this.props.getEmployesAFC();
		this.props.getListAssureurs();
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
		this.props.changeBigLayout(newItem);
	}

	_onClickValidate(event){
		//let {formState} = this.props.crmContract;
		//let isValid = this._validateForm();
		this._validateForm();
	}

	_validateForm(){
		this._resetStyle();
		console.log("HELLLLO");
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
		let { formState, bigLayout, lilLayout } = this.props.crmContract;

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
												 formState={formState} comesFrom={this.props.comesFrom}/></div>
				<div key="2"><ContractInfoPart formState={formState}
											   changeForm={this.props.changeForm}/></div>
				<div key="3"><ContractModulesPart formState={formState} changeForm = {this.props.changeForm}/></div>
				<div key="4"><GridOptionnalContract lilLayout={lilLayout} changeLilLayout={this.props.changeLilLayout}/></div>
			</ResponsiveReactGridLayout>

			<ContractTauxContainer formState={formState} changeForm={this.props.changeForm}/>
			<ContractRemunerationContainer formState={formState} changeForm={this.props.changeForm} />

			<button onClick={this._handleStatic}>Rendre le grid static</button>
			<button onClick={this._handleNonStatic}>Rendre le grid non-static</button>

			<button id="validateForm" onClick={this._onClickValidate}>Créer le contrat</button>
		</div>;
	}
}

function mapStateToProps(state) {

	return {
		crmContract: state.crmContract,
	}
}

//fonctions
const mapDispatchToProps = (dispatch) => {
	return {

		changeForm : (newFormState) => {
			dispatch(changeFormContract(newFormState))
		},
		getAGA: () => {
			dispatch(getAGA());
		},
		getListAssureurs: () => {
			dispatch(getListAssureurs());
		},
		getEmployesAFC: () => {
			dispatch(getEmployesAFC());
		},
		changeBigLayout: (layout) => {
			dispatch(changeBigLayout(layout));
		},
		changeLilLayout: (layout) => {
			dispatch(changeLilLayout(layout));
		}

	}
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateContractContainer);
