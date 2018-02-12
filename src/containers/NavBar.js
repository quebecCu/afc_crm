import React, {Component} from 'react';
import {changeLoading, changeViewDashboard} from "../actions/crmDashboard";
import {connect} from "react-redux";
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom';
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
	}

	render() {
		const { location } = this.props
		return (
		  <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
		    <span className="navbar-brand">AFC inc.</span>
		    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
		      <span className="navbar-toggler-icon"></span>
		    </button>
		    <div className="collapse navbar-collapse" id="navbarResponsive">
		      <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
						<li className={"nav-item " + (location.pathname === '/dashboard' ? 'active' : '' )} data-toggle="tooltip" data-placement="right" title="Accueil">
              <Link
                className="nav-link"
                to={"/dashboard"}>
  	            <span className="nav-link-text">Accueil</span>
  	          </Link>
            </li>
						<li className={"nav-item " + (location.pathname.indexOf('/dashboard/individual') !== -1 ? 'active' : '' )} data-toggle="tooltip" data-placement="right" title="Assurances Individuelles">
              <Link
                className="nav-link"
                to={"/dashboard/individual"}>
  	            <span className="nav-link-text">Assurances Individuelles</span>
  	          </Link>
            </li>
						<li className="nav-item" data-toggle="tooltip" data-placement="right" title="Assurances Collectives">
	            <a
	              className="nav-link nav-link-collapse collapsed"
	              data-toggle="collapse"
	              data-parent="#exampleAccordion"
	              href="#collInsSub"
	              id="collIns">
		            <span className="nav-link-text">Assurances Collectives</span>
		          </a>
	            <ul className="sidenav-second-level collapse" id={"collInsSub"}>
								<li className={(location.pathname.indexOf("/dashboard/collective/suppliers") !== -1 ? 'active' : '' )} key="suppliersCol">
									<Link
			              to={"/dashboard/collective/suppliers"}
			              id="suppliersCol"
			              >
			              Fournisseurs
			            </Link>
			          </li>
								<li className={(location.pathname.indexOf("/dashboard/collective/clients") !== -1 ? 'active' : '' )} key="clientsCol">
									<Link
			              to={"/dashboard/collective/clients"}
			              id="clientsCol"
			              >
			              Clients
			            </Link>
			          </li>
								<li className={(location.pathname.indexOf("/dashboard/collective/contracts") !== -1 ? 'active' : '' )} key="contractsCol">
									<Link
			              to={"/dashboard/collective/contracts"}
			              id="contractsCol"
			              >
			              Contrats
			            </Link>
			          </li>
	            </ul>
	          </li>
						<li className={"nav-item " + (location.pathname.indexOf("/dashboard/collective/placements") !== -1 ? 'active' : '' )} data-toggle="tooltip" data-placement="right" title="Placements">
              <Link
                className="nav-link"
                to={"/dashboard/placements"}>
  	            <span className="nav-link-text">Placements</span>
  	          </Link>
            </li>
						{
							this.props.crmLogin.isAdmin === true
							&& (
								<li className={"nav-item " + (location.pathname.indexOf("/dashboard/usersManagement") !== -1 ? 'active' : '' )} data-toggle="tooltip" data-placement="right" title="Gestion des utilisateurs">
		              <Link
		                className="nav-link"
		                to={"/dashboard/usersManagement"}>
		  	            <span className="nav-link-text">Gestion des utilisateurs</span>
		  	          </Link>
		            </li>
								)
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
			document.body.classList.remove("fixed-nav","sticky-footer","bg-dark");
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
		getClientRequest: (idClient) => {
			dispatch(getClientRequest(idClient));
		},
		changeLoading: (newLoading) => {
			dispatch(changeLoading(newLoading));
		},
		changeViewSuppliers: (newView) => {
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
	}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
