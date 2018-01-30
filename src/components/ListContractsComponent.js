import React from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom';
import {changeSearchContracts, changeViewContract, getContract, getListContracts} from "../actions/crmContract";
import ContractPage from "../containers/ContractPage";
import {addSubContractNav, displaySubContractNav} from "../actions/crmNavBar";
import {changeLoading} from "../actions/crmDashboard";

class ListContractsComponent extends React.Component {
	constructor(props) {
		super(props);
		this._handleChange = this._handleChange.bind(this);
		this._hardReset = this._hardReset.bind(this);
		this._filtre = this._filtre.bind(this);
		this.props.getListContracts();
	}

	_handleClick(contract) {
		let links = this.props.crmNavBar.linksSubContract;
		let check = true;
		links.forEach(link => {
			if(link.idContract === contract.idcontrat) {
				check = false;
			}
		});
		if(check) {
			this.props.crmContract.listContracts.forEach((element, index) => {
				let duplicate = false;
				this.props.crmContract.listContracts.forEach((element2, index2)=> {
					if(element.idcontrat === element2.idcontrat && index > index2) {
						duplicate = true;
					}
				});
				if(!duplicate && contract.idcontrat === element.idcontrat) {
					links.push({name: element.police, view: 'display', idContract: contract.idcontrat});
				}
			});
			this.props.addSubContractNav(links);
		}
		this.props.changeViewContract("display");
		this.props.displaySubContractNav(true);
		this.props.getContract(contract.idcontrat);
	}

