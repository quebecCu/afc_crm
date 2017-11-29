import React from 'react';
import ModuleCreation from './ModuleCreation';

class ContractModulesPart extends React.Component{
	constructor(props){
		super(props);
	}

	//Si le state contrat a sélectionné encore module, affichage d'un module
	// Si le state contrat a déjà des modules, loop dedans pour les afficher

	render(){
		return <div>
			<ModuleCreation idComponent = {0} formState = {this.props.formState} changeForm = {this.props.changeForm}/>
			<ModuleCreation idComponent = {1} formState = {this.props.formState} changeForm = {this.props.changeForm}/>

		</div>;
	}
}

export default (ContractModulesPart);
