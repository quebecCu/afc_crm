import React, {Component} from 'react';
import {connect} from "react-redux";
import AccueilPageContainer from "./AccueilPageContainer";
import NavBar from "./NavBar";
import SuppliersPageContainer from "./SuppliersPageContainer";
import ErrorPage from "../components/ErrorPage";
import GestionUser from './GestionUser';
import ContractsContainer from "./ContractsContainer";
import CollectivePageContainer from "./CollectivePageContainer";
import {logout} from "../actions/crmLogin";

class DashboardContainer extends Component {
	componentDidMount() {
    document.body.className += ' fixed-nav sticky-footer bg-dark';
  }

	render() {
		let {view} = this.props.crmDashboard;
		let {isAdmin} = this.props.crmLogin;

		return (
			<div>

				<NavBar view={view}/>
				<div className="content-wrapper">
	    		<div className="container-fluid" id="main">
			      <ol className="breadcrumb">
			        <li className="breadcrumb-item">
			          <a href="#">Tableau de bord</a>
			        </li>
							<li className="breadcrumb-item active">Accueil</li>
						</ol>
							{
								view === "Home" && (

									<AccueilPageContainer/>
								)
							}
						{
							view === "collIns" && <CollectivePageContainer/>
						}
						{
	            view === "suppliers" && <SuppliersPageContainer />
						}
						{
							view === "usersManagement" && isAdmin === true &&
							<GestionUser/>
						}
						{
							view === "contracts" && <ContractsContainer />
						}
						{
							view === "indIns" && <ErrorPage/>
						}
						{
							view === "placements" && <ErrorPage/>
						}
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)
