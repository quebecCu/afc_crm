import React from 'react';
import ContractInput from './ContractInput';

class ContractRemunerationContainer extends React.Component {
	constructor(props) {
		super(props);
		this._onChangeConseiller = this._onChangeConseiller.bind(this);

	}

	_onChangeConseiller(event, annee_dep) {
		let formState = this.props.formState;
		if (annee_dep){
			let {remuneration} = formState.contrat;
			for (let i = 0; i < formState.contrat.remuneration.length; i++){
				if (annee_dep == formState.contrat.remuneration[i].annee_dep){
					formState.contrat.remuneration[i].idconseiller = event.target.value;
				}
			}
			this.props.changeForm({
				...formState,
				contrat: {
					...formState.contrat,
					remuneration: remuneration
				}
			})
		}else{
			let {remunerationToAdd} = formState;
			this.props.changeForm({
				...formState,
				remunerationToAdd: remunerationToAdd
			})
		}
	}

	render() {
		return <div>
			<div className="container">
				<ul className="nav nav-tabs" id="tabRemuneration" role="tablist">
					{
						this.props.formState.contrat.remuneration &&
						this.props.formState.contrat.remuneration.map((singleRemuneration, index) => {
							return (
								<li className="nav-item" key={index}>
									<a className="nav-link" id={singleRemuneration.annee_dep + "-remuneration-tab"} data-toggle="tab" href={"#remuneration-" + singleRemuneration.annee_dep} role="tab" aria-controls={"remuneration" + singleRemuneration.annee_dep} aria-selected="true">{singleRemuneration.annee_dep}</a>
								</li>
							)
						})
					}
					<li className="nav-item">
						<a className="nav-link" id="new-remuneration-tab" data-toggle="tab" href="#remuneration-new" role="tab" aria-controls="remuneration-new" aria-selected="true">
							<span className="fa-stack">
								<i className="fa fa-square fa-stack-2x"></i>
								<i className="fa fa-plus fa-stack-1x fa-inverse"></i>
							</span>
						</a>
					</li>
				</ul>
				<div className="tab-content" id="tabRemunerationContent">
				{
					this.props.formState.contrat.remuneration &&
					this.props.formState.contrat.remuneration.map((singleRemuneration, index) => {
						return (
							<div key={index} className="tab-pane fade show" id={"remuneration-" + singleRemuneration.annee_dep} role="tabpanel" aria-labelledby={singleRemuneration.annee_dep + "-remuneration-tab"}>
								<div className="row justify-content-md-center">
									<ContractInput titre="Année de départ" unite="" format="AAAA" titreChamp="annee_dep"
												   description="Année de départ" part="remuneration" idRemuneration={index} disabled
												   formState={this.props.formState} changeForm={this.props.changeForm}/>
									<ContractInput titre="Année de fin" unite="" format="AAAA" titreChamp="annee_fin"
												   description="Année de départ" part="remuneration" idRemuneration={index} disabled
												   formState={this.props.formState} changeForm={this.props.changeForm}/>
								</div>
								<div className="row">
									<div className="col-xs-12 col-sm-6 col-md-4">
										<ContractInput titre="Vie,DMA,PAC" unite="%" format="XX,X" titreChamp="vie_dma_pac"
													   description="Taux de commission: Vie, DMA, PAC" part="remuneration" idRemuneration={index}
													   formState={this.props.formState} changeForm={this.props.changeForm}/>
										<ContractInput titre="CT" unite="%" format="XX,X" titreChamp="ct"
													   description="Taux de commission: invalidité de courte durée" part="remuneration" idRemuneration={index}
													   formState={this.props.formState} changeForm={this.props.changeForm}/>
										<ContractInput titre="LT" unite="%" format="XX,X" titreChamp="lt"
													   description="Taux de commission: invalidité de longue durée" part="remuneration" idRemuneration={index}
													   formState={this.props.formState} changeForm={this.props.changeForm}/>
										<ContractInput titre="AMC" unite="%" format="XX,X" titreChamp="amc"
													   description="Taux de commission: AMC" part="remuneration" idRemuneration={index}
													   formState={this.props.formState} changeForm={this.props.changeForm}/>
										<ContractInput titre="Dentaire" unite="%" format="XX,X" titreChamp="dentaire"
													   description="Taux de commission: dentaire" part="remuneration" idRemuneration={index}
													   formState={this.props.formState} changeForm={this.props.changeForm}/>
										<ContractInput titre="MG" unite="%" format="XX,X" titreChamp="mg"
													   description="Taux de commission: maladies graves" part="remuneration" idRemuneration={index}
													   formState={this.props.formState} changeForm={this.props.changeForm}/>
									</div>
									<br/>
									<div className="col-xs-12 col-sm-6 col-md-4">

										<ContractInput titre="PAE" unite="%" format="XX,X" titreChamp="pae"
													   description="Taux de commission: PAE" part="remuneration" idRemuneration={index}
													   formState={this.props.formState} changeForm={this.props.changeForm}/>
										<ContractInput titre="Reçu" unite="" format="AAAA-MM-JJ" titreChamp="recu"
													   description="Date payée: base" part="remuneration" idRemuneration={index}
													   formState={this.props.formState} changeForm={this.props.changeForm}/>
										<ContractInput titre="Base" unite="$" format="XXX XXX,XX" titreChamp="base"
													   description="Montant payé: base" part="remuneration" idRemuneration={index}
													   formState={this.props.formState} changeForm={this.props.changeForm}/>
										<ContractInput titre="Boni" unite="$" format="XXX XXX,XX" titreChamp="boni"
													   description="Montant payé: boni" part="remuneration" idRemuneration={index}
													   formState={this.props.formState} changeForm={this.props.changeForm}/>
										<ContractInput titre="Total" unite="$" format="XXX XXX,XX" titreChamp="total"
													   description="Rémunération totale" part="remuneration" idRemuneration={index}
													   formState={this.props.formState} changeForm={this.props.changeForm}/>
										<ContractInput titre="Grand total" unite="$" format="XXX XXX,XX" titreChamp="gtotal" disabled={true}
													   description="Rémunération totale" part="remuneration" idRemuneration={index}
													   formState={this.props.formState} changeForm={this.props.changeForm}/>
									</div>
									<br/>
									<div className="col-xs-12 col-sm-6 col-md-4">
										<div>
											<div>
												<label id="representantLabel" className="col-form-label">Conseiller</label>
											</div>
											<div>
												<select
													id="conseiller"
													name="conseiller"
													className="form-control"
													value={singleRemuneration.idconseiller}
													onChange={(e) => this._onChangeConseiller(e, singleRemuneration.annee_dep)}
												>
													<option disabled selected value=""> -- Veuillez sélectionner une valeur --</option>
													{
														this.props.formState.employesAFC &&
														this.props.formState.employesAFC.map((employe, index) => {
															return <option key={index}
																		   value={employe.idemploye}>{employe.prenom} {employe.nom}</option>
														})
													}
												</select>
											</div>
										</div>
										<ContractInput titre="Split" unite="%" format="XX,X" titreChamp="split"
													   description="Pourcentage payable en %" idRemuneration={index}
													   formState={this.props.formState} changeForm={this.props.changeForm}/>
										<ContractInput titre="Montant dû" unite="$" format="XX XXX,XX" titreChamp="bdu"
													   description="Indiquer le montant dû" idRemuneration={index}
													   formState={this.props.formState} changeForm={this.props.changeForm}/>
										<ContractInput titre="Montant payé" unite="$" format="XX XXX,XX" titreChamp="paye"
													   description="Indiquer le montant payé" idRemuneration={index}
													   formState={this.props.formState} changeForm={this.props.changeForm}/>
										<ContractInput titre="Date payée" unite="" format="AAAA-MM-JJ" titreChamp="dpaye"
													   description="Date payée" part="remuneration" idRemuneration={index}
													   formState={this.props.formState} changeForm={this.props.changeForm}/>
										<ContractInput titre="Solde" unite="$" format="" titreChamp="solde" disabled={true}
													   description="Montant dû - montant payé" part="remuneration" idRemuneration={index}
													   formState={this.props.formState} changeForm={this.props.changeForm}/>
									</div>
								</div>
								<ContractInput titre="Notes" unite="" format="Informations supplémentaires" titreChamp="notes"
											   description="Informations supplémentaires" part="remuneration" idRemuneration={index}
											   formState={this.props.formState} changeForm={this.props.changeForm}/>
							</div>
				 		)
					})
				}
					<div className="tab-pane fade show" id="remuneration-new" role="tabpanel" aria-labelledby="new-remuneration-tab">
						<div className="row justify-content-md-center">
							<ContractInput titre="Année de départ" unite="" format="AAAA" titreChamp="annee_dep"
										description="Année de départ" part="remuneration"
										formState={this.props.formState} changeForm={this.props.changeForm}/>
							<ContractInput titre="Année de fin" unite="" format="AAAA" titreChamp="annee_fin"
										description="Année de départ" part="remuneration"
										formState={this.props.formState} changeForm={this.props.changeForm}/>
						</div>
						<div className="row">
							<div className="col-xs-12 col-sm-6 col-md-4">
								<ContractInput titre="Vie,DMA,PAC" unite="%" format="XX,X" titreChamp="vie_dma_pac"
												 description="Taux de commission: Vie, DMA, PAC" part="remuneration"
												 formState={this.props.formState} changeForm={this.props.changeForm}/>
								<ContractInput titre="CT" unite="%" format="XX,X" titreChamp="ct"
												 description="Taux de commission: invalidité de courte durée" part="remuneration"
												 formState={this.props.formState} changeForm={this.props.changeForm}/>
								<ContractInput titre="LT" unite="%" format="XX,X" titreChamp="lt"
												 description="Taux de commission: invalidité de longue durée" part="remuneration"
												 formState={this.props.formState} changeForm={this.props.changeForm}/>
								<ContractInput titre="AMC" unite="%" format="XX,X" titreChamp="amc"
												 description="Taux de commission: AMC" part="remuneration"
												 formState={this.props.formState} changeForm={this.props.changeForm}/>
								<ContractInput titre="Dentaire" unite="%" format="XX,X" titreChamp="dentaire"
												 description="Taux de commission: dentaire" part="remuneration"
												 formState={this.props.formState} changeForm={this.props.changeForm}/>
								<ContractInput titre="MG" unite="%" format="XX,X" titreChamp="mg"
												 description="Taux de commission: maladies graves" part="remuneration"
												 formState={this.props.formState} changeForm={this.props.changeForm}/>
							</div>
							<br/>
							<div className="col-xs-12 col-sm-6 col-md-4">

								<ContractInput titre="PAE" unite="%" format="XX,X" titreChamp="pae"
												 description="Taux de commission: PAE" part="remuneration"
												 formState={this.props.formState} changeForm={this.props.changeForm}/>
								<ContractInput titre="Reçu" unite="" format="AAAA-MM-JJ" titreChamp="recu"
												 description="Date payée: base" part="remuneration"
												 formState={this.props.formState} changeForm={this.props.changeForm}/>
								<ContractInput titre="Base" unite="$" format="XXX XXX,XX" titreChamp="base"
												 description="Montant payé: base" part="remuneration"
												 formState={this.props.formState} changeForm={this.props.changeForm}/>
								<ContractInput titre="Boni" unite="$" format="XXX XXX,XX" titreChamp="boni"
												 description="Montant payé: boni" part="remuneration"
												 formState={this.props.formState} changeForm={this.props.changeForm}/>
								<ContractInput titre="Total" unite="$" format="XXX XXX,XX" titreChamp="total"
												 description="Rémunération totale" part="remuneration"
												 formState={this.props.formState} changeForm={this.props.changeForm}/>
								<ContractInput titre="Grand total" unite="$" format="XXX XXX,XX" titreChamp="gtotal" disabled={true}
												 description="Rémunération totale" part="remuneration"
												 formState={this.props.formState} changeForm={this.props.changeForm}/>
							</div>
							<br/>
							<div className="col-xs-12 col-sm-6 col-md-4">
								<div>
									<div>
										<label id="representantLabel" className="col-form-label">Conseiller</label>
									</div>
									<div>
										<select
											id="conseiller"
											name="conseiller"
											className="form-control"
											value={this.props.formState.remunerationToAdd.idconseiller}
											onChange={this._onChangeConseiller}
										>
											<option disabled selected value=""> -- Veuillez sélectionner une valeur --</option>
											{
												this.props.formState.employesAFC &&
												this.props.formState.employesAFC.map((employe, index) => {
													return <option key={index}
																	 value={employe.idemploye}>{employe.prenom} {employe.nom}</option>
												})
											}
										</select>
									</div>
								</div>
								<ContractInput titre="Split" unite="%" format="XX,X" titreChamp="split"
												 description="Pourcentage payable en %"
												 formState={this.props.formState} changeForm={this.props.changeForm}/>
								<ContractInput titre="Montant dû" unite="$" format="XX XXX,XX" titreChamp="bdu"
												 description="Indiquer le montant dû"
												 formState={this.props.formState} changeForm={this.props.changeForm}/>
								<ContractInput titre="Montant payé" unite="$" format="XX XXX,XX" titreChamp="paye"
												 description="Indiquer le montant payé"
												 formState={this.props.formState} changeForm={this.props.changeForm}/>
								<ContractInput titre="Date payée" unite="" format="AAAA-MM-JJ" titreChamp="dpaye"
												 description="Date payée" part="remuneration"
												 formState={this.props.formState} changeForm={this.props.changeForm}/>
								<ContractInput titre="Solde" unite="$" format="" titreChamp="solde" disabled={true}
												 description="Montant dû - montant payé" part="remuneration"
												 formState={this.props.formState} changeForm={this.props.changeForm}/>
							</div>
						</div>
						<ContractInput titre="Notes" unite="" format="Informations supplémentaires" titreChamp="notes"
										 description="Informations supplémentaires" part="remuneration"
										 formState={this.props.formState} changeForm={this.props.changeForm}/>
					</div>
				</div>
			</div>
		</div>
	}
}

export default (ContractRemunerationContainer);
