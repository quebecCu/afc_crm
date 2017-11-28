import React from 'react';

class ContractInfoPart extends React.Component {
	constructor(props){
		super(props);
		this.props.getAGA();
		this.props.getListAssureurs();
	}

	render(){
		return <div>
			<h3>Renseignement généraux sur le contrat</h3>
			<div className="form-group row">
				<label id="nomAssureurLabel" className="col-sm-3 col-form-label">Nom assureur : </label>
				<select
					id="nomAssureur"
					name="nomAssureur"
					className="form-control col-sm-8"
					value=""
				>
					<option disabled value=""> -- LA REQUETE BACKENDAAAAAA NOMS ASSUREURS -- </option>
				</select>
			</div>
			<div className="form-group row">
				<label id="AGALabel" className="col-sm-3 col-form-label">AGA : </label>
				<select
					id="AGA"
					name="AGA"
					className="form-control col-sm-8"
					value=""
				>
					<option disabled value=""> -- LA REQUETE BACKEND AGA-- </option>
				</select>
			</div>
			<div className="form-group row">
				<label id="numPoliceLabel" className="col-sm-3 col-form-label">Numéro de police : </label>
				<input
					type="textField"
					className="form-control col-sm-8"
					placeholder="Numéro de police"
					id="numPolice"
				/>
			</div>
			<div className="form-group row">
				<label id="dateEmission" className="col-sm-3 col-form-label">Date d'émission : </label>
				<input
					type="textField"
					className="form-control col-sm-8"
					placeholder="AAAA-MM"
					id="dateEmission"
				/>
			</div>
			<div className="form-group row">
				<label id="moisRenouv" className="col-sm-3 col-form-label">Mois de renouvellement : </label>
				<input
					type="textField"
					className="form-control col-sm-8"
					placeholder="MM"
					id="moisRenouv"
				/>
			</div>
		</div>
	}

}

export default (ContractInfoPart);
