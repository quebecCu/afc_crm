import React, {Component} from 'react';
import {connect} from "react-redux";
import AccueilPageContainer from "./AccueilPageContainer";
import NavBar from "./NavBar";
import SuppliersPageContainer from "./SuppliersPageContainer";
import ErrorPage from "../components/ErrorPage";
import GestionUser from './GestionUser';
import ContractsContainer from "./ContractsContainer";
import '../style/Dashboard.css'
import CollectivePageContainer from "./CollectivePageContainer";
import PageClient from './PageClient';

class DashboardContainer extends Component {

	render() {
		let {view} = this.props.crmDashboard;
		let {isAdmin} = this.props.crmLogin;

		return (
			<div id="Dashboard">

				<NavBar view={view}/>
				<div className="view container" id="main">
					{
						this.props.crmDashboard.view === "Home" && <AccueilPageContainer/>
					}
					{
						this.props.crmDashboard.view === "collIns" && <CollectivePageContainer/>
					}
					{
                        this.props.crmDashboard.view === "suppliers" && <SuppliersPageContainer />
					}
					{
						this.props.crmDashboard.view === "usersManagement" && this.props.crmLogin.isAdmin === true &&
						<GestionUser/>
					}
					{
						this.props.crmDashboard.view === "contracts" && <ContractsContainer />
					}
					{
						this.props.crmDashboard.view === "customer" && <PageClient/>
					}
					{
						this.props.crmDashboard.view === "indIns" && <ErrorPage/>
					}
					{
						this.props.crmDashboard.view === "placements" && <ErrorPage/>
					}

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
