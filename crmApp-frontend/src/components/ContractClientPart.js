import React from 'react';

class ContractClientPart extends React.Component{
	constructor(props){
		super(props);
		this._onChangeRepresentant = this._onChangeRepresentant.bind(this);
		if(this.props.comesFrom === "client"){
			document.getElementById("nomClient").setAttribute('disabled', true);
		}
	}

	_onChangeRepresentant(event) {
		this.props.changeForm({...this.props.formState, contrat:{...this.props.formState.contrat, idRepresentant:event.target.value}});
	}

	render(){
		return <div>
			<h4>Informations sur le client</h4>
			<div className="form-group row">
				<label id="nomClientLabel" className="col-sm-3 col-form-label">Nom client</label>
					<input
						type="textField"
						className="form-control col-sm-8"
						placeholder="Nom client"
						id="nomClient"
						/>
			</div>
			<div className="form-group row">
				<label id="sousGroupeLabel" className="col-sm-3 col-form-label">Sous groupe</label>
				<input
					type="textField"
					className="form-control col-sm-8"
					placeholder="Sous groupe"
					id="sousGroupe"
					disabled
				/>
			</div>
			<div className="form-group row">
				<label id="nbEmployesLabel" className="col-sm-3 col-form-label">Nombre d'employés</label>
				<input
					type="textField"
					className="form-control col-sm-8"
					placeholder="Nombre d'employés"
					id="nbEmployes"
					disabled
				/>
			</div>
			<div className="form-group row">
				<label id="representantLabel" className="col-sm-3 col-form-label">Représentant (chez AFC)</label>
				<select
					id="representant"
					name="representant"
					className="form-control col-sm-8"
					value={this.props.formState.contrat.idRepresentant}
					onChange={this._onChangeRepresentant}
				>
					<option disabled value=""> -- Veuillez sélectionner une valeur -- </option>
					{
						this.props.formState.employesAFC.map(employe => {
							return <option value={employe.idemploye}>{employe.prenom} {employe.nom}</option>
						})
					}
				</select>
			</div>
		</div> ;
	}
}

export default (ContractClientPart);
