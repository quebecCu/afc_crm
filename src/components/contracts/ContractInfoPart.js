import React from 'react';

class ContractInfoPart extends React.Component {
	constructor(props){
		super(props);
		this._onChangeAssureur=this._onChangeAssureur.bind(this);
		this._onChangeAGA=this._onChangeAGA.bind(this);
		this._onChangeNumPolice=this._onChangeNumPolice.bind(this);
		this._onChangeDateEmission=this._onChangeDateEmission.bind(this);
		this._onChangeMoisRenouv=this._onChangeMoisRenouv.bind(this);
		this._onChangeNotes=this._onChangeNotes.bind(this);
		this._onChangeChambreDeCommerce=this._onChangeChambreDeCommerce.bind(this);
		this._assureurs = this._assureurs.bind(this);
		this.state = {addAga: false};
	}

	_onChangeAssureur(event){
		this.props.changeForm({...this.props.formState, contrat:{...this.props.formState.contrat, idAssureur:event.target.value}});
	}

	_onChangeAGA(event){
		if (event.target.value == 9999){
			this.state.addAga = true;
		}
		else this.state.addAga = false;
		this.props.changeForm({...this.props.formState, contrat:{...this.props.formState.contrat, idAGA:event.target.value}});
	}

	_onChangeNumPolice(event){
		this.props.changeForm({...this.props.formState, contrat:{...this.props.formState.contrat, numPolice:event.target.value}});
	}

	_onChangeDateEmission(event){
		this.props.changeForm({...this.props.formState, contrat:{...this.props.formState.contrat,dateEmission:event.target.value}});
	}

	_onChangeMoisRenouv(event){
		this.props.changeForm({...this.props.formState, contrat:{...this.props.formState.contrat,moisRenouv:event.target.value}});
	}

	_onChangeNotes(event){
		this.props.changeForm({...this.props.formState, contrat:{...this.props.formState.contrat,notes:event.target.value}});
	}

	_onChangeChambreDeCommerce(event){
		this.props.changeForm({...this.props.formState, contrat:{...this.props.formState.contrat, chambreDeCommerce:event.target.value}});
	}

	_assureurs() {
		let assureurs = [];

		if (this.props.formState.listAssureurs){
			this.props.formState.listAssureurs.forEach( (element, index) => {
				let duplicate = false;
				this.props.formState.listAssureurs.forEach((element2, index2)=> {
					if(element.id === element2.id && index > index2) {
						duplicate = true;
					}
				});
				if(!duplicate) {
					assureurs.push(<option key={index} value={element.id}>{element.nom}</option>);
				}
			});
		}

		return assureurs;
	}



	render(){

		return <div>
			<h5>Renseignement généraux sur le contrat</h5>
			<br/>
			<div className="form-group">
				<label id="assureurLabel" className="col-form-label">Nom assureur</label>
				<br/>
				<select
					id="assureur"
					name="nomAssureur"
					className="form-control"
					value={this.props.formState.contrat.idAssureur}
					onChange={this._onChangeAssureur}
				>
					<option disabled value=""> -- Veuillez sélectionner une valeur -- </option>
					{
						this._assureurs().map(element => {
							return element;
						})
					}
				</select>
				<p id="assureurHelp" className="help-block text-danger">Sélectionner un assureur</p>
			</div>
			<div className="form-group">
				<label id="AGALabel" className="col-form-label">AGA (Choisir autre si vous voulez ajouter une chambre de commerce)</label>
				<br/>
				<select
					id="AGA"
					name="AGA"
					className="form-control"
					value={this.props.formState.contrat.idAGA}
					onChange={this._onChangeAGA}
				>
					<option selected disabled value=""> -- Veuillez sélectionner une valeur -- </option>
					{
						this.props.formState.AGA &&
						this.props.formState.AGA.map((aga, index) => {
							return <option key={index} value={aga.idchambrecommerce}>{aga.libellechambrecommerce}</option>
						})
					}
					<option value="9999"> Ajouter une chambre de commerce </option>
				</select>
				
				<p id="AGAHelp" className="help-block text-danger">Sélectionner un AGA</p>
			</div>

			 { /* ajouter la chambre de commerce */ }
			 {(this.state.addAga !== false) ?
				<div className="form-group">
				<label id="chambreCommerceLabel" className="col-form-label">Ajouter une chambre de commerce </label>
					<br/>
					<textarea
						className="form-control"
						placeholder="Chambre de commerce"
						id="chambreDeCommerce"
						onChange={this._onChangeChambreDeCommerce}
					/>
				</div>
				:null }
				{/* fin ajouter la chambre de commerce */ }

			<div className="form-group">
				<label id="numPoliceLabel" className="col-form-label">Numéro de police</label>
				<br/>
				<input
					type="textField"
					className="form-control"
					placeholder="Numéro de police"
					id="numPolice"
					onChange={this._onChangeNumPolice}
					value={this.props.formState.contrat.numPolice}
				/>
				<p id="numPoliceHelp" className="help-block text-danger">Insérer un numéro de police</p>
			</div>
			<div className="form-group">
				<label id="dateEmissionLabel" className="col-form-label">Date d'émission</label>
				<br/>
				<input
					type="textField"
					className="form-control"
					placeholder="AAAA-MM-JJ"
					id="dateEmission"
					value={this.props.formState.contrat.dateEmission}
					onChange={this._onChangeDateEmission}
				/>
				<p id="dateEmissionHelp" className="help-block text-danger">Format de la date AAAA-MM</p>
			</div>
			<div className="form-group">
				<label id="moisRenouvLabel" className="col-form-label">Mois de renouvellement</label>
				<br/>
				<input
					type="textField"
					className="form-control"
					placeholder="MM"
					id="moisRenouv"
					value={this.props.formState.contrat.moisRenouv}
					onChange={this._onChangeMoisRenouv}
				/>
				<p id="moisRenouvHelp" className="help-block text-danger">Format MM</p>
			</div>
			<div className="form-group">
				<label id="notesLabel" className="col-form-label">Notes</label>
				<br/>
				<textarea
					className="form-control"
					value={this.props.formState.contrat.notes}
					placeholder="Informations supplémentaires sur le contrat"
					id="notes"
					onChange={this._onChangeNotes}
				/>
			</div>
		</div>
	}

}

export default (ContractInfoPart);
