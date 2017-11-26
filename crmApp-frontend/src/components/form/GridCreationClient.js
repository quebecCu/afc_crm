import React, { Component } from 'react';
import '../../style/grid-layout.css';
import '../../style/grid-rezisable.css';
import '../../style/GridCreationClient.css';
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

export class GridCreationClient extends Component {
	constructor(props) {
		super(props);
		this._changeNomEntreprise = this._changeNomEntreprise.bind(this);
		this._changeReleve = this._changeReleve.bind(this);
		this._changeRue = this._changeRue.bind(this);
		this._changeVille = this._changeVille.bind(this);
		this._changeProvince = this._changeProvince.bind(this);
		this._changeCodePostal = this._changeCodePostal.bind(this);
		this._changeTel = this._changeTel.bind(this);
		this._changeExtension = this._changeExtension.bind(this);
		this._changeDate = this._changeDate.bind(this);
		this._changeChambreCommerce = this._changeChambreCommerce.bind(this);
		this._changeActivite = this._changeActivite.bind(this);
		this._changeEtat = this._changeEtat.bind(this);
		this._changeProvenance = this._changeProvenance.bind(this);
		this._changeProspect = this._changeProspect.bind(this);
		this._changeNotes = this._changeNotes.bind(this);
		this._changeDescription = this._changeDescription.bind(this);
		this._changeLabel = this._changeLabel.bind(this);
		this._changeType = this._changeType.bind(this);
	}

	_changeNomEntreprise(event) {
		this.props.changeRequiredFields({...this.props.requiredFields , nomEntreprise: event.target.value});
	}

	_changeReleve(event) {
		this.props.changeRequiredFields({...this.props.requiredFields , releve: event.target.value});
	}

	_changeRue(event) {
		this.props.changeRequiredFields({...this.props.requiredFields , rue: event.target.value});
	}

	_changeVille(event) {
		this.props.changeRequiredFields({...this.props.requiredFields , ville: event.target.value});
	}

	_changeProvince(event) {
		this.props.changeRequiredFields({...this.props.requiredFields , province: event.target.value});
	}

	_changeCodePostal(event) {
		this.props.changeRequiredFields({...this.props.requiredFields , codePostal: event.target.value});
	}

	_changeTel(event) {
		this.props.changeRequiredFields({...this.props.requiredFields , telephone: event.target.value});
	}

	_changeExtension(event) {
		this.props.changeRequiredFields({...this.props.requiredFields , extension: event.target.value});
	}

	_changeDate(event) {
		this.props.changeRequiredFields({...this.props.requiredFields , date: event.target.value});
	}

	_changeChambreCommerce(event) {
		this.props.changeRequiredFields({...this.props.requiredFields , chambreCommerce: event.target.value});
	}

	_changeActivite(event) {
		this.props.changeRequiredFields({...this.props.requiredFields , activite: event.target.value});
	}

	_changeEtat(event) {
		this.props.changeRequiredFields({...this.props.requiredFields , etat: event.target.value});
	}

	_changeProvenance(event) {
		this.props.changeRequiredFields({...this.props.requiredFields , provenance: event.target.value});
	}

	_changeProspect(event) {
		this.props.changeRequiredFields({...this.props.requiredFields , prospect: event.target.value});
	}

