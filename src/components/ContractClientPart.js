import React from 'react';
import SuggestionClients from "./SuggestionClients";

class ContractClientPart extends React.Component{
	constructor(props){
		super(props);
		this._onChangeRepresentant = this._onChangeRepresentant.bind(this);
		this._sousGroupe = this._sousGroupe.bind(this);
		this._nombreEmployes = this._nombreEmployes.bind(this);
		if(this.props.comesFrom === "client"){
			document.getElementById("nomClient").setAttribute('disabled', true);
		}
	}

	_onChangeRepresentant(event) {
		this.props.changeForm({...this.props.formState, contrat:{...this.props.formState.contrat, idRepresentant:event.target.value}});
	}

	_sousGroupe() {
		let duplicate = false;
		if(this.props.client.facultatif.length === 0) {
			return <input
				type="textField"
				className="form-control col-sm-8"
				placeholder="Sous groupe"
				id="sousGroupe"
				disabled
			/>
		}
		else {
			return this.props.client.facultatif.map(champ => {
				if(champ.nom === 'Sous-groupe' && champ.valeur !== '' && !duplicate) {
					duplicate = true;
					return <input key={champ.idRow}
						type="textField"
						className="form-control col-sm-8"
						value={champ.valeur}
						id="sousGroupe"
						disabled
					/>
				}
				else if(champ.nom === 'Sous-groupe' && champ.valeur === '' && !duplicate) {
					duplicate = true;
					return <input key={champ.idRow}
						type="textField"
						className="form-control col-sm-8"
						value="Le client n'a pas de sous-groupe"
						id="sousGroupe"
						disabled
					/>
				}
			})
		}

	}

	_nombreEmployes() {
		let duplicate = false;
		if(this.props.client.facultatif.length === 0) {
			return <input
				type="textField"
				className="form-control col-sm-8"
				placeholder="Nombre d'employés"
				id="nbEmployes"
				disabled
			/>
		}
		else {
			return this.props.client.facultatif.map(champ => {
				if(champ.nom === 'Nombre d\'employés' && champ.valeur !== '' && !duplicate) {
					duplicate = true;
					return <input key={champ.idRow}
						type="textField"
						className="form-control col-sm-8"
						value={champ.valeur}
						id="nbEmployes"
						disabled
					/>
				}
				else if(champ.nom === 'Nombre d\'employés' && champ.valeur === '' && !duplicate) {
					duplicate = true;
					return <input key={champ.idRow}
						type="textField"
						className="form-control col-sm-8"
						value="Le nombre d'employés n'est pas précisé"
						id="nbEmployes"
						disabled
					/>
				}
			})
		}

	}

	render(){
		return <div>
			<h4>Informations sur le client</h4>
			<div className="form-group row">
				<label id="nomClientLabel" className="col-sm-3 col-form-label">Nom client</label>
					<SuggestionClients clients={this.props.clients}
									   getClient={this.props.getClient}
									   changeForm={this.props.changeForm}
									   formState={this.props.formState}
					/>
				{
					/*<input
						type="textField"
						className="form-control col-sm-8"
						placeholder="Nom client"
						id="nomClient"
					/>*/
				}

			</div>
			<div className="form-group row">
				<label id="sousGroupeLabel" className="col-sm-3 col-form-label">Sous groupe</label>
				{
					this._sousGroupe()
				}
			</div>
			<div className="form-group row">
				<label id="nbEmployesLabel" className="col-sm-3 col-form-label">Nombre d'employés</label>
				{
					this._nombreEmployes()
				}
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
						this.props.formState.employesAFC.map((employe, index) => {
							return <option key={index} value={employe.idemploye}>{employe.prenom} {employe.nom}</option>
						})
					}
				</select>
			</div>
		</div> ;
	}
}

export default (ContractClientPart);