import React, { Component } from 'react';
import DossiersComponent from "../components/DossiersComponent";
import '../style/PageAccueil.css';
import {changeViewDashboard} from "../actions/crmDashboard";
import {connect} from "react-redux";

class HistoriqueContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { historique: [{date: "20/09/2017", nom: "Kim", type: "Individuelle"},{date: "18/09/2017", nom: "Co", type: "Collective"}],
            };
        this.handleClick0 = this.handleClick0.bind(this);
        this.handleClick1 = this.handleClick1.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
        this.handleClick3 = this.handleClick3.bind(this);
        this.handleClick4 = this.handleClick4.bind(this);
        this.handleClick5 = this.handleClick5.bind(this);
        this.handleClick6 = this.handleClick6.bind(this);
        }
    
    handleClick0() {
    	this.handleClick(0);
    }
    handleClick1() {
    	this.handleClick(1);
    }
    handleClick2() {
    	this.handleClick(2);
    }
    handleClick3() {
    	this.handleClick(3);
    }
    handleClick4() {
    	this.handleClick(4);
    }
    handleClick5() {
    	this.handleClick(5);
    }
    handleClick6() {
    	this.handleClick(6);
    }
    handleClick(n) {
    	  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    	  table = document.getElementById("PageCollectivesClientsTable");
    	  switching = true;
    	  dir = "asc"; 
    	  while (switching) {
    	    switching = false;
    	    rows = table.getElementsByTagName("TR");
    	    for (i = 1; i < (rows.length - 1); i++) {
    	      shouldSwitch = false;
    	      x = rows[i].getElementsByTagName("TD")[n];
    	      y = rows[i + 1].getElementsByTagName("TD")[n];
    	      if (dir == "asc") {
    	        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
    	          shouldSwitch= true;
    	          break;
    	        }
    	      } else if (dir == "desc") {
    	        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
    	          shouldSwitch= true;
    	          break;
    	        }
    	      }
    	    }
    	    if (shouldSwitch) {
    	      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
    	      switching = true;
    	      switchcount ++; 
    	    } else {
    	      if (switchcount == 0 && dir == "asc") {
    	        dir = "desc";
    	        switching = true;
    	      }
    	    }
    	  }
    	}
    render() {
        switch (this.props.page) {
            case 'PageAccueil':
                this.table = (
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Nom</th>
                            <th>Type</th>
                        </tr>
                        </thead>
                        <DossiersComponent historique={this.state.historique} history={this.props.history} handleClick={this.props.changeViewDashboard}/>
                    </table>
                );
                break;
            case 'PageCollectivesClients':
                this.table = (
                		<div style={{ overflow: 'auto', height:'300px',}}>
                    <table id="PageCollectivesClientsTable" className="table">
                        <thead>
                        <tr>
                            <th onClick={this.handleClick0}>Nom de l'entreprise</th>
                            <th onClick={this.handleClick1}>Nom employé</th>
                            <th onClick={this.handleClick2}>N° de police</th>
                            <th onClick={this.handleClick3}>Mois de renouvellement</th>
                            <th onClick={this.handleClick4}>Assureur</th>
                            <th onClick={this.handleClick5}>Statut</th>
                            <th onClick={this.handleClick6}>Prospect</th>
                        </tr>
                        </thead>
                        <DossiersComponent collective={this.props.dossiersState} history={this.props.history} handleClick={this.props.changeViewDashboard}/>
                    </table>
                        </div>
                );
                break;
            case 'PageFournisseurs':
                this.table = (
                		<div style={{ overflow: 'auto', height:'300px',}}>
                    <table id="PageFournisseursTable" className="table">
                        <thead>
                        <tr>
                            <th>Nom de l'assurance</th>
                            <th>Nombre d'employés</th>
                            <th>Nom contact</th>
                            <th>Code</th>
                        </tr>
                        </thead>
                        <DossiersComponent fournisseur={this.props.dossiersState} history={this.props.history} handleClick={this.props.changeViewDashboard}/>
                    </table>
                        </div>

                );
                break;
            default:

                break;
        }
        return this.table;
    }
}

function mapStateToProps (state) {

	return{
		crmDashboard: state.crmDashboard
	}
}

//fonctions
const  mapDispatchToProps = (dispatch) => {
	return{
		changeViewDashboard: (newView) => {
			dispatch(changeViewDashboard(newView));
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (HistoriqueContainer)