	_changeNotes(event) {
		this.props.changeRequiredFields({...this.props.requiredFields , notes: event.target.value});
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

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <form action='/' onSubmit={this.props.handleSubmit}>
					{
						// On code d'abord le formulaire obligatoire en dur
					}
					<div className="form-group row">
						<div className="col-6">
							<label htmlFor="nomEntreprise" className="control-label">Nom de l'entreprise</label>
							<input type="text" className="form-control" id="nomEntreprise" value={this.props.requiredFields.nomEntreprise}
								   name="nomEntreprise" onChange={this._changeNomEntreprise} required/>
						</div>
						<div className="col-6">
							<label className="control-label " htmlFor="releve">Relevé</label>
							<select className="form-control" id="releve" name="releve"
									onChange={this._changeReleve} value={this.props.requiredFields.releve} required>
								{
									this.props.releves.map(releve => {
										return <option key={releve.idreleve} value={releve.modeenvoiereleve}>{releve.modeenvoiereleve}</option>
									})
								}
							</select>
						</div>
					</div>
					<div className="form-group row">
						<div className="col-6">
							<label htmlFor="rue" className="control-label">Rue</label>
							<input type="text" className="form-control" id="rue" name="rue"
								   onChange={this._changeRue} value={this.props.requiredFields.rue} required/>
						</div>
						<div className="col-6">
							<label htmlFor="ville" className="control-label">Ville</label>
							<input type="text" className="form-control" id="ville" name="ville"
								   onChange={this._changeVille} value={this.props.requiredFields.ville} required/>
						</div>
					</div>
					<div className="form-group row">
						<div className="col-6">
							<label htmlFor="province" className="control-label">Province</label>
							<input type="text" className="form-control" id="province" name="province"
								   onChange={this._changeProvince} value={this.props.requiredFields.province} required/>
						</div>
						<div className="col-6">
							<label htmlFor="codePostal" className="control-label">Code Postal</label>
							<input type="text" className="form-control" id="codePostal" name="codePostal"
								   onChange={this._changeCodePostal} value={this.props.requiredFields.codePostal} required/>
						</div>
					</div>
					<div className="form-group row">
						<div className="col-6">
							<label htmlFor="telephonePrincipal" className="control-label">Téléphone principal</label>
							<input type="text" className="form-control" id="telephonePrincipal"
								   name="telephonePrincipal" onChange={this._changeTel} value={this.props.requiredFields.telephone} required/>
						</div>
						<div className="col-6">
							<label htmlFor="telephoneExtension" className="control-label">Extension du tél. principal</label>
							<input type="text" className="form-control" id="telephoneExtension"
								   name="telephoneExtension" onChange={this._changeExtension} value={this.props.requiredFields.extension} required/>
						</div>
					</div>

					<div className="form-group">
						<label htmlFor="creationDate" className="control-label">Date de création</label>
						<input type="text" className="form-control" id="creationDate" name="creationDate"
							   onChange={this._changeDate} value={this.props.requiredFields.date} required/>
					</div>
					<div className="form-group">
						<label className="control-label " htmlFor="chambreCommerce">Chambre de commerce</label>
						<select className="form-control" id="chambreCommerce" name="chambreCommerce"
								onChange={this._changeChambreCommerce} value={this.props.requiredFields.chambreCommerce} required>
							{
								this.props.chambreCommerce.map(chambre => {
									return <option value={chambre.libellechambrecommerce}>{chambre.libellechambrecommerce}</option>
								})
							}
						</select>
					</div>
					<div className="form-group">
						<label className="control-label " htmlFor="activite">Activité</label>
						<select className="form-control" id="activite" name="activite"
								onChange={this._changeActivite} value={this.props.requiredFields.activite} required>
							{
								this.props.activites.map(activite => {
									return <option value={activite.libelleactivite}>{activite.libelleactivite}</option>
								})
							}
						</select>
					</div>
					<div className="form-group">
						<label className="control-label " htmlFor="etat">Etat</label>
						<select className="form-control" id="etat" name="etat"
								onChange={this._changeEtat} value={this.props.requiredFields.etat} required>
							{
								this.props.etats.map(etat => {
									return <option value={etat.libelleetat}>{etat.libelleetat}</option>
								})
							}
						</select>
					</div>
					<div className="form-group">
						<label className="control-label " htmlFor="provenance">Provenance</label>
						<select className="form-control" id="provenance" name="provenance"
								onChange={this._changeProvenance} value={this.props.requiredFields.provenance} required>
							{
								this.props.provenances.map(provenance => {
									return <option value={provenance.libelleprovenance}>{provenance.libelleprovenance}</option>
								})
							}
						</select>
					</div>
					<div className="form-group">
						<label className="control-label " htmlFor="prospect">Prospect</label>
						<select className="form-control" id="prospect" name="prospect"
								onChange={this._changeProspect} value={this.props.requiredFields.prospect} required>
								<option value={true}>Vrai</option>
								<option value={false}>Faux</option>

						</select>
					</div>
					<div className="form-group">
						<label htmlFor="notes" className="control-label">Notes</label>
						<textarea className="form-control" id="notes" name="notes"
								  onChange={this._changeNotes} value={this.props.requiredFields.nomEntreprise} required/>
					</div>
                    <ResponsiveReactGridLayout className="layout" layouts={this.props.layouts} cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
											   breakpoints={{lg: 1000, md: 900, sm: 768, xs: 480, xxs: 0}} autoSize={true}
											   onDragStop={this.props.handleDrag} compactType={null} >
                        {
                            this.props.grid.map(element => {
                                return (
                                    <div key={element.idattrentreprise} className="form-group">
                                        <label htmlFor={element.label} className="control-label">{element.label}</label>
                                        <input type="text" name={element.idattrentreprise} id={element.idattrentreprise} className="form-control"
											   value={element.value} onChange={this.props.handleChangeInput}
											   placeholder={element.valeur_defaut}/>

										<div className="tooltipp" style={{cursor:"pointer", position: 'absolute', left: '2px', top: 0}}>
											<span className="fa fa-info"/>
											<span className="tooltipptext">{element.description}</span>
										</div>

										<span className="fa fa-pencil" style={{cursor:"pointer", position: 'absolute', right: '2px', top: 0}}
												 data-toggle="modal" data-target="#modalModifyField"/>
                                    </div>
                                );
                            })
                        }

                    </ResponsiveReactGridLayout>
					<div className="modal fade" id="modalModifyField" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
						<div className="modal-dialog" role="document">
							<div className="modal-content">
								<div className="modal-header">
									<h4 className="modal-title" id="myModalLabel">Modification du champ</h4>
									<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
								</div>
								<div className="modal-body">

										<div className="form-group">
											<label htmlFor="modificationNomChamp" className="control-label">Nouveau titre du champ</label>
											<input type="text" className="form-control" id="modificationNomChamp" name="modificationNomChamp"/>
										</div>
										<div className="form-group">
											<label htmlFor="modificationDescChamp" className="control-label">Nouvelle description du champ</label>
											<input type="text" className="form-control" id="modificationDescChamp" name="modificationDescChamp"/>
										</div>

								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-danger">Supprimer le champ</button>
									<button type="button" className="btn btn-primary">Modifier le champ</button>
								</div>
							</div>
						</div>
					</div>
					<div className="form-group">
						<input type="submit" value="Valider" className="btn btn-primary"/>
					</div>
                </form>

				<div className="form-group">
                	<button onClick={this.props.handleStatic}>Ancrer les champs</button>
                	<button onClick={this.props.handleNonStatic}>Changer la position des boutons</button>
				</div>

                <hr/>
				{
					this.props.isAdmin === true &&
					<form onSubmit={this.props.handleSubmitChamp} className="col-4 offset-4">
						<div className="form-group">
							<label htmlFor="champNom" style={{fontSize: 13}} className="control-label">Nom du nouveau champ </label>
							<input type="text" name="champNom" id="champNom"
								   className="form-control" onChange={this._changeLabel} required/>
						</div>
						<div className="form-group">
							<label htmlFor="champDescription" style={{fontSize: 13}} className="control-label">Description du nouveau champ </label>
							<input type="text" name="champDescription" id="champDescription"
								   className="form-control" onChange={this._changeDescription} required/>
						</div>
						<div className="form-group">
							<label className="control-label " htmlFor="champType">Type du nouveau champ</label>
							<select className="form-control" id="champType" name="champType" onChange={this._changeType} required>
								{
									this.props.champTypes.map(type => {
										return <option value={type.idtype}>{type.libelletype}</option>
									})
								}
							</select>
						</div>
						<div className="form-group">
							<input type="submit" value="Créer un nouveau champ" className="btn btn-primary"/>
						</div>
					</form>
				}
            </div>

        )
    }
}
