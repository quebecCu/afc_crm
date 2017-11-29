import React from 'react';
import ModalitesDisplay from './ModalitesDisplay';

class ModuleCreation extends React.Component{
	constructor(props){
		super(props);
		this._onChangeModule=this._onChangeModule.bind(this);
	}

	_onChangeModule(event){
		// SIIII la taille de modulesChoisis est egale a l'id du component, ça veut dire que le module a pas encore été sélectionne
		// du coup, au premier click, on push le module, la taille augmente et aux prochains clics, ça modifie le tableau
		// à la position de props.idComponent


		let modulesContrat = JSON.parse(JSON.stringify(this.props.formState.contrat.modulesChoisis));

		if(this.props.idComponent === modulesContrat.length){
			modulesContrat.push({idModule: event.target.value, modalites:[]});
		}
		else{
			modulesContrat[this.props.idComponent] = {idModule: event.target.value, modalites:[]}
		}

		/*let alreadyContains = false;
		let idOnModulesChoisis;
		if(modulesContrat.length===0){
			modulesContrat.push({idModule: event.target.value, modalites:[]});
		}
		else{
			//on check si ce module existe déjà dans la liste des modules choisis
			for(let i = 0; i < modulesContrat.length; i++){
				if(modulesContrat[i].idModule === event.target.value){
					alreadyContains = true;
					idOnModulesChoisis = i;
				}
			}
			if(!alreadyContains){
				modulesContrat.push({idModule: event.target.value, modalites:[]});
			}
			else{

			}
		}*/
		//modulesContrat.push({idModule: event.target.value, modalites:[]});
		this.idModule=event.target.value;
		this.isSelected=true;
		this.props.changeForm({...this.props.formState, contrat:{...this.props.formState.contrat, modulesChoisis:modulesContrat} })
	}

	//select list sur les types de module. Une fois le module sélec, ca va loop dans ses modalités
	render(){
		return <div className="d-flex flex-column">
			<div className="p-2"><select
					id="module"
					name="module"
					className="form-control"
					onChange={this._onChangeModule}
					>
					<option disabled value=""> -- select an option -- </option>
					{
						this.props.formState.modules.map((element) => {
							return (<option
								key={element.idModule}
								value={element.idModule}

							>
								{
									element.nom
								}
							</option>);

						})}
				</select>
			</div >
			{
				this.isSelected &&
				<div className="p2"><ModalitesDisplay idModule={this.idModule} formState = {this.props.formState} changeForm={this.props.changeForm}/></div>
			}
		</div>
	}
}

export default (ModuleCreation);
