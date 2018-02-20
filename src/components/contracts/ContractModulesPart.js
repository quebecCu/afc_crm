import React from 'react';
import ModuleCreation from './ModuleCreation';

class ContractModulesPart extends React.Component{
	constructor(props){
		super(props);
		this._handleClickPlus=this._handleClickPlus.bind(this);
		this._modulesToReturn=this._modulesToReturn.bind(this);
	}



	//Si le state contrat a sélectionné un module, affichage d'un module
	// Si le state contrat a déjà des modules, loop dedans pour les afficher
	_handleClickPlus(event){

		let newInt = parseInt(JSON.parse(JSON.stringify(this.props.formState.intModulesToDisplay)), 10) + 1 ;
		this.props.changeForm({...this.props.formState, intModulesToDisplay:newInt});
	}


	_modulesToReturn(){
		let array = [];
		for(let i = 0; i < this.props.formState.intModulesToDisplay; i++){
			array[i] = i;
		}
		let toReturn = array.map(element=>{
			if(element!==0){
				return (

						<ModuleCreation id={"module"+element} key = {element} idComponent = {element}
										formState = {this.props.formState}
										view={this.props.view}
										changeForm = {this.props.changeForm}/>


				)
			}
			else {
				return "";
			}
		});
		return toReturn;
	}



	render(){
		let toReturn = this._modulesToReturn();
		return <div className="row">

			<ModuleCreation idComponent = {0} formState = {this.props.formState}
							view={this.props.view}
							changeForm = {this.props.changeForm}/>

			{
				toReturn
			}
			{
				parseInt(this.props.formState.intModulesToDisplay,10) === this.props.formState.modulesToDisplay.length &&
				<div className="col-sm-6">
					<div onClick={this._handleClickPlus} className="card text-white bg-info mb-3">
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
