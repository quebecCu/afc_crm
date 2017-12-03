import React from 'react';
// A FAIRE !!!!! Quand il essaye de valider et que un "Autres" est sélectionné mais n'a pas rempli le textfield, pas le laisser



class DisplayOneModalite extends React.Component{
	constructor(props){
		super(props);
		this._toDisplay=this._toDisplay.bind(this);
		this._onChangeSelectValue=this._onChangeSelectValue.bind(this);
		this._onChangeTextField=this._onChangeTextField.bind(this);
	}

	_onChangeTextField(event){
		//quand on change un textfield c'est forcément un "autre" donc on FIESTA
		let modaliteModifiee = {idValeur : 1, idModalite: this.props.modalite.idModalite,valeur:event.target.value};
		let idModuleDansContrat;
		for(let i = 0; i < this.props.formState.contrat.modulesChoisis.length; i++){
			if(this.props.formState.contrat.modulesChoisis[i].idModule === this.props.idModule){
				idModuleDansContrat = i;
			}
		}

		let modulesChoisis = JSON.parse(JSON.stringify(this.props.formState.contrat.modulesChoisis));
		let modalitesChoisies = JSON.parse(JSON.stringify(this.props.formState.contrat.modulesChoisis[idModuleDansContrat].modalites));
		let containsIdModalite;
		modalitesChoisies.forEach(element=>{

			if(element.idModalite === parseInt(this.props.modalite.idModalite, 10)){
				containsIdModalite = true;
			}
		});

		if(modalitesChoisies.length === 0 || !containsIdModalite){
			modalitesChoisies.push(modaliteModifiee);
		}
		/*else {//on get la place dans l'array
			for(let j = 0; j < modalitesChoisies.length; j++){
				if(modalitesChoisies[j].idModalite === modaliteModifiee.idModalite)
					idModaliteDansLarray = j;
			}
			modalitesChoisies[idModaliteDansLarray].valeur = modaliteModifiee.valeur;
		}*/
		let idModaliteDansLarray;
		for(let j = 0; j < modalitesChoisies.length; j++){
			if(modalitesChoisies[j].idModalite === modaliteModifiee.idModalite)
				idModaliteDansLarray = j;
		}

		if(event.target.value === ""){
			let idModaliteDansLarray;
			for(let j = 0; j < modalitesChoisies.length; j++){
				if(modalitesChoisies[j].idModalite === this.props.modalite.idModalite)
					idModaliteDansLarray = j;
			}
			modalitesChoisies.splice(idModaliteDansLarray, 1);

		}
		else{
			modalitesChoisies[idModaliteDansLarray].valeur = modaliteModifiee.valeur;
			document.getElementById("valeur"+this.props.modalite.idModalite+this.props.idModule).setAttribute('value',
				modalitesChoisies[idModaliteDansLarray].valeur);
		}

		modulesChoisis[idModuleDansContrat].modalites = modalitesChoisies;




		this.props.changeForm({...this.props.formState, contrat:{...this.props.formState.contrat,
			modulesChoisis:modulesChoisis }});



	}