	_handleClickHead(n) {
		let rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
		let table = document.getElementById("PageContractsTable");
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

	_handleChange(event) {
		let search = this.props.crmContract.searchContracts;
		search[event.target.id] = event.target.value;
		this.props.changeSearchContracts(search);
		this._filtre();
	}

	_hardReset() {
		let search = {
			numeroPolice: '',
			nomClient: '',
			nomAssureur: '',
			moisRenouvellement: ''
		};
		this.props.changeSearchContracts(search);
	}

	componentDidUpdate() {
		this._filtre();
	}

	_filtre() {
		let inputNumeroPolice, inputNomAssureur, inputNomClient, inputMoisRenouvellement,
			table, tr, td0, td1, td2, td3, td4, i;

		inputNomClient = this.props.crmContract.searchContracts.nomClient.toUpperCase();
		inputNumeroPolice = this.props.crmContract.searchContracts.numeroPolice.toUpperCase();
		inputNomAssureur = this.props.crmContract.searchContracts.nomAssureur.toUpperCase();
		inputMoisRenouvellement = this.props.crmContract.searchContracts.moisRenouvellement.toUpperCase();

		table = document.getElementById("PageContractsTable");
		tr = table.getElementsByTagName("tr");
		// Loop through all table rows, and hide those who don't match the search query
		for (i = 0; i < tr.length; i++) {
			td0 = tr[i].getElementsByClassName("tableCellContract")[0];
			td1 = tr[i].getElementsByClassName("tableCellContract")[1];
			td2 = tr[i].getElementsByClassName("tableCellContract")[2];
			td3 = tr[i].getElementsByClassName("tableCellContract")[3];
			if (td0 || td1 || td2 || td3) {
				if (td3.innerHTML.toUpperCase().indexOf(inputMoisRenouvellement) > -1 && td0.innerHTML.toUpperCase().indexOf(inputNumeroPolice) > -1
					&& td2.innerHTML.toUpperCase().indexOf(inputNomAssureur) > -1 && td1.innerHTML.toUpperCase().indexOf(inputNomClient) > -1) {
					tr[i].style.display = "";
				} else {
					tr[i].style.display = "none";
				}
			}
		}
	}

	render(){
		let {view, listContracts, searchContracts} = this.props.crmContract;
		let {loading} = this.props.crmDashboard;
		let {linksSubContract} = this.props.crmNavBar;
		const { match } = this.props;
		return (
			<div>
				<h1 className="text-center">Assurances collectives</h1>
				<div className="card mb-3">
					<div className="card-header">
		      	<i className="fa fa-table"></i> Liste des contrats
					</div>
					<div className="card-body">
						<div>
							<form action="" id="recherche" className="container-fluid">
								<input type="text" id="numeroPolice" placeholder="N° police"
									   onChange={this._handleChange}
									   value={searchContracts.numeroPolice}
								/>
								<input type="text" id="nomClient" placeholder="Nom client"
									   onChange={this._handleChange}
									   value={searchContracts.nomClient}
								/>
								<input type="text" id="nomAssureur" placeholder="Assureur"
									   onChange={this._handleChange}
									   value={searchContracts.nomAssureur}
								/>
								<input type="text" id="moisRenouvellement" placeholder="Mois renouvellement"
									   onChange={this._handleChange}
									   value={searchContracts.moisRenouvellement}
								/>

								<input type="reset" value="Reset" id="reset" onClick={this._hardReset}/>

							</form>
							<Link
								className="btn btn-primary"
								to={match.url + "/create"}>
								<i className="fa fa-plus" aria-hidden="true"></i> Créer contrat
							</Link>
						</div>
						<div className="table-responsive">
							<table className="table table-bordered table-hover" id="PageContractsTable">
								<thead className="thead-default">
									<tr>
										<th onClick={this._handleClickHead.bind(this, 0)}>N° Police</th>
										<th onClick={this._handleClickHead.bind(this, 1)}>Client</th>
										<th onClick={this._handleClickHead.bind(this, 2)}>Assureur</th>
										<th onClick={this._handleClickHead.bind(this, 3)}>Mois de renouvellement</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
								{

									listContracts.map((contract, index) => {
										return (
										<tr key={index} onClick={this._handleClick.bind(this, contract)}>
											<td className="tableCellContract">{contract.police}</td>
											<td className="tableCellContract">{contract.nom_client}</td>
											<td className="tableCellContract">{contract.nom_fournisseur}</td>
											<td className="tableCellContract">{contract.mois_renouvellement}</td>
											<td>
												<table style={{width: 100 + '%',height: 100 + '%'}}>
													<tbody>
														<tr>
															<td className="text-right" style={{border:"none", padding: 0}}>
																<Link
									                className="btn btn-sm btn-primary"
									                to={match.url + "/" + contract.police}>
									  	            <i className="fa fa-eye" aria-hidden="true"></i>
									  	          </Link>
															</td>
															<td className="text-center" style={{border:"none", padding: 0}}>
																<Link
																	className="btn btn-sm btn-secondary"
																	to={match.url + "/" + contract.police + "/update"}>
																	<i className="fa fa-cog" aria-hidden="true"></i>
																</Link>
															</td>
															<td className="text-left" style={{border:"none", padding: 0}}>
																<Link
									                className="btn btn-sm btn-danger"
									                to={match.url + "/" + contract.police }>
									  	            <i className="fa fa-times" aria-hidden="true"></i>
									  	          </Link>
															</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
										)
									})
								}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}

}

function mapStateToProps(state) {

	return {
		crmContract: state.crmContract,
		crmDashboard: state.crmDashboard,
		crmNavBar: state.crmNavBar
	}
}

//fonctions
const mapDispatchToProps = (dispatch) => {
	return {
		changeViewContract: (newView) => {
			dispatch(changeViewContract(newView));
		},
		getListContracts: () => {
			dispatch(getListContracts());
		},
		changeSearchContracts: (search) => {
			dispatch(changeSearchContracts(search));
		},
		changeLoading: (loading) => {
			dispatch(changeLoading(loading));
		},
		getContract: (idContract) => {
			dispatch(getContract(idContract));
		},
		displaySubContractNav: (display) => {
			dispatch(displaySubContractNav(display));
		},
		addSubContractNav: (links) => {
			dispatch(addSubContractNav(links));
		}
	}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListContractsComponent))
