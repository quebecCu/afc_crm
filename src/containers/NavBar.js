import React, {Component} from 'react';
import {changeLoading, changeViewDashboard} from "../actions/crmDashboard";
import {connect} from "react-redux";
import NavBarLink from "../components/NavBarLink";
import NavBarLinkGroup from "../components/NavBarLinkGroup";
import {logout} from "../actions/crmLogin";
import {changeViewCollective} from "../actions/crmCollectiveContainer";
import {changeViewUserManagement, requestUserById} from "../actions/crmUserManagement";
import {changeViewContract, getContract, setFromClient} from "../actions/crmContract";
import {addSubContractNav, addSubCustomerNav, addSubSupplierNav, addSubUserNav} from "../actions/crmNavBar";
import {getClientRequest} from "../actions/crmClientList";
import {changeViewSuppliers} from "../actions/crmSuppliersContainer";
import {getSupplier} from "../actions/crmGridLayoutSuppliers";

class NavBar extends Component {
	constructor(props) {
		super(props);
		this._deleteSubUser = this._deleteSubUser.bind(this);
		this._deleteSubCustomer = this._deleteSubCustomer.bind(this);
		this._deleteSubSupplier = this._deleteSubSupplier.bind(this);
		this._deleteSubContract = this._deleteSubContract.bind(this);
	}

	_deleteSubUser(idUser) {
		let links = this.props.crmNavBar.linksSubUser.filter(link => {
			return link.idUser !== idUser;
		});
		this.props.deleteSubUserNav(links, "");
	}

	_deleteSubCustomer(idCustomer) {
		let links = this.props.crmNavBar.linksSubCustomer.filter(link => {
			return link.idCustomer !== idCustomer;
		});
		this.props.deleteSubCustomerNav(links, "customers");
	}

	_deleteSubSupplier(idSupplier) {
		let links = this.props.crmNavBar.linksSubSupplier.filter(link => {
			return link.idSupplier !== idSupplier;
		});
		this.props.deleteSubSupplierNav(links, "");
	}

	_deleteSubContract(idContract) {
		let links = this.props.crmNavBar.linksSubContract.filter(link => {
			return link.idContract !== idContract;
		});
		this.props.deleteSubContractNav(links, "collContract");
	}

	render() {
		return (
		  <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
		    <span className="navbar-brand">AFC inc.</span>
		    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
		      <span className="navbar-toggler-icon"></span>
		    </button>
		    <div className="collapse navbar-collapse" id="navbarResponsive">
		      <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
						<NavBarLink
							name="Accueil"
							id="Home"
							handleClick={this.props.changeViewDashboard}
							view={this.props.view}
							/>
						<NavBarLink
							name="Assurances Individuelles"
							id="indIns"
							handleClick={this.props.changeViewDashboard}
							view={this.props.view}
							/>
						<NavBarLinkGroup
							name="Assurances Collectives"
							id="collIns"
							childs={[{name: "Clients",id:"clients"},{name: "Fournisseurs",id:"suppliers"}]}
							handleClick={this.props.changeViewDashboard}
							view={this.props.view}
							resetView={this.props.changeViewCollective}
							reset=""
							/>
						{
							this.props.crmNavBar.displaySubCustomer === true
							&& this.props.crmNavBar.linksSubCustomer.map(link => {
								return (
									<ul className="sidenav-second-level" id="subCustomer" key={"subCustomerMenu" + link.idCustomer}>
										<NavBarLink
											name={link.name}
											id="collIns"
											handleClick={this.props.changeViewDashboard}
											view={this.props.view}
											resetView={this.props.changeViewCollective}
											reset={link.view}
											displayUser={this.props.getClientRequest}
											changeLoading={this.props.changeLoading}
											idCustomer={link.idCustomer}
											menu="subMenu"
											deleteSub={this._deleteSubCustomer}
											/>
									</ul>
								);
							})
						}
						<NavBarLink
							name="Contrats"
							id="contracts"
							handleClick={this.props.changeViewDashboard} view={this.props.view}
							resetView={this.props.changeViewContract} reset=""
							resetState={this.props.setFromClient} resetFor="contract"
							/>
						{
							this.props.crmNavBar.displaySubContract === true
							&& this.props.crmNavBar.linksSubContract.map(link => {
								return (
									<ul className="sidenav-second-level" id="subContract" key={"subContractMenu" + link.idContract}>
										<NavBarLink
											name={link.name}
											id="contracts"
											handleClick={this.props.changeViewDashboard}
											view={this.props.view}
											resetView={this.props.changeViewContract}
											reset={link.view} displayUser={this.props.getContract}
											changeLoading={this.props.changeLoading}
											idContract={link.idContract} menu="subMenu"
											deleteSub={this._deleteSubContract}/>
									</ul>
								)
							})
						}
						<NavBarLink
							name="Placements"
							id="placements"
							handleClick={this.props.changeViewDashboard}
							view={this.props.view}/>
						{
							this.props.crmNavBar.displaySubSupplier === true
							&& this.props.crmNavBar.linksSubSupplier.map(link => {
								return (
									<ul className="sidenav-second-level" id="subSupplier" key={"subSupplierMenu" + link.idSupplier}>
										<li>
											<NavBarLink
												name={link.name}
												id="suppliers"
												handleClick={this.props.changeViewDashboard}
												view={this.props.view}
												resetView={this.props.changeViewSuppliers}
												reset={link.view} displayUser={this.props.getSupplier}
												changeLoading={this.props.changeLoading}
												idSupplier={link.idSupplier}
												menu="subMenu"
												deleteSub={this._deleteSubSupplier}/>
										</li>
									</ul>
								)
							})
						}
						{
							this.props.crmLogin.isAdmin === true
							&& <NavBarLink
										name="Gestion des utilisateurs"
										id="usersManagement"
									  handleClick={this.props.changeViewDashboard}
										view={this.props.view}
										resetView={this.props.changeViewUserManagement}
										reset=""/>
						}
						{
							this.props.crmLogin.isAdmin === true
							&& this.props.crmNavBar.displaySubUser === true
							&& this.props.crmNavBar.linksSubUser.map(link => {
								return (
									<ul className="sidenav-second-level" id="subUser" key={"subUserMenu" + link.idUser}>
										<NavBarLink name={link.name} id="usersManagement"
														handleClick={this.props.changeViewDashboard}
														view={this.props.view}
														resetView={this.props.changeViewUserManagement}
														reset={link.view} displayUser={this.props.requestUserById}
														changeLoading={this.props.changeLoading}
														idUser={link.idUser} menu="subMenu"
														deleteSub={this._deleteSubUser}/>
									</ul>
								)
							})
						}
		      </ul>
		      <ul className="navbar-nav ml-auto">
		        <li className="nav-item">
		          <form className="form-inline my-2 my-lg-0 mr-lg-2">
		            <div className="input-group">
		              <input className="form-control" type="text" placeholder="Rechercher"/>
		              <span className="input-group-append">
		                <button className="btn btn-primary" type="button">
		                  <i className="fa fa-search"></i>
		                </button>
		              </span>
		            </div>
		          </form>
		        </li>
		        <li className="nav-item">
		          <a className="nav-link" onClick={this.props.logout}>
		            <i className="fa fa-fw fa-sign-out"></i>D&eacute;connexion</a>
		        </li>
		      </ul>
		    </div>
		  </nav>
		);
	}
}