	_onChangeSelectValue(event){
		if(event.target.value==="Autres"){
			document.getElementById("valeur"+this.props.modalite.idModalite+this.props.idModule).style.display="block";
		}
		else{
			document.getElementById("valeur"+this.props.modalite.idModalite+this.props.idModule).style.display="none";
			document.getElementById("valeur"+this.props.modalite.idModalite+this.props.idModule).value = "";
			document.getElementById("valeur"+this.props.modalite.idModalite+this.props.idModule).setAttribute('value', "");

		}

		let idModuleDansContrat;
		for(let i = 0; i < this.props.formState.contrat.modulesChoisis.length; i++){

			console.log(!this.props.formState.contrat.modulesChoisis[i]);
			if(this.props.formState.contrat.modulesChoisis[i]){
				if(this.props.formState.contrat.modulesChoisis[i].idModule === this.props.idModule){
					idModuleDansContrat = i;
				}
			}
		}
		let modulesChoisis = JSON.parse(JSON.stringify(this.props.formState.contrat.modulesChoisis));
		let modalitesChoisies = JSON.parse(JSON.stringify(this.props.formState.contrat.modulesChoisis[idModuleDansContrat].modalites));

		//si on passe à "", alors on supprime la ligne de la modalité du tableau
		if(event.target.value === ""){
			let idModaliteDansLarray;
			for(let j = 0; j < modalitesChoisies.length; j++){
				if(modalitesChoisies[j].idModalite === this.props.modalite.idModalite)
					idModaliteDansLarray = j;
			}
			modalitesChoisies.splice(idModaliteDansLarray, 1);
		}
		else{
			let idValeur;
			this.props.modalite.valeurs.forEach(element=>{
				if(element.label === event.target.value){
					idValeur = element.idValeur;
				}
			});

			let modaliteModifiee = {idValeur: idValeur, idModalite:this.props.modalite.idModalite, valeur:event.target.value};

			//si le formState.contrat.modulesChoisis[placedeidModuleChoisi].modalites est vide, on push dedans
			//sinon si le module choisi est déjà dans le tableau ou le modifie
			//si l'utilisateur choisi la valeur "", on retire la ligne du tableau

			//d'abord on cherche la place du module choisi dans le tableau



			let containsIdModalite;
			modalitesChoisies.forEach(element=>{

				if(element.idModalite === parseInt(this.props.modalite.idModalite, 10)){
					containsIdModalite = true;
				}
			});

			if(modalitesChoisies.length === 0 || !containsIdModalite){
				modalitesChoisies.push(modaliteModifiee);
			}

			//else {//on get la place dans l'array
			let idModaliteDansLarray;
			for(let j = 0; j < modalitesChoisies.length; j++){
				if(modalitesChoisies[j].idModalite === modaliteModifiee.idModalite)
					idModaliteDansLarray = j;
			}
			modalitesChoisies[idModaliteDansLarray] = modaliteModifiee;
			//}
			document.getElementById("modalite"+this.props.modalite.idModalite+this.props.idModule).setAttribute('value', modaliteModifiee.valeur);
			document.getElementById("modalite"+this.props.modalite.idModalite+this.props.idModule).value = modaliteModifiee.valeur;


		}

		modulesChoisis[idModuleDansContrat].modalites = modalitesChoisies;


		this.props.changeForm({...this.props.formState, contrat:{...this.props.formState.contrat,
			modulesChoisis:modulesChoisis }});



	}




	_toDisplay(){
		//si la seule valeur de la modalité est "autre", on le display pas, sinon on le display
		if(this.props.modalite.valeurs[0].label === "Autres" && this.props.modalite.valeurs.length === 1){

			return <input
				id={"valeur"+this.props.modalite.idModalite+this.props.idModule}
				type="textField"
				className="form-control"
				placeholder="test"
				onChange={this._onChangeTextField}

			/>
		}
		else{
			return (
				<div><select
					id={"modalite"+this.props.modalite.idModalite+this.props.idModule}
					name="modalite"
					className="form-control"
					onChange={this._onChangeSelectValue}
				>
					<option value=""> -- select an option -- </option>
					{
						this.props.modalite.valeurs.map((element) => {
							return (<option
								key={element.idValeur}
								value={element.label}

							>
								{
									element.label
								}
							</option>);

						})}
				</select>
					<input
						id={"valeur"+this.props.modalite.idModalite+this.props.idModule}
						type="textField"
						className="form-control"
						placeholder="test"
						style={{display: "none"}}
						onChange={this._onChangeTextField}
					/>
				</div>);
		}
	}

	//loop dans formState.modules pour trouver les bonnes modalités

	render(){
		return <div>
			<div className="form-group column">
				<label id={this.props.modalite.idModalite} className="col-form-label">{this.props.modalite.nom}</label>
				{
					this._toDisplay()
				}

			</div>
		</div>
	}
}

export default (DisplayOneModalite);
