import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router'
import {Route,Link,Switch} from 'react-router-dom'
import AccueilPageContainer from "./AccueilPageContainer";
import SuppliersPageContainer from "./SuppliersPageContainer";
import PageCollectivesClients from '../components/PageCollectivesClients';
import ContractsContainer from "./ContractsContainer";
import NavBar from "./NavBar";
import ErrorPage from "../components/ErrorPage";

import Placements from "../components/Placements";

import GestionUser from './GestionUser';
import CollectivePageContainer from "./CollectivePageContainer";

class DashboardContainer extends Component {
	componentDidMount() {
    document.body.className += ' fixed-nav sticky-footer bg-dark';
  }

	render() {
		let {view} = this.props.crmDashboard;
		let {isAdmin} = this.props.crmLogin;
		const { match, location } = this.props

		return (
			<div>

				<NavBar view={view}/>
				<div className="content-wrapper">
	    		<div className="container-fluid" id="main">
			      <ol className="breadcrumb">
			        <li className="breadcrumb-item">
								<Link to={match.url}>
				          Tableau de bord
				        </Link>
			        </li>
							<li className="breadcrumb-item active">{location.pathname}</li>
						</ol>
						<Switch>
				      <Route exact path={match.url} component={AccueilPageContainer}/>
				      <Route path={match.url + "/collective/suppliers"} component={SuppliersPageContainer}/>
							<Route path={match.url + "/collective/clients"} component={PageCollectivesClients}/>
							<Route path={match.url + "/collective/contracts"} component={ContractsContainer}/>
							<Route path={match.url + "/collective/placements"} component={Placements}/>
							{
								this.props.crmLogin.isAdmin === true
								&&	<Route path={match.url + "/usersManagement"} component={GestionUser}/>
							}
							<Route
								component={ErrorPage}/>
				    </Switch>
						<footer className="sticky-footer">
							<div className="container">
								<div className="text-center">
									<small>© 2018 CRM Application UDES. All rights reserved</small>
								</div>
							</div>
						</footer>
						<a className="scroll-to-top rounded" href="#page-top">
				      <i className="fa fa-angle-up"></i>
				    </a>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {

	return {
		crmDashboard: state.crmDashboard,
		crmLogin: state.crmLogin
	}
}

//fonctions
const mapDispatchToProps = (dispatch) => {
	return {}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardContainer))
