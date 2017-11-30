import React from 'react';
import ModuleCreation from './ModuleCreation';

class ContractModulesPart extends React.Component{
	constructor(props){
		super(props);
		this._handleClickPlus=this._handleClickPlus.bind(this);
		this._handleClickMoins=this._handleClickMoins.bind(this);

		this._modulesToReturn=this._modulesToReturn.bind(this);
	}

	//Si le state contrat a sélectionné encore module, affichage d'un module
	// Si le state contrat a déjà des modules, loop dedans pour les afficher
	_handleClickPlus(event){

		let newInt = parseInt(JSON.parse(JSON.stringify(this.props.formState.intModulesToDisplay))) + 1 ;
		this.props.changeForm({...this.props.formState, intModulesToDisplay:newInt});
	}

	_handleClickMoins(event){

		let newInt = parseInt(JSON.parse(JSON.stringify(this.props.formState.intModulesToDisplay))) - 1 ;
		this.props.changeForm({...this.props.formState, intModulesToDisplay:newInt});
		document.getElementById(event.target.id).style.display = "none";
	}

	_modulesToReturn(){
		let array = [];
		for(let i = 0; i < this.props.formState.intModulesToDisplay; i++){
			array[i] = i;
			console.log(array);
		}
		let toReturn = array.map(element=>{
			if(element!==0){
				return (<div><ModuleCreation key = {element} idComponent = {element} formState = {this.props.formState} changeForm = {this.props.changeForm}/>
					<button id={element} onClick={this._handleClickMoins}>Supprimer ce module </button></div>)
			}
		});
		return toReturn;
	}



	render(){
		let toReturn = this._modulesToReturn();
		return <div>
			<ModuleCreation idComponent = {0} formState = {this.props.formState} changeForm = {this.props.changeForm}/>

			{
				toReturn
			}
			<button onClick={this._handleClickPlus}>Ajouter un module</button>

		</div>;
	}
}

export default (ContractModulesPart);
