import React from 'react';
import ContractInput from './ContractInput';

class ContractTauxContainer extends React.Component{

	render(){
		return <div>
			<div className="container">
				<ul className="nav nav-tabs" id="tabTaux" role="tablist">
					{
						this.props.formState.contrat.historiqueTaux &&
						this.props.formState.contrat.historiqueTaux.map((historique, index) => {
							return (
								<li className="nav-item" key={index}>
									<a className="nav-link" id={historique.annee_dep + "-taux-tab"} data-toggle="tab" href={"#taux-" + historique.annee_dep} role="tab" aria-controls={"taux" + historique.annee_dep} aria-selected="true">{historique.annee_dep}</a>
								</li>
							)
						})
					}
					<li className="nav-item" onClick={this.addHistorique}>
						<a className="nav-link" id="new-taux-tab" data-toggle="tab" href="#taux-new" role="tab" aria-controls="taux-new" aria-selected="true">
							<span className="fa-stack">
							  <i className="fa fa-square fa-stack-2x"></i>
							  <i className="fa fa-plus fa-stack-1x fa-inverse"></i>
							</span>
						</a>
					</li>
				</ul>
				<div className="tab-content" id="tabTauxContent">
				{
					this.props.formState.contrat.historiqueTaux &&
					this.props.formState.contrat.historiqueTaux.map((historique, index) => {
						return (
							<div key={index} className="tab-pane fade show" id={"taux-" + historique.annee_dep} role="tabpanel" aria-labelledby={historique.annee_dep + "-taux-tab"}>
								<div className="row justify-content-md-center">
									<ContractInput titre="Année de départ" unite="" format="AAAA" titreChamp="annee_dep"
												   description="Année de départ" part="taux" idHistorique={index} disabled
												   formState={this.props.formState} changeForm={this.props.changeForm}/>
									<ContractInput titre="Année de fin" unite="" format="AAAA" titreChamp="annee_fin"
												   description="Année de départ" part="taux" idHistorique={index} disabled
												   formState={this.props.formState} changeForm={this.props.changeForm}/>
								</div>
								<div className="row">
									<div className="col-xs-12 col-sm-6 col-md-4">
										<ContractInput titre="Différence" unite="%" format="XX.X" titreChamp="diff"
													   description="Augmentation/diminution de prime en %" part="taux" idHistorique={index}
													   formState={this.props.formState} changeForm={this.props.changeForm}/>
										<ContractInput titre="PAC" unite="$" format="XX XXX.XX" titreChamp="pac"
													   description="Assurance vie des personnes à charge" part="taux" idHistorique={index}
													   formState={this.props.formState} changeForm={this.props.changeForm}/>
										<ContractInput titre="AMC Ind." unite="$" format="X XXX.XX" titreChamp="amc_ind"
													   description="Assurance maladie complémentaire individuelle" part="taux" idHistorique={index}
													   formState={this.props.formState} changeForm={this.props.changeForm}/>
										<ContractInput titre="AMC Mono." unite="$" format="X XXX.XX" titreChamp="amc_mono"
													   description="Assurance maladie complémentaire monoparentale" part="taux" idHistorique={index}
													   formState={this.props.formState} changeForm={this.props.changeForm}/>
										<ContractInput titre="AMC Couple" unite="$" format="X XXX.XX" titreChamp="amc_couple"
													   description="Assurance maladie complémentaire couple" part="taux" idHistorique={index}
													   formState={this.props.formState} changeForm={this.props.changeForm}/>
										<ContractInput titre="AMC Fam." unite="$" format="X XXX.XX" titreChamp="amc_fam"
													   description="Assurance maladie complémentaire familiale" part="taux" idHistorique={index}
													   formState={this.props.formState} changeForm={this.props.changeForm}/>
										<ContractInput titre="PAE" unite="$" format="X XXX.XX" titreChamp="pae"
													   description="Programme d'aide aux employés" part="taux" idHistorique={index}
													   formState={this.props.formState} changeForm={this.props.changeForm}/>
									</div>
									<div className="col-xs-12 col-sm-6 col-md-4">
										<ContractInput titre="Vie" unite="$" format="X XXX.XX" titreChamp="vie"
													   description="Assurance vie de l'employé" part="taux" idHistorique={index}
													   formState={this.props.formState} changeForm={this.props.changeForm}/>
										<ContractInput titre="CT" unite="$" format="XX XXX.XX" titreChamp="ct"
													   description="Assurance invalidité de courte durée" part="taux" idHistorique={index}
													   formState={this.props.formState} changeForm={this.props.changeForm}/>
										<ContractInput titre="Dentaire Ind." unite="$" format="X XXX.XX" titreChamp="dent_ind"
													   description="Soins dentaires individuelle" part="taux" idHistorique={index}
													   formState={this.props.formState} changeForm={this.props.changeForm}/>
										<ContractInput titre="Dentaire Mono." unite="$" format="X XXX.XX" titreChamp="dent_mono"
													   description="Soins dentaires monoparentale" part="taux" idHistorique={index}
													   formState={this.props.formState} changeForm={this.props.changeForm}/>
										<ContractInput titre="Dentaire Couple" unite="$" format="X XXX.XX" titreChamp="dent_couple"
													   description="Soins dentaires couple" part="taux" idHistorique={index}
													   formState={this.props.formState} changeForm={this.props.changeForm}/>
										<ContractInput titre="Dentaire Fam." unite="$" format="X XXX.XX" titreChamp="dent_fam"
													   description="Soins dentaires familiale" part="taux" idHistorique={index}
													   formState={this.props.formState} changeForm={this.props.changeForm}/>
										<ContractInput titre="Prime mensuelle" unite="$" format="X XXX.XX" titreChamp="prime_ms"
													   description="Indiquer la prime mensuelle" part="taux" idHistorique={index}
													   formState={this.props.formState} changeForm={this.props.changeForm}/>
									</div>
									<div className="col-xs-12 col-sm-6 col-md-4">
										<ContractInput titre="DMA" unite="$" format="X XXX.XX" titreChamp="dma"
													   description="Décès et perte de membres accidentel" part="taux" idHistorique={index}
													   formState={this.props.formState} changeForm={this.props.changeForm}/>
										<ContractInput titre="LT" unite="$" format="XX XXX.XX" titreChamp="lt"
													   description="Assurance invalidité de longue durée" part="taux" idHistorique={index}
													   formState={this.props.formState} changeForm={this.props.changeForm}/>
										<ContractInput titre="MG Ind." unite="$" format="X XXX.XX" titreChamp="mg_ind"
													   description="Assurance maladies graves individuelle" part="taux" idHistorique={index}
													   formState={this.props.formState} changeForm={this.props.changeForm}/>
										<ContractInput titre="MG Mono." unite="$" format="X XXX.XX" titreChamp="mg_mono"
													   description="Assurance maladies graves monoparentale" part="taux" idHistorique={index}
													   formState={this.props.formState} changeForm={this.props.changeForm}/>
										<ContractInput titre="MG Couple" unite="$" format="X XXX.XX" titreChamp="mg_couple"
													   description="Assurance maladies graves couple" part="taux" idHistorique={index}
													   formState={this.props.formState} changeForm={this.props.changeForm}/>
										<ContractInput titre="MG Fam." unite="$" format="X XXX.XX" titreChamp="mg_fam"
													   description="Assurance maladies graves familiale" part="taux" idHistorique={index}
													   formState={this.props.formState} changeForm={this.props.changeForm}/>
										<ContractInput titre="Prime annuelle" unite="$" format="X XXX.XX" titreChamp="prime_an"
													   description="Prime mensuelle *12" part="taux" idHistorique={index} disabled={true}
													   formState={this.props.formState} changeForm={this.props.changeForm}/>
									</div>
								</div>
							</div>
						)
					})
				}
					<div className="tab-pane fade show" id="taux-new" role="tabpanel" aria-labelledby="new-taux-tab">
						<div className="row justify-content-md-center">
							<ContractInput titre="Année de départ" unite="" format="AAAA" titreChamp="annee_dep"
											 description="Année de départ" part="taux"
											 formState={this.props.formState} changeForm={this.props.changeForm}/>
							<ContractInput titre="Année de fin" unite="" format="AAAA" titreChamp="annee_fin"
											 description="Année de départ" part="taux"
											 formState={this.props.formState} changeForm={this.props.changeForm}/>
						</div>
						<div className="row">
							<div className="col-xs-12 col-sm-6 col-md-4">
								<ContractInput titre="Différence" unite="%" format="XX.X" titreChamp="diff"
												 description="Augmentation/diminution de prime en %" part="taux"
												 formState={this.props.formState} changeForm={this.props.changeForm}/>
								<ContractInput titre="PAC" unite="$" format="XX XXX.XX" titreChamp="pac"
												 description="Assurance vie des personnes à charge" part="taux"
												 formState={this.props.formState} changeForm={this.props.changeForm}/>
								<ContractInput titre="AMC Ind." unite="$" format="X XXX.XX" titreChamp="amc_ind"
												 description="Assurance maladie complémentaire individuelle" part="taux"
												 formState={this.props.formState} changeForm={this.props.changeForm}/>
								<ContractInput titre="AMC Mono." unite="$" format="X XXX.XX" titreChamp="amc_mono"
												 description="Assurance maladie complémentaire monoparentale" part="taux"
												 formState={this.props.formState} changeForm={this.props.changeForm}/>
								<ContractInput titre="AMC Couple" unite="$" format="X XXX.XX" titreChamp="amc_couple"
												 description="Assurance maladie complémentaire couple" part="taux"
												 formState={this.props.formState} changeForm={this.props.changeForm}/>
								<ContractInput titre="AMC Fam." unite="$" format="X XXX.XX" titreChamp="amc_fam"
												 description="Assurance maladie complémentaire familiale" part="taux"
												 formState={this.props.formState} changeForm={this.props.changeForm}/>
								<ContractInput titre="PAE" unite="$" format="X XXX.XX" titreChamp="pae"
												 description="Programme d'aide aux employés" part="taux"
												 formState={this.props.formState} changeForm={this.props.changeForm}/>
							</div>
							<div className="col-xs-12 col-sm-6 col-md-4">
								<ContractInput titre="Vie" unite="$" format="X XXX.XX" titreChamp="vie"
												 description="Assurance vie de l'employé" part="taux"
												 formState={this.props.formState} changeForm={this.props.changeForm}/>
								<ContractInput titre="CT" unite="$" format="XX XXX.XX" titreChamp="ct"
												 description="Assurance invalidité de courte durée" part="taux"
												 formState={this.props.formState} changeForm={this.props.changeForm}/>
								<ContractInput titre="Dentaire Ind." unite="$" format="X XXX.XX" titreChamp="dent_ind"
												 description="Soins dentaires individuelle" part="taux"
												 formState={this.props.formState} changeForm={this.props.changeForm}/>
								<ContractInput titre="Dentaire Mono." unite="$" format="X XXX.XX" titreChamp="dent_mono"
												 description="Soins dentaires monoparentale" part="taux"
												 formState={this.props.formState} changeForm={this.props.changeForm}/>
								<ContractInput titre="Dentaire Couple" unite="$" format="X XXX.XX" titreChamp="dent_couple"
												 description="Soins dentaires couple" part="taux"
												 formState={this.props.formState} changeForm={this.props.changeForm}/>
								<ContractInput titre="Dentaire Fam." unite="$" format="X XXX.XX" titreChamp="dent_fam"
												 description="Soins dentaires familiale" part="taux"
												 formState={this.props.formState} changeForm={this.props.changeForm}/>
								<ContractInput titre="Prime mensuelle" unite="$" format="X XXX.XX" titreChamp="prime_ms"
												 description="Indiquer la prime mensuelle" part="taux"
												 formState={this.props.formState} changeForm={this.props.changeForm}/>
							</div>
							<div className="col-xs-12 col-sm-6 col-md-4">
								<ContractInput titre="DMA" unite="$" format="X XXX.XX" titreChamp="dma"
												 description="Décès et perte de membres accidentel" part="taux"
												 formState={this.props.formState} changeForm={this.props.changeForm}/>
								<ContractInput titre="LT" unite="$" format="XX XXX.XX" titreChamp="lt"
												 description="Assurance invalidité de longue durée" part="taux"
												 formState={this.props.formState} changeForm={this.props.changeForm}/>
								<ContractInput titre="MG Ind." unite="$" format="X XXX.XX" titreChamp="mg_ind"
												 description="Assurance maladies graves individuelle" part="taux"
												 formState={this.props.formState} changeForm={this.props.changeForm}/>
								<ContractInput titre="MG Mono." unite="$" format="X XXX.XX" titreChamp="mg_mono"
												 description="Assurance maladies graves monoparentale" part="taux"
												 formState={this.props.formState} changeForm={this.props.changeForm}/>
								<ContractInput titre="MG Couple" unite="$" format="X XXX.XX" titreChamp="mg_couple"
												 description="Assurance maladies graves couple" part="taux"
												 formState={this.props.formState} changeForm={this.props.changeForm}/>
								<ContractInput titre="MG Fam." unite="$" format="X XXX.XX" titreChamp="mg_fam"
												 description="Assurance maladies graves familiale" part="taux"
												 formState={this.props.formState} changeForm={this.props.changeForm}/>
								<ContractInput titre="Prime annuelle" unite="$" format="X XXX.XX" titreChamp="prime_an"
												 description="Prime mensuelle *12" part="taux" disabled={true}
												 formState={this.props.formState} changeForm={this.props.changeForm}/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>;

	}
}

export default (ContractTauxContainer);
