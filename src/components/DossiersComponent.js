import React, {Component} from 'react';
import {withRouter} from 'react-router';

class DossiersComponent extends Component {

	handleClick(dossier, event) {
		console.log("wazzah")
	}

	handleClickClient(match, history, client) {
		history.push(match.url + "/" + client.id);
	}

	handleClickSupplier(match, history, supplier) {
		history.push(match.url + "/" + supplier.id);
	}

	componentDidUpdate() {
		/*let inputNumeroPolice, inputNomEmploye, inputNomAssureur, inputNomEntreprise, inputMoisRenouvellement,
			inputSelectedStatut,
			inputProspect;*/
		let	table, tr, td0, td1, td2, td3, i;
		if (document.getElementById("numeroPolice")) {

			/*inputNumeroPolice = document.getElementById("numeroPolice").value.toUpperCase();
			inputNomEmploye = document.getElementById("nomEmploye").value.toUpperCase();
			inputNomAssureur = document.getElementById("nomAssureur").value.toUpperCase();
			inputNomEntreprise = document.getElementById("nomEntreprise").value.toUpperCase();
			inputMoisRenouvellement = document.getElementById("moisRenouvellement").value.toUpperCase();
			inputSelectedStatut = document.getElementById("selectedStatut").value.toUpperCase();
			inputProspect = document.getElementById("prospects").value.toUpperCase();   */

			table = document.getElementById("PageCollectivesClientsTable");
			tr = table.getElementsByClassName("customer");
			// Loop through all table rows, and hide those who don't match the search query
			for (i = 0; i < tr.length; i++) {
				td0 = tr[i].getElementsByTagName("td")[0];
				td1 = tr[i].getElementsByTagName("td")[1];
				td2 = tr[i].getElementsByTagName("td")[2];
				td3 = tr[i].getElementsByTagName("td")[3];
				if (td0 || td1 || td2 || td3) {
					if (td2.innerHTML.toUpperCase().indexOf("ACTIF") > -1) {
						tr[i].style.display = "";
					} else {
						tr[i].style.display = "none";
					}
				}
			}
		}
	}

	render() {
		const { match, history } = this.props;
		if (this.props.historique) {
			this.rows = (
				<tbody>
				{this.props.historique.map(element => {
					return (
						<tr onClick={this.handleClick.bind(this)} key={element.nom}>
							<td>{element.date}</td>
							<td>{element.nom}</td>
							<td>{element.type}</td>
						</tr>
					);
				})}
				</tbody>
			);
		} else if (this.props.collective) {
			this.rows = (
				<tbody>
				{this.props.collective.map((element, index) => {
					return (
						<tr className="customer" key={index} onClick={this.handleClickClient.bind(this, match, history, element)}>
							<td>{element.nom_groupe}</td>
							<td>{element.responsable}</td>
							<td>{element.etat}</td>
							<td>{element.prospect}</td>
							<td>{element.mois_renouvellement}</td>
							<td>{element.no_police}</td>
							<td>{element.fournisseur}</td>
						</tr>
					);
				})}
				</tbody>
			);
		} else if (this.props.fournisseur) {
			let row = [];
			this.props.fournisseur.forEach( (element, index) => {
				let duplicate = false;
				this.props.fournisseur.forEach((element2, index2)=> {
					if(element.id === element2.id && index > index2) {
						duplicate = true;
					}
				});
				if(!duplicate) {
					row.push(
						<tr className="supplier" onClick={this.handleClickSupplier.bind(this, match, history, element)} key={index}>
							<td>{element.nom}</td>
							{
								element.petit_groupe && <td>{element.nb_min_petit_groupe}</td>
							}
							{
								!element.petit_groupe && <td>Petits groupes non gérés</td>
							}
							{
								element.grand_groupe && <td>{element.nb_min_grand_groupe}</td>
							}
							{
								!element.grand_groupe && <td>Grands groupes non gérés</td>
							}
							<td>{element.contact}</td>
							<td>{element.code}</td>
						</tr>
					);
				}
			});
			this.rows = (
				<tbody>
				{
					row.map((element)=> {
						return element;
					})
				}
				</tbody>
			);
		}
		return this.rows;
	}
}

export default withRouter(DossiersComponent);
