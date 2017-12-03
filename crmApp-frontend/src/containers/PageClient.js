import React, {Component} from 'react';
import {connect} from "react-redux";
import FicheClient from "./FicheClient";
import {changeIdDisplay, deleteCustomer, requestGrid} from "../actions/crmGridLayout";
import LoadingAnimation from "../components/LoadingAnimation";

class PageClient extends Component {
	constructor(props) {
		super(props);
		this.props.requestGrid(this.props.crmClientList.client.idclient);
	}

	render() {
		let {isAdmin} = this.props.crmLogin;
		let {loading} = this.props.crmDashboard;
		let {layouts} = this.props.crmGridLayout;
		let {contacts} = this.props.crmContacts;
		return (
			<div>
				{
					loading && <LoadingAnimation/>
				}
				{
					!loading &&
					<FicheClient client={this.props.crmClientList.client}
								 handleClick={this.props.handleClick} changeIdDisplay={this.props.changeIdDisplay}
								 deleteCustomer={this.props.deleteCustomer} isAdmin={isAdmin}
								 layouts={layouts} contacts={contacts}
								 optionnalFields={this.props.crmClientList.client.facultatif}/>
				}
			</div>
		);
	}
}

function mapStateToProps(state) {

	return {
		crmClientList: state.crmClientList,
		crmLogin: state.crmLogin,
		crmDashboard: state.crmDashboard,
		crmGridLayout: state.crmGridLayout,
		crmContacts: state.crmContacts
	}
}

//fonctions
const mapDispatchToProps = (dispatch) => {
	return {
		changeIdDisplay: (newId) => {
			dispatch(changeIdDisplay(newId))
		},
		deleteCustomer: (id) => {
			dispatch(deleteCustomer(id));
		},
		requestGrid: (id) => {
			dispatch(requestGrid(id));
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(PageClient);
