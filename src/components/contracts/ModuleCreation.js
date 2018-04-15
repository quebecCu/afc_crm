import React from 'react';
import ModalitesDisplay from './ModalitesDisplay';

class ModuleCreation extends React.Component {
	constructor(props) {
		super(props);
		this._onChangeModule = this._onChangeModule.bind(this);
		this._onChangeNotes = this._onChangeNotes.bind(this);
		this._handleClickMoins = this._handleClickMoins.bind(this);
		let isSelected = false;
		if (this.props.module){
			isSelected = true;
		}
		this.state = {
			isSelected: isSelected,
			isDisabled: this.props.moduleInitial
		}
	}

	_onChangeModule(event) {
		this.state.isDisabled = true;
		let moduleModifie = {
			idModule: "",
			idDomaine: event.target.value,
			module_notes: "",
			modalites: []
		}

		let modulesToCreate = this.props.formState.contrat.modulesToCreate;
		let modulesAlreadySelected = this.props.formState.contrat.modulesAlreadySelected;

		modulesAlreadySelected.push(parseInt(event.target.value));
		modulesToCreate[modulesToCreate.length - 1] = moduleModifie;

		this.props.changeForm({
			...this.props.formState,
			contrat: {
				...this.props.formState.contrat,
				modulesToCreate: modulesToCreate,
				modulesAlreadySelected: modulesAlreadySelected
			}
		});


	}

	_onChangeNotes(event) {
		let domaine = this.props.module.idDomaine;
		let modulesInitiaux = this.props.formState.contrat.modulesInitiaux;
		let modulesToCreate = this.props.formState.contrat.modulesToCreate;
		let idModuleDansContrat;

		if (this.props.moduleInitial){
			let idModuleToRemove = this.props.module.idModule;
			for (let i = 0; i < modulesInitiaux.length; i++) {
				if (modulesInitiaux[i].idDomaine === domaine) {
					modulesInitiaux[i].module_notes = event.target.value;
				}
			}

			this.props.changeForm({
				...this.props.formState,
				contrat: {
					...this.props.formState.contrat,
					modulesInitiaux: modulesInitiaux
				}
			});
		}else{
			if(domaine !== ""){
				let idModuleDansContrat;
				for (let i = 0; i < modulesToCreate.length; i++) {
					if (modulesToCreate[i].idDomaine === domaine) {
						modulesToCreate[i].module_notes = event.target.value;
					}
				}
			}else{
				modulesToCreate[modulesToCreate.length-1].module_notes = event.target.value;
			}

			this.props.changeForm({
				...this.props.formState,
				contrat: {
					...this.props.formState.contrat,
					modulesToCreate: modulesToCreate
				}
			});
		}
	}


	_handleClickMoins(event) {
		let oldDomaine = this.props.module.idDomaine;
		let modulesInitiaux = this.props.formState.contrat.modulesInitiaux;
		let modulesToCreate = this.props.formState.contrat.modulesToCreate;
		let modulesAlreadySelected = this.props.formState.contrat.modulesAlreadySelected;
		let idModuleDansContrat;

		if (this.props.moduleInitial){
			let modulesSupprimes = this.props.formState.contrat.modulesSupprimes;
			let idModuleToRemove = this.props.module.idModule;
			for (let i = 0; i < modulesInitiaux.length; i++) {
				if (modulesInitiaux[i].idDomaine === oldDomaine) {
					idModuleDansContrat = i;
				}
			}

			modulesAlreadySelected.splice(modulesAlreadySelected.indexOf(oldDomaine), 1);
			modulesSupprimes.push(idModuleToRemove);
			modulesInitiaux.splice(idModuleDansContrat, 1);

			this.props.changeForm({
				...this.props.formState,
				contrat: {
					...this.props.formState.contrat,
					modulesInitiaux: modulesInitiaux,
					modulesSupprimes: modulesSupprimes,
					modulesAlreadySelected: modulesAlreadySelected
				}
			});
		}else{
			if(oldDomaine !== ""){
				for (let i = 0; i < modulesToCreate.length; i++) {
					if (modulesToCreate[i].idDomaine === oldDomaine) {
						idModuleDansContrat = i;
					}
				}
				modulesAlreadySelected.splice(modulesAlreadySelected.indexOf(oldDomaine), 1);
				modulesToCreate.splice(idModuleDansContrat, 1);
			}else{
				modulesToCreate.splice(modulesToCreate.length - 1);
			}

			this.props.changeForm({
				...this.props.formState,
				contrat: {
					...this.props.formState.contrat,
					modulesToCreate: modulesToCreate,
					modulesAlreadySelected: modulesAlreadySelected
				}
			});
		}

	}

	//select list sur les types de module. Une fois le module sélec, ca va loop dans ses modalités
	render() {
		return <div className="col-sm-6">
			<div className="card" style={{marginBottom: '5px'}}>
				<div className="card-header">Module</div>
			  <div className="card-body">
					<select
						id={"module" + this.props.module.idModule}
						name="module"
						className="form-control"
						onChange={this._onChangeModule}
						value={this.props.module.idDomaine}
						disabled={this.state.isDisabled}
					>
						<option id={"optionNull" + this.props.idComponent} value="" disabled> -- select an option --</option>
						{
							//Si l'id de la modalité est dans le formState.modulesToDisplay, set disabled
							this.props.formState.modules &&
							this.props.formState.modules.map((element) => {
								let isSelectedAlready = false;
								for (let i = 0; i < this.props.formState.contrat.modulesAlreadySelected.length; i++) {
									if (this.props.formState.contrat.modulesAlreadySelected[i] === element.idModule) {
										isSelectedAlready = true;
									}
								}
								if (isSelectedAlready) {
									return (
										<option
											key={element.idModule}
											id={element.idModule}
											value={element.idModule}
											disabled
										>
											{
												element.nom
											}
										</option>
									)
								}
								else {
									return (<option
										key={element.idModule}
										id={element.idModule}
										value={element.idModule}

									>
										{
											element.nom
										}
									</option>)
								}


							})}
					</select>
					{
						(this.state.isSelected && this.props.module.idDomaine !== "") &&

							<ModalitesDisplay moduleInitial={this.props.moduleInitial} idDomaine={this.props.module.idDomaine} module={this.props.module}
											  formState={this.props.formState} changeForm={this.props.changeForm}/>
					}
					<textarea id={"textarea" + this.props.module.idModule} placeholder="Notes relatives au module"
							  value={this.props.module.module_notes}
							  onChange={this._onChangeNotes} className="form-control"
					/>
					<br/>
					<div className="text-center">
						<button id={this.props.idComponent} onClick={this._handleClickMoins} className="btn btn-danger">Supprimer ce module</button>
					</div>
			  </div>
			</div>
		</div>
	}
}

export default (ModuleCreation);
