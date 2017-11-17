import React, { Component } from 'react';

class DossiersComponent extends Component {

    handleClick() {
        this.props.handleClick('customer');
    }


    componentDidUpdate() {
		var inputNumeroPolice,inputNomEmploye,inputNomAssureur,inputNomEntreprise,inputMoisRenouvellement, inputSelectedStatut,
		inputProspect, table, tr,td0,td1, td2,td3, td4, td5,td6, i;
	if(document.getElementById("numeroPolice") ){
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
		td4 = tr[i].getElementsByTagName("td")[4];
		td5 = tr[i].getElementsByTagName("td")[5];
		td6 = tr[i].getElementsByTagName("td")[6];
		if (td0 || td1 || td2 || td3 ||td4 ||td5 ||td6) {
			if ( td5.innerHTML.toUpperCase().indexOf("ACTIF") > -1) {
				tr[i].style.display = "";
			} else {
				tr[i].style.display = "none";
			}
		}
	}
    } }
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
                        <tr onClick={this.handleClick.bind(this)} key={element.nom_groupe}>
                            <td>{element.nom_groupe}</td>
                            <td>{element.nb_employes}</td>
                            <td>{element.activite}</td>
                            <td>{element.mois_renouvellement}</td>
                            <td>{element.nom_assureur}</td>
                            <td>{element.etat}</td>
                            <td>{element.prospect}</td>
                        </tr>
                    );
                })}
                </tbody>
            );
        } else {
			let fournisseur = this.props.fournisseur;
            this.rows = (
                <tbody>
                {

                	fournisseur.map(element => {
                    return (
                        <tr onClick={this.handleClick.bind(this)} key={element.nom}>
                            <td>{element.nom}</td>
                            <td>{element.employes}</td>
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
