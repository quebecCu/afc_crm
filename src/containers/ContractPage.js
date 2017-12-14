import React, {Component} from 'react';
import {connect} from "react-redux";
import LoadingAnimation from "../components/LoadingAnimation";
import SupplierFile from "../components/SupplierFile";
import {getContactsSup} from "../actions/crmContacts";
import {changeViewSuppliers} from "../actions/crmSuppliersContainer";
import ContractFile from "../components/ContractFile";
import {changeLoading, changeViewDashboard} from "../actions/crmDashboard";
import {changeViewCollective} from "../actions/crmCollectiveContainer";
import {getClientRequest} from "../actions/crmClientList";
import {getSupplier} from "../actions/crmGridLayoutSuppliers";

class ContractPage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let {isAdmin} = this.props.crmLogin;
		let {layouts} = this.props.crmGridSuppliersLayout;
		let {contacts} = this.props.crmContacts;
		let {contractDisplay} = this.props.crmContract;
		return (
			<div>
				{
					Object.keys(contractDisplay).length !== 0 &&
					<ContractFile contract={contractDisplay}
								  changeViewCollective={this.props.changeViewCollective}
								  changeViewDashboard={this.props.changeViewDashboard}
								  changeLoading={this.props.changeLoading}
								  getClientRequest={this.props.getClientRequest}
								  changeViewSuppliers={this.props.changeViewSuppliers}
								  getSupplier={this.props.getSupplier}
					/>
				}
			</div>
		);
	}
}

function mapStateToProps(state) {

	return {
		crmLogin: state.crmLogin,
		crmDashboard: state.crmDashboard,
		crmGridSuppliersLayout: state.crmGridSuppliersLayout,
		crmContacts: state.crmContacts,
		crmContract: state.crmContract,
	}
}

//fonctions
const mapDispatchToProps = (dispatch) => {
	return {
		changeViewSuppliers: (newView) => {
			dispatch(changeViewSuppliers(newView));
		},
		changeViewDashboard: (newView) => {
			dispatch(changeViewDashboard(newView));
		},
		changeViewCollective: (newView) => {
			dispatch(changeViewCollective(newView));
		},
		getClientRequest: (id) => {
			dispatch(getClientRequest(id));
		},
		changeLoading: (newLoading) => {
			dispatch(changeLoading(newLoading));
		},
		getSupplier: (id) => {
			dispatch(getSupplier(id));
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(ContractPage);
