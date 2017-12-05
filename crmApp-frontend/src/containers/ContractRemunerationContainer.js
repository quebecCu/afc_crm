import React from 'react';
import ContractInput from '../components/ContractInput';

class ContractRemunerationContainer extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return <div>
			<h4>Rémunération</h4>

			<ContractInput titre="Vie,DMA,PAC" unite="%" format="XX,X" titreChamp="vie"
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
			<ContractInput titre="Dentaire" unite="%" format="XX,X" titreChamp="dent"
						   description="Taux de commission: dentaire" part="remuneration"
						   formState={this.props.formState} changeForm={this.props.changeForm}/>
			<ContractInput titre="MG" unite="%" format="XX,X" titreChamp="mg"
						   description="Taux de commission: maladies graves" part="remuneration"
						   formState={this.props.formState} changeForm={this.props.changeForm}/>
			<ContractInput titre="PAE" unite="%" format="XX,X" titreChamp="pae"
						   description="Taux de commission: PAE" part="remuneration"
						   formState={this.props.formState} changeForm={this.props.changeForm}/>
			<ContractInput titre="Notes" unite="" format="Informations supplémentaires" titreChamp="notes"
						   description="Informations supplémentaires" part="remuneration"
						   formState={this.props.formState} changeForm={this.props.changeForm}/>
			<ContractInput titre="Reçu" unite="" format="AAAAMMJJ" titreChamp="recu"
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
			GTotal = calcul de tous les totaux précédents (demander au backend de calculer pis envoyer?)
			Conseiller = liste déroulante
			<ContractInput titre="Split" unite="%" format="XX,X" titreChamp="split"
						   description="Pourcentage payable en %"
						   formState={this.props.formState} changeForm={this.props.changeForm}/>
			<ContractInput titre="Montant dû" unite="$" format="XX XXX,XX" titreChamp="bdu"
						   description="Indiquer le montant dû"
						   formState={this.props.formState} changeForm={this.props.changeForm}/>
			<ContractInput titre="Montant payé" unite="$" format="XX XXX,XX" titreChamp="paye"
						   description="Indiquer le montant payé"
						   formState={this.props.formState} changeForm={this.props.changeForm}/>
			<ContractInput titre="Date payée" unite="" format="AAAAMMJJ" titreChamp="dpaye"
						   description="Date payée" part="remuneration"
						   formState={this.props.formState} changeForm={this.props.changeForm}/>
			Solde = calcul (montant du - montant payé)
		</div>
	}
}

export default (ContractRemunerationContainer);
