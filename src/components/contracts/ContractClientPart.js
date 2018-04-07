import React from 'react';
import SuggestionClients from "./SuggestionClients";

class ContractClientPart extends React.Component {
	constructor(props) {
		super(props);
		this._onChangeRepresentant = this._onChangeRepresentant.bind(this);
		this._filterClients = this._filterClients.bind(this);

		if(this.props.fromClient.idClient && !this.props.fromClient.update) {
			this.props.changeForm({...this.props.formState, contrat:{...this.props.formState.contrat, idClient:this.props.fromClient.idClient}});
		}
	}

	_onChangeRepresentant(event) {
		this.props.changeForm({
			...this.props.formState,
			contrat: {...this.props.formState.contrat, idRepresentant: event.target.value}
		});
	}

	_filterClients() {
		return this.props.clients.filter( (element, index) => {
			let duplicate = false;
			this.props.clients.forEach((element2, index2)=> {
				if(element.id === element2.id && index > index2) {
					duplicate = true;
				}
			});
			return !duplicate;
		});
	}

	render() {
		return (
			<div>
				<h5>Informations sur le client</h5>
				<br/>
				<div className="form-group">
					<label id="nomClientLabel" className="col-form-label">Nom client</label>
					<br/>
					<div>
						{
							!this.props.fromClient.idClient &&

							<SuggestionClients clients={this._filterClients()}
											   getClient={this.props.getClient}
											   changeForm={this.props.changeForm}
											   formState={this.props.formState}
							/>
						}
						{
							this.props.fromClient.idClient && this.props.fromClient.update &&
							<SuggestionClients clients={this._filterClients()}
											   getClient={this.props.getClient}
											   client={this.props.fromClient}
											   changeForm={this.props.changeForm}
											   formState={this.props.formState}
							/>
						}
						{
							this.props.fromClient.idClient && !this.props.fromClient.update &&
							<input type="textField"
								   className="form-control col-sm-8"
								   value={this.props.fromClient.name}
								   id="nomClient"
								   disabled
							/>
						}
					</div>
				</div>
				<div className="form-group">
					<label id="representantLabel" className="col-form-label">Représentant (chez AFC)</label>
					<br/>
					<select
						id="representant"
						name="representant"
						className="form-control"
						value={this.props.formState.contrat.idRepresentant}
						onChange={this._onChangeRepresentant}
					>
						<option disabled value=""> -- Veuillez sélectionner une valeur --</option>
						{
							this.props.formState.employesAFC &&
							this.props.formState.employesAFC.map((employe, index) => {
								return <option key={index} value={employe.idemploye}>{employe.prenom} {employe.nom}</option>
							})
						}
					</select>
				</div>
			</div>
		);
	}
}

export default (ContractClientPart);
