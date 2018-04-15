import React from 'react';

// A FAIRE !!!!! Quand il essaye de valider et que un "Autres" est sélectionné mais n'a pas rempli le textfield, pas le laisser


class DisplayOneModalite extends React.Component {
	constructor(props) {
		super(props);
		this._onChangeTextField = this._onChangeTextField.bind(this);
	}


	_onChangeTextField(event) {
		//quand on change un textfield c'est forcément un "autre" donc on FIESTA
		let modaliteModifiee = {
			idModalite: this.props.modalite.idModalite,
			souscription_notes: '',
			valeur: event.target.value
		};

		let modulesInitiaux = this.props.formState.contrat.modulesInitiaux;
		let modulesToCreate = this.props.formState.contrat.modulesToCreate;
		let idModuleDansContrat;

		if (this.props.moduleInitial){
			for (let i = 0; i < modulesInitiaux.length; i++) {
				if (modulesInitiaux[i].idDomaine === this.props.idDomaine) {
					idModuleDansContrat = i;
				}
			}
			let modalitesInitiales = this.props.formState.contrat.modulesInitiaux[idModuleDansContrat].modalites;
			let containsIdModalite;
			let idModaliteDansLarray;
			for (let j = 0; j < modalitesInitiales.length; j++) {
				if (modalitesInitiales[j].idModalite === modaliteModifiee.idModalite){
					containsIdModalite = true;
					idModaliteDansLarray = j;
				}
			}

			if (modalitesInitiales.length === 0 || !containsIdModalite) {
					modalitesInitiales.push(modaliteModifiee);
			}else{
					modalitesInitiales[idModaliteDansLarray] = modaliteModifiee;
					modulesInitiaux[idModuleDansContrat].modalites = modalitesInitiales;
			}

			this.props.changeForm({
				...this.props.formState, contrat: {
					...this.props.formState.contrat,
					modulesInitiaux: modulesInitiaux
				}
			});
		}else{
			for (let i = 0; i < modulesToCreate.length; i++) {
				if (modulesToCreate[i].idDomaine === this.props.idDomaine) {
					idModuleDansContrat = i;
				}
			}
			let modalitesInitiales = this.props.formState.contrat.modulesToCreate[idModuleDansContrat].modalites;
			let containsIdModalite;
			let idModaliteDansLarray;
			for (let j = 0; j < modalitesInitiales.length; j++) {
				if (modalitesInitiales[j].idModalite === modaliteModifiee.idModalite){
					containsIdModalite = true;
					idModaliteDansLarray = j;
				}
			}

			if (modalitesInitiales.length === 0 || !containsIdModalite) {
					modalitesInitiales.push(modaliteModifiee);
			}else{
					modalitesInitiales[idModaliteDansLarray] = modaliteModifiee;
					modulesToCreate[idModuleDansContrat].modalites = modalitesInitiales;
			}

			this.props.changeForm({
				...this.props.formState, contrat: {
					...this.props.formState.contrat,
					modulesToCreate: modulesToCreate
				}
			});
		}
	}

	render() {
		return <div className="col-md-6 col-xs-12">
			<div className="form-group">
				<label id={this.props.modalite.idModalite} className="col-form-label">{this.props.modalite.nom}</label>
				<div className="tooltipp" style={{cursor: "pointer", position: 'relative', right: '-8px', top: 0}}>
					<span className="fa fa-info"/>
					<span className="tooltipptext">{this.props.modalite.description}</span>
				</div>
				{
					this.props.valeur !== "" &&
					<span className="fa fa-pencil" style={{
						cursor: "pointer",
						position: 'relative',
						right: '-15px',
						top: 0
					}}
						  data-toggle="modal"
						  data-target={"#" + this.props.modalite.idModalite + "modalite"}/>
				}
				<input
					id={"valeur" + this.props.modalite.idModalite + this.props.idDomaine}
					type="textField"
					className="form-control"
					value={this.props.valeur}
					onChange={this._onChangeTextField}
				/>

			</div>
		</div>
	}
}

export default (DisplayOneModalite);