function mapStateToProps(state) {

	return {
		crmLogin: state.crmLogin,
		crmNavBar: state.crmNavBar
	}
}

const mapDispatchToProps = (dispatch) => {

	return {
		changeViewContract: (newView) => {
			dispatch(changeViewContract(newView));
		},
		changeViewDashboard: (newView) => {
			dispatch(changeViewDashboard(newView));
		},
		logout: () => {
			dispatch(logout());
		},
		changeViewCollective: (newView) => {
			dispatch(changeViewCollective(newView));
		},
		changeViewUserManagement: (newView) => {
			dispatch(changeViewUserManagement(newView));
		},
		requestUserById: (id) => {
			dispatch(requestUserById(id));
		},
		addSubUserNav: (newSubUser) => {
			dispatch(addSubUserNav(newSubUser));
		},
		deleteSubUserNav: (newSubUser, newView) => {
			dispatch(addSubUserNav(newSubUser));
			dispatch(changeViewUserManagement(newView));
		},
		getClientRequest: (idClient) => {
			dispatch(getClientRequest(idClient));
		},
		addSubCustomerNav: (newSubCustomer) => {
			dispatch(addSubCustomerNav(newSubCustomer));
		},
		deleteSubCustomerNav: (newSubCustomer, newView) => {
			dispatch(addSubCustomerNav(newSubCustomer));
			dispatch(changeViewCollective(newView));
		},
		changeLoading: (newLoading) => {
			dispatch(changeLoading(newLoading));
		},
		changeViewSuppliers: (newView) => {
			dispatch(changeViewSuppliers(newView));
		},
		deleteSubSupplierNav: (newSubSupplier, newView) => {
			dispatch(addSubSupplierNav(newSubSupplier));
			dispatch(changeViewSuppliers(newView));
		},
		getSupplier: (id) => {
			dispatch(getSupplier(id));
			dispatch(changeViewSuppliers("supplierFile"));
		},
		setFromClient: (fromClient) => {
			dispatch(setFromClient(fromClient));
		},
		getContract: (id) => {
			dispatch(getContract(id));
		},
		deleteSubContractNav: (newSubContract, newView) => {
			dispatch(addSubContractNav(newSubContract));
			dispatch(changeViewContract(newView));
		},
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
