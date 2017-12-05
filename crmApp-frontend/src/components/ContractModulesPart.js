import React from 'react';
import ModuleCreation from './ModuleCreation';

class ContractModulesPart extends React.Component{
	constructor(props){
		super(props);
		this._handleClickPlus=this._handleClickPlus.bind(this);
		//this._handleClickMoins=this._handleClickMoins.bind(this);
		this._modulesToReturn=this._modulesToReturn.bind(this);
		//this.disabled = true;
	}

	/*componentWillUpdate(){
		console.log(this.props.formState.intModulesToDisplay);
		console.log(this.props.formState.modulesToDisplay.length);
		if(parseInt(this.props.formState.intModulesToDisplay,10) !== this.props.formState.modulesToDisplay.length){
			console.log("TAMERE");
			this.disabled = false;
			//document.getElementById("ajouter").setAttribute('disabled', true);
		}
		else{
			console.log("TAMEREBIS");
			this.disabled = true;
			//document.getElementById("ajouter").setAttribute('disabled', false);

		}
	}*/

	//Si le state contrat a sélectionné encore module, affichage d'un module
	// Si le state contrat a déjà des modules, loop dedans pour les afficher
	_handleClickPlus(event){

		let newInt = parseInt(JSON.parse(JSON.stringify(this.props.formState.intModulesToDisplay)), 10) + 1 ;
		this.props.changeForm({...this.props.formState, intModulesToDisplay:newInt});
	}

	/*_handleClickMoins(event){
		//on get la position de l'ID du module dans le modulesToDisplay pour le dégager du tableau


		let newInt = parseInt(JSON.parse(JSON.stringify(this.props.formState.intModulesToDisplay)), 10) - 1 ;
		let modulesToDisplay = JSON.parse(JSON.stringify(this.props.formState.modulesToDisplay),10);
		modulesToDisplay.splice(event.target.id, 1);
		let modulesChoisis = JSON.parse(JSON.stringify(this.props.formState.contrat.modulesChoisis),10);
		modulesChoisis.splice(event.target.id,1);
		this.props.changeForm({...this.props.formState, intModulesToDisplay:newInt, modulesToDisplay:modulesToDisplay,
			contrat:{...this.props.formState.contrat, modulesChoisis:modulesChoisis}});
		document.getElementById(event.target.id).style.display = "none";
		document.getElementById("module"+event.target.id).setAttribute('value', "");
		document.getElementById("module"+event.target.id).value = "";
		document.getElementById("modalites"+event.target.id).style.display = "none";
	}*/

	_modulesToReturn(){
		let array = [];
		for(let i = 0; i < this.props.formState.intModulesToDisplay; i++){
			array[i] = i;
		}
		let toReturn = array.map(element=>{
			if(element!==0){
				return (

						<ModuleCreation id={"module"+element} key = {element} idComponent = {element} formState = {this.props.formState} changeForm = {this.props.changeForm}/>


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
		return <div>
			<ModuleCreation idComponent = {0} formState = {this.props.formState} changeForm = {this.props.changeForm}/>

			{
				toReturn
			}
			{
				parseInt(this.props.formState.intModulesToDisplay,10) === this.props.formState.modulesToDisplay.length &&
				<button id="ajouter" onClick={this._handleClickPlus}>Ajouter un module</button>
			}

		</div>;
	}
}

export default (ContractModulesPart);
