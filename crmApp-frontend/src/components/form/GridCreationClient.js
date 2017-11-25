import React, { Component } from 'react';
import '../../style/grid-layout.css';
import '../../style/grid-rezisable.css';
import '../../style/GridCreationClient.css';
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

export class GridCreationClient extends Component {

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
							<input type="text" className="form-control" id="nomEntreprise" name="nomEntreprise" required/>
						</div>
						<div className="col-6">
							<label className="control-label " htmlFor="releve">Relevé</label>
							<select className="form-control" id="releve" name="releve" required>
								{
									this.props.releves.map(releve => {
										return <option value={releve.value}>{releve.label}</option>
									})
								}
							</select>
						</div>
					</div>
					<div className="form-group row">
						<div className="col-6">
							<label htmlFor="rue" className="control-label">Rue</label>
							<input type="text" className="form-control" id="rue" name="rue" required/>
						</div>
						<div className="col-6">
							<label htmlFor="ville" className="control-label">Ville</label>
							<input type="text" className="form-control" id="ville" name="ville" required/>
						</div>
					</div>
					<div className="form-group row">
						<div className="col-6">
							<label htmlFor="province" className="control-label">Province</label>
							<input type="text" className="form-control" id="province" name="province" required/>
						</div>
						<div className="col-6">
							<label htmlFor="codePostal" className="control-label">Code Postal</label>
							<input type="text" className="form-control" id="codePostal" name="codePostal" required/>
						</div>
					</div>
					<div className="form-group row">
						<div className="col-6">
							<label htmlFor="telephonePrincipal" className="control-label">Téléphone principal</label>
							<input type="text" className="form-control" id="telephonePrincipal" name="telephonePrincipal" required/>
						</div>
						<div className="col-6">
							<label htmlFor="telephoneExtension" className="control-label">Extension du tél. principal</label>
							<input type="text" className="form-control" id="telephoneExtension" name="telephoneExtension" required/>
						</div>
					</div>

					<div className="form-group">
						<label htmlFor="creationDate" className="control-label">Date de création</label>
						<input type="text" className="form-control" id="creationDate" name="creationDate" required/>
					</div>
					<div className="form-group">
						<label className="control-label " htmlFor="chambreCommerce">Chambre de commerce</label>
						<select className="form-control" id="chambreCommerce" name="chambreCommerce" required>
							{
								this.props.chambreCommerce.map(chambre => {
									return <option value={chambre.value}>{chambre.label}</option>
								})
							}
						</select>
					</div>
					<div className="form-group">
						<label className="control-label " htmlFor="activite">Activité</label>
						<select className="form-control" id="activite" name="activite" required>
							{
								this.props.activites.map(activite => {
									return <option value={activite.value}>{activite.label}</option>
								})
							}
						</select>
					</div>
					<div className="form-group">
						<label className="control-label " htmlFor="etat">Etat</label>
						<select className="form-control" id="etat" name="etat" required>
							{
								this.props.etats.map(etat => {
									return <option value={etat.value}>{etat.label}</option>
								})
							}
						</select>
					</div>
					<div className="form-group">
						<label className="control-label " htmlFor="provenance">Provenance</label>
						<select className="form-control" id="provenance" name="provenance" required>
							{
								this.props.provenances.map(provenance => {
									return <option value={provenance.value}>{provenance.label}</option>
								})
							}
						</select>
					</div>
					<div className="form-group">
						<label className="control-label " htmlFor="prospect">Prospect</label>
						<select className="form-control" id="prospect" name="prospect" required>
								<option value={true}>Vrai</option>
								<option value={false}>Faux</option>

						</select>
					</div>
					<div className="form-group">
						<label htmlFor="notes" className="control-label">Notes</label>
						<textarea className="form-control" id="notes" name="notes" required/>
					</div>
                    <ResponsiveReactGridLayout className="layout" layouts={this.props.layouts} cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
											   breakpoints={{lg: 1000, md: 900, sm: 768, xs: 480, xxs: 0}} autoSize={true}
											   onDragStop={this.props.handleDrag} compactType={null} >
                        {
                            this.props.grid.map(element => {
                                return (
                                    <div key={element.key} className="form-group">
                                        <label htmlFor={element.label} className="control-label">{element.nom}</label>
                                        <input type="text" name={element.label} id={element.label} className="form-control"
											   value={element.value} onChange={this.props.handleChangeInput} placeholder={element.description}/>
                                    </div>
                                );
                            })
                        }

                    </ResponsiveReactGridLayout>
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
							<input type="text" name="champNom" id="champNom" className="form-control" required/>
						</div>
						<div className="form-group">
							<label htmlFor="champDescription" style={{fontSize: 13}} className="control-label">Description du nouveau champ </label>
							<input type="text" name="champDescription" id="champDescription" className="form-control"/>
						</div>
						<div className="form-group">
							<label className="control-label " htmlFor="champType">Type du nouveau champ</label>
							<select className="form-control" id="champType" name="champType" required>
								{
									this.props.champTypes.map(type => {
										return <option value={type.value}>{type.label}</option>
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
