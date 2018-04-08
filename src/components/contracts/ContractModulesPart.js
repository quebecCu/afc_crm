import React from 'react';
import ModuleCreation from './ModuleCreation';

class ContractModulesPart extends React.Component{
	constructor(props){
		super(props);
		this._handleClickPlus=this._handleClickPlus.bind(this);
		this._modulesToReturn=this._modulesToReturn.bind(this);
		let update;
		if (this.props.idContract !== undefined){
			update = true;
		}else{
			update = false;
		}
		this.state = {update: update};
	}

	_canAdd(){
		let modulesInitiaux = this.props.formState.contrat.modulesInitiaux;
		let nbModulesMax = this.props.formState.modules.length;
		if (modulesInitiaux.length === 0){
			return true;
		}else if (modulesInitiaux.length === nbModulesMax){
			return false;
		}else{
			if (modulesInitiaux[modulesInitiaux.length-1].idDomaine === ""){
				return false;
			}else{
				return true;
			}
		}
	}

	//Si le state contrat a sélectionné un module, affichage d'un module
	// Si le state contrat a déjà des modules, loop dedans pour les afficher
	_handleClickPlus(event){
		let modulesInitiaux = this.props.formState.contrat.modulesInitiaux;
		let newModule = {
			idModule: "",
			idDomaine: "",
			module_notes: "",
			modalites: []
		}
		modulesInitiaux.push(newModule);
		this.props.changeForm({
			...this.props.formState,
			contrat: {
				...this.props.formState.contrat,
				modulesInitiaux: modulesInitiaux,
			}
		});
	}


	_modulesToReturn(){
		let toReturn = [];
		this.props.formState.contrat.modulesInitiaux.forEach((module,index) => {
				toReturn.push(<ModuleCreation id={"module"+index} key={index} module={module}
								formState = {this.props.formState}
								update={this.state.update}
								changeForm = {this.props.changeForm}/>)
		});
		return toReturn;
	}

	render(){
		let toReturn = this._modulesToReturn();
		return <div className="row">
			{
				toReturn
			}
			{
				this._canAdd() && <div className="col-sm-6">
						<div onClick={this._handleClickPlus} id="addModule" className="card text-white bg-info mb-3">
							<div className="card-body text-center">
								<h5 className="card-title">
									<i className="fa fa-plus"></i><br/>
									Ajouter un module
								</h5>
							</div>
						</div>
					</div>

			}
		</div>
	}
}

export default (ContractModulesPart);
