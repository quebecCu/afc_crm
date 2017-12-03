import React from 'react';
import ModalitesDisplay from './ModalitesDisplay';

class ModuleCreation extends React.Component{
	constructor(props){
		super(props);
		this._onChangeModule=this._onChangeModule.bind(this);
		this._handleClickMoins=this._handleClickMoins.bind(this);
	}

	_onChangeModule(event){
		// SIIII la taille de modulesChoisis est egale a l'id du component, ça veut dire que le module a pas encore été sélectionne
		// du coup, au premier click, on push le module, la taille augmente et aux prochains clics, ça modifie le tableau
		// à la position de props.idComponent


		let modulesContrat = JSON.parse(JSON.stringify(this.props.formState.contrat.modulesChoisis));
		let arrayDaffichage = JSON.parse(JSON.stringify(this.props.formState.modulesToDisplay));

		if(this.props.idComponent === modulesContrat.length){
			modulesContrat.push({idModule: event.target.value, modalites:[]});
			arrayDaffichage.push(event.target.value);
		}
		//else if idComponent > contrat.length et que ça créerait un null si on le push a la place de idcomponent...
		else{
			modulesContrat[this.props.idComponent] = {idModule: event.target.value, modalites:[]};
			arrayDaffichage[this.props.idComponent] = event.target.value;
		}


		this.idModule=event.target.value;
		this.isSelected=true;
		this.props.changeForm({...this.props.formState, contrat:{...this.props.formState.contrat, modulesChoisis:modulesContrat},
					modulesToDisplay:arrayDaffichage});



	}
	_handleClickMoins(event){
		//on get la position de l'ID du module dans le modulesToDisplay pour le dégager du tableau


		let newInt = parseInt(JSON.parse(JSON.stringify(this.props.formState.intModulesToDisplay)), 10) - 1 ;
		let modulesToDisplay = JSON.parse(JSON.stringify(this.props.formState.modulesToDisplay),10);
		modulesToDisplay.splice(event.target.id, 1);
		let modulesChoisis = JSON.parse(JSON.stringify(this.props.formState.contrat.modulesChoisis),10);
		modulesChoisis.splice(event.target.id,1);
		this.props.changeForm({...this.props.formState, intModulesToDisplay:newInt, modulesToDisplay:modulesToDisplay,
			contrat:{...this.props.formState.contrat, modulesChoisis:modulesChoisis}});
		//document.getElementById(event.target.id).style.display = "none";
		document.getElementById("module"+event.target.id).setAttribute('value', "");
		document.getElementById("module"+event.target.id).value = "";
		this.isSelected = false;
	}


	//select list sur les types de module. Une fois le module sélec, ca va loop dans ses modalités
	render(){
		return <div className="d-flex flex-column">
			<div className="p-2"><select
					id={"module"+this.props.idComponent}
					name="module"
					className="form-control"
					onChange={this._onChangeModule}
					>
					<option value=""> -- select an option -- </option>
					{
						//Si l'id de la modalité est dans le formState.modulesToDisplay, set disabled
						this.props.formState.modules.map((element) => {
							let isSelectedAlready=false;
							if(this.props.formState.modulesToDisplay.length !== 0){
								for(let i = 0; i < this.props.formState.modulesToDisplay.length; i++) {
									if (parseInt(this.props.formState.modulesToDisplay[i],10) === element.idModule) {
										isSelectedAlready = true;
									}
								}
							}
							if(isSelectedAlready){
									return (<option
										key={element.idModule}
										id={element.idModule}
										value={element.idModule}
										disabled

									>
										{
											element.nom
										}
									</option>)
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
			</div >
			{
				this.isSelected &&
				<div className="p2"><ModalitesDisplay idModule={this.idModule} formState = {this.props.formState} changeForm={this.props.changeForm}/></div>
			}
			{
				(this.props.idComponent !== 0) && <div style={{width: 50}}><button id={this.props.idComponent} onClick={this._handleClickMoins}>Supprimer ce module </button></div>
			}
		</div>
	}
}

export default (ModuleCreation);
