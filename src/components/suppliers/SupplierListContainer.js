import React, {Component} from 'react';
import {connect} from "react-redux";
import DossiersComponent from "../DossiersComponent";
import {changeViewDashboard} from "../../actions/crmDashboard";
import {changeViewSuppliers} from "../../actions/crmSuppliersContainer";
import {getSupplier} from "../../actions/crmGridLayoutSuppliers";
import {addSubSupplierNav, displaySubSupplierNav} from "../../actions/crmNavBar";

class SupplierListContainer extends Component {

	constructor(props) {
		super(props);
		this.handleClickF0 = this.handleClickF0.bind(this);
		this.handleClickF1 = this.handleClickF1.bind(this);
		this.handleClickF2 = this.handleClickF2.bind(this);
		this.handleClickF3 = this.handleClickF3.bind(this);
		this.handleClickF4 = this.handleClickF4.bind(this);
	}

	handleClickF0() {

		var table = document.getElementById("PageFournisseursTable");
		this.handleClick(0, table);
	}

	handleClickF1() {
		var table = document.getElementById("PageFournisseursTable");
		this.handleClick(1, table);
	}

	handleClickF2() {
		var table = document.getElementById("PageFournisseursTable");
		this.handleClick(2, table);
	}

	handleClickF3() {
		var table = document.getElementById("PageFournisseursTable");
		this.handleClick(3, table);
	}

	handleClickF4() {
		var table = document.getElementById("PageFournisseursTable");
		this.handleClick(4, table);
	}

	handleClick6() {
		var table = document.getElementById("PageCollectivesClientsTable");
		this.handleClick(6, table);
	}

	handleClick(n, table) {
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
				if (dir === "asc") {
					if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
						shouldSwitch = true;
						break;
					}
				} else if (dir === "desc") {
					if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
						shouldSwitch = true;
						break;
					}
				}
			}
			if (shouldSwitch) {
				rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
				switching = true;
				switchcount++;
			} else {
				if (switchcount === 0 && dir === "asc") {
					dir = "desc";
					switching = true;
				}
			}
		}
	}

	render() {
			this.table = (
				<div id="print-content" style={{overflow: 'auto', height: 'auto', width: 'auto'}}>
					<div className="table-responsive">
						<table id="PageFournisseursTable" className="table table-bordered table-hover">
							<thead className="thead-default">
							<tr id="thead-tr">
								<th onClick={this.handleClickF0}>Nom de l'assurance</th>
								<th onClick={this.handleClickF1}>Nombre d'employés petits groupes</th>
								<th onClick={this.handleClickF2}>Nombre d'employés grands groupes</th>
								<th onClick={this.handleClickF3}>Nom contact</th>
								<th onClick={this.handleClickF4}>Code</th>
							</tr>
							</thead>
							<DossiersComponent fournisseur={this.props.dossiersState}	/>
						</table>
					</div>
				</div>

			);
		return this.table;
	}
}

function mapStateToProps(state) {

	return {
		crmDashboard: state.crmDashboard,
		crmGridSuppliersLayout: state.crmGridSuppliersLayout,
		crmNavBar: state.crmNavBar
	}
}

//fonctions
const mapDispatchToProps = (dispatch) => {
	return {
		changeViewDashboard: (newView) => {
			dispatch(changeViewDashboard(newView));
		},
		changeViewSuppliers: (newView) => {
			dispatch(changeViewSuppliers(newView))
		},
		getViewSuppliers: (id) => {
			dispatch(getSupplier(id));
			dispatch(changeViewSuppliers("supplierFile"));
		},
		displaySubSupplier: (display) => {
			dispatch(displaySubSupplierNav(display));
		},
		addSubSupplier: (links) => {
			dispatch(addSubSupplierNav(links));
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(SupplierListContainer)
