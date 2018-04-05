import React from 'react';
import ModuleCreation from './ModuleCreation';

class ContractModulesPart extends React.Component{
	constructor(props){
		super(props);
		this._handleClickPlus=this._handleClickPlus.bind(this);
		this._modulesToReturn=this._modulesToReturn.bind(this);
		let update;
		if (this.props.idContrat !== undefined){
			update = true;
		}else{
			update = false;
		}
		this.state = {update: update};
	}



	//Si le state contrat a sélectionné un module, affichage d'un module
	// Si le state contrat a déjà des modules, loop dedans pour les afficher
	_handleClickPlus(event){

		let newInt = this.props.formState.intModulesToDisplay + 1 ;
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
										update={this.state.update}
										changeForm = {this.props.changeForm}/>


				)
			}
			else {
				return "";
			}
		});
		return toReturn;
	}
	
	_modulesToAdd(){
		let array = [];
		for(let i = 0; i < this.props.formState.intModulesToAdd; i++){
			array[i] = i;
		}
		let toReturn = array.map(element=>{
			if(element!==0){
				return (

						<ModuleCreation id={"module"+element} key = {element} idComponent = {element}
										formState = {this.props.formState}
										update={this.state.update}
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
		let toAdd = this._modulesToAdd();
		return <div className="row">
			{
				toReturn
			}
			{
				toAdd
			}
			<div className="col-sm-6">
				<div onClick={this._handleClickPlus} id="addModule" className="card text-white bg-info mb-3">
					<div className="card-body text-center">
						<h5 className="card-title">
							<i className="fa fa-plus"></i><br/>
							Ajouter un module
						</h5>
					</div>
				</div>
			</div>
		</div>
	}
}

export default (ContractModulesPart);
