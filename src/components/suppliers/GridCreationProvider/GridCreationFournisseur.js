import React, { Component } from 'react';
import GridRequiredFormProvider from "./GridRequiredFormProvider";
import ContactsContainer from "../../contact/ContactsContainer";

export class GridCreationFournisseur extends Component {
	constructor(props) {
		super(props);
		this._changeDescription = this._changeDescription.bind(this);
		this._changeLabel = this._changeLabel.bind(this);
		this._changeType = this._changeType.bind(this);
		this._deleteField = this._deleteField.bind(this);
		this._changeNameModifyField = this._changeNameModifyField.bind(this);
		this._changeDescModifyField = this._changeDescModifyField.bind(this);
		this._changeIdModifyField = this._changeIdModifyField.bind(this);
	}
	
	_changeNameModifyField(event) {
		this.props.changeUpdateField({...this.props.formUpdateField , nameField: event.target.value});
	}

	_changeDescModifyField(event) {
		this.props.changeUpdateField({...this.props.formUpdateField , descField: event.target.value});
	}

	_changeIdModifyField(event) {
		this.props.changeUpdateField({...this.props.formUpdateField , id: event.target.value});
	}

	_changeDescription(event) {
		this.props.changeNewField({...this.props.formNewField , description: event.target.value});
	}

	_changeLabel(event) {
		this.props.changeNewField({...this.props.formNewField , label: event.target.value});
	}

	_changeType(event) {
		this.props.changeNewField({...this.props.formNewField , type: event.target.value});
	}

	_deleteField(event) {
		this.props.deleteField(event.target.value);
	}
	
    render() {
        return (
          <div>
						<h1 className="text-center">Assurances collectives</h1>
						<div className="card mb-3">
							<div className="card-header">
								<i className="fa fa-file-o"></i> {this.props.title}
							</div>
							<div className="card-body">
								<div className="text-right">
									<button className="btn btn-lg btn-success" type="submit" onClick={this.props.handleSubmit}>
										<i className="fa fa-check"/> Valider
									</button>
								</div>
								<br/>
								<div id="accordion">
									<div className="card">
										<div className="card-header" id="headingOne">
											<h5 className="mb-0">
												<button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
													Information G&eacute;n&eacute;rale
												</button>
											</h5>
										</div>

										<div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
											<div className="card-body">
												<GridRequiredFormProvider requiredFields={this.props.requiredFields}
																			changeRequiredSup={this.props.changeRequiredSup}
												/>
											</div>
										</div>
									</div>
									<div className="card">
										<div className="card-header" id="headingTwo">
											<h5 className="mb-0">
												<button className="btn btn-link" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
													Information Compl&eacute;mentaire
												</button>
											</h5>
										</div>
										<div id="collapseTwo" className="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">
											<div className="card-body">
												<div className="row">
													{
														this.props.grid.map(element => {
															return (
																<div key={element.idattrfournisseur} className="col-xs-12 col-sm-6 form-group">
																	<label htmlFor={element.label} className="control-label">{element.label}</label>
																	<br/>
																	<input type="text" name={element.label} id={element.label}
																		   className="form-control"
																		   value={element.value} onChange={this.props.handleChangeInput}
																		   placeholder={element.valeur_defaut}/>
																	<div className="tooltipp" style={{
																			cursor: "pointer",
																			position: 'absolute',
																			right: '25px',
																			top: 0
																		}}>
																		<span className="fa fa-info"/>
																		<span className="tooltipptext">{element.description}</span>
																	</div>
																	{
																		this.props.isAdmin &&
																		<span className="fa fa-pencil" style={{
																			cursor: "pointer",
																			position: 'absolute',
																			right: '2px',
																			top: 0
																		}}
																			  data-toggle="modal"
																			  data-target={"#" + element.idattrfournisseur + "modal"}/>
																	}

																</div>
															);
														})
													}
												</div>
												{
													this.props.isAdmin &&
													<div>
														{
															this.props.grid.map(element => {
																return (
																	<div className="modal fade" id={element.idattrfournisseur+"modal"} key={element.idattrfournisseur+"modal"}
																		 tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
																		<div className="modal-dialog" role="document">
																			<div className="modal-content">
																				<div className="modal-header">
																					<h4 className="modal-title" id="myModalLabel">Modification du champ : {element.label}</h4>
																					<button type="button" className="close" data-dismiss="modal" aria-label="Close">
																						<span aria-hidden="true">&times;</span>
																					</button>
																				</div>
																				<div className="modal-body">
																					<form onSubmit={this.props.handleModifyField}>
																						<div className="form-group">
																							<label htmlFor="modificationNomChamp" className="control-label">Nouveau titre du champ</label>
																							<input type="text" className="form-control" id="modificationNomChamp"
																								   name="modificationNomChamp" onChange={this._changeNameModifyField}
																								   value={this.props.formUpdateField.nameField} required/>
																						</div>
																						<div className="form-group">
																							<label htmlFor="modificationDescChamp" className="control-label">Nouvelle description du champ</label>
																							<input type="text" className="form-control" id="modificationDescChamp"
																								   name="modificationDescChamp" onChange={this._changeDescModifyField}
																								   value={this.props.formUpdateField.descField} required/>
																						</div>
																						<button type="button" className="btn btn-danger" data-dismiss="modal"
																								value={element.idattrfournisseur} onClick={this._deleteField}>Supprimer le champ</button>
																						<button type="submit" className="btn btn-primary"
																								value={element.idattrfournisseur} onClick={this._changeIdModifyField}>Modifier le champ</button>
																					</form>
																				</div>
																			</div>
																		</div>
																	</div>
																);
															})
														}
														<hr/>
														<form onSubmit={this.props.handleSubmitChamp} className="col-md-4 offset-md-4">
															<div className="form-group">
																<label htmlFor="champNom" className="control-label">Nom du nouveau champ </label>
																<input type="text" name="champNom" id="champNom"
																	   className="form-control" onChange={this._changeLabel}
																	   value={this.props.formNewField.label} required/>
															</div>
															<div className="form-group">
																<label htmlFor="champDescription" className="control-label">Description du nouveau champ </label>
																<input type="text" name="champDescription" id="champDescription"
																	   className="form-control" onChange={this._changeDescription}
																	   value={this.props.formNewField.description} required/>
															</div>
															<div className="form-group">
																<label className="control-label " htmlFor="champType">Type du nouveau champ</label>
																<select className="form-control" id="champType" name="champType"
																		onChange={this._changeType} value={this.props.formNewField.type} required>
																	{
																		this.props.champTypes.map(type => {
																			return <option key={type.idtype} value={type.idtype}>{type.libelletype}</option>
																		})
																	}
																</select>
															</div>
															<div className="form-group">
																<input type="submit" value="Créer un nouveau champ" className="btn btn-primary"/>
															</div>
														</form>
													</div>
												}
											</div>
										</div>
									</div>
									<div className="card">
										<div className="card-header" id="headingThree">
											<h5 className="mb-0">
												<button className="btn btn-link" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
													Contacts
												</button>
											</h5>
										</div>
										<div id="collapseThree" className="collapse show" aria-labelledby="headingThree" data-parent="#accordion">
											<div className="card-body">
												<ContactsContainer isSupplier="true" modification={this.props.getContacts}/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
        )
    }
}
