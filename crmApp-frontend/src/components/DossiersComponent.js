import React, {Component} from 'react';

class DossiersComponent extends Component {

	constructor(props) {
		super(props);
	}

	handleClick(client, event) {
		if (this.props.collective)
			this.props.handleClick(client, event);
	}

	componentDidUpdate() {
		var inputNumeroPolice, inputNomEmploye, inputNomAssureur, inputNomEntreprise, inputMoisRenouvellement,
			inputSelectedStatut,
			inputProspect, table, tr, td0, td1, td2, td3, i;
		if (document.getElementById("numeroPolice")) {
			inputNumeroPolice = document.getElementById("numeroPolice").value.toUpperCase();
			inputNomEmploye = document.getElementById("nomEmploye").value.toUpperCase();
			inputNomAssureur = document.getElementById("nomAssureur").value.toUpperCase();
			inputNomEntreprise = document.getElementById("nomEntreprise").value.toUpperCase();
			inputMoisRenouvellement = document.getElementById("moisRenouvellement").value.toUpperCase();
			inputSelectedStatut = document.getElementById("selectedStatut").value.toUpperCase();
			inputProspect = document.getElementById("prospects").value.toUpperCase();

			table = document.getElementById("PageCollectivesClientsTable");
			tr = table.getElementsByTagName("tr");
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
				{this.props.collective.map(element => {
					return (
						<tr className = 'customer' onClick={this.handleClick.bind(this, element)} key={element.id}>
							<td>{element.nom_groupe}</td>
							<td>{element.responsable}</td>
							<td>{element.etat}</td>
							<td>{element.prospect}</td>
						</tr>
					);
				})}
				</tbody>
			);
		} else if (this.props.fournisseur) {
			this.rows = (
				<tbody>

				{this.props.fournisseur.map(element => {
					return (
						<tr onClick={this.handleClick.bind(this)} key={element.nom}>
							<td>{element.nom}</td>
							<td>{element.min_emp1}</td>
							<td>{element.contact}</td>
							<td>{element.code}</td>
						</tr>
					);
				})}
				</tbody>
			);
		}
		return this.rows;
	}
}

export default (DossiersComponent);
