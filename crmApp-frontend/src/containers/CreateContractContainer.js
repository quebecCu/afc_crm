import React from 'react';
import ContractClientPart from '../components/ContractClientPart.js';
import ContractInfoPart from '../components/ContractInfoPart';
import ContractModulesPart from '../components/ContractModulesPart';
import {connect} from "react-redux";
import {changeFormContract, getAGA, getEmployesAFC, getListAssureurs} from "../actions/crmContract";
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);


class CreateContractContainer extends React.Component {
	constructor(props){
		super(props);
		this._resetStyle=this._resetStyle.bind(this);
		this._onClickValidate=this._onClickValidate.bind(this);
		this._validateForm=this._validateForm.bind(this);
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
		let { formState } = this.props.crmContract;

		let layout = [
			{i: '1', x: 0, y: 0, w: 5, h: 7, minH: 7, minW:3},
			{i: '2', x: 6, y: 0, w: 5, h: 6, minH: 6, minW:3},
			{i: '3', x: 0, y: 7, w: 5, h: 6, minH: 6, minW:3},

		];
		let layouts = {lg:layout, md:layout, sm:layout, xs:layout, xxs:layout};
		return <div>
			<ResponsiveReactGridLayout className="layout" layouts={layouts} rowHeight={40}
									   breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
									   cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
										compactType={null}
										autoSize = {true}>
				<div key="1"><ContractClientPart getEmployesAFC={this.props.getEmployesAFC} changeForm={this.props.changeForm}
												formState={formState}/></div>
				<div key="2"><ContractInfoPart getListAssureurs={this.props.getListAssureurs}
											   getAGA={this.props.getAGA}
											   formState={formState}
												changeForm={this.props.changeForm}/></div>
				<div key="3"><ContractModulesPart formState={formState} changeForm = {this.props.changeForm}/></div>

			</ResponsiveReactGridLayout>

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
		}

	}
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateContractContainer);
