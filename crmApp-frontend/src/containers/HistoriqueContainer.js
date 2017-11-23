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
        this.handleClickF0 = this.handleClickF0.bind(this);
        this.handleClickF1 = this.handleClickF1.bind(this);
        this.handleClickF2 = this.handleClickF2.bind(this);
        this.handleClickF3 = this.handleClickF3.bind(this);
        this.handleClick0 = this.handleClick0.bind(this);
        this.handleClick1 = this.handleClick1.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
        this.handleClick3 = this.handleClick3.bind(this);
        this.handleClick4 = this.handleClick4.bind(this);
        this.handleClick5 = this.handleClick5.bind(this);
        this.handleClick6 = this.handleClick6.bind(this);
        }

  handleClickF0() {

    	var table = document.getElementById("PageFournisseursTable");
    	this.handleClick(0,table);
    }
    handleClickF1() {
    	var table = document.getElementById("PageFournisseursTable");
    	this.handleClick(1,table);
    }
    handleClickF2() {
    	var table = document.getElementById("PageFournisseursTable");
    	this.handleClick(2,table);
    }
    handleClickF3() {
    	var table = document.getElementById("PageFournisseursTable");
    	this.handleClick(3,table);
    }
    handleClick0() {

    	var table = document.getElementById("PageCollectivesClientsTable");
    	this.handleClick(0,table);
    }
    handleClick1() {
    	var table = document.getElementById("PageCollectivesClientsTable");
    	this.handleClick(1,table);
    }
    handleClick2() {
    	var table = document.getElementById("PageCollectivesClientsTable");
    	this.handleClick(2,table);
    }
    handleClick3() {
    	var table = document.getElementById("PageCollectivesClientsTable");
    	this.handleClick(3,table);
    }
    handleClick4() {
    	var table = document.getElementById("PageCollectivesClientsTable");
    	this.handleClick(4,table);
    }
    handleClick5() {
    	var table = document.getElementById("PageCollectivesClientsTable");
    	this.handleClick(5,table);
    }
    handleClick6() {
    	var table = document.getElementById("PageCollectivesClientsTable");
    	this.handleClick(6,table);
    }
    handleClick(n ,table) {
    	  var /*table, */rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
//    	  table = document.getElementById("PageCollectivesClientsTable");
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
                            <th onClick={this.handleClick0}>Nom du groupe</th>
                            <th onClick={this.handleClick1}>Nom employé</th>
                            <th onClick={this.handleClick2} style={{ display: 'none'}}>Numéro de police</th>
                            <th onClick={this.handleClick3} style={{ display: 'none'}}>Mois de renouvellement</th>
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
                            <th onClick={this.handleClickF0}>Nom de l'assurance</th>
                            <th onClick={this.handleClickF1}>Nombre d'employés</th>
                            <th onClick={this.handleClickF2}>Nom contact</th>
                            <th onClick={this.handleClickF3}>Code</th>
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
