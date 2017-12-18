import React, {Component} from 'react';
import {connect} from "react-redux";
import SupplierFile from "../components/SupplierFile";
import {changeViewSuppliers} from "../actions/crmSuppliersContainer";

class SupplierPage extends Component {

	render() {
		let {isAdmin} = this.props.crmLogin;
		let {layouts} = this.props.crmGridSuppliersLayout;
		let {contacts} = this.props.crmContacts;
		return (
			<div>
					<SupplierFile requiredFields={this.props.crmGridSuppliersLayout.requiredFields}
								  isAdmin={isAdmin}
								  layouts={layouts} contacts={contacts}
								  changeView={this.props.changeViewSuppliers}
								  optionnalFields={this.props.crmGridSuppliersLayout.grid}/>
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

	}
}

//fonctions
const mapDispatchToProps = (dispatch) => {
	return {
		changeViewSuppliers : (newView) => {
			dispatch(changeViewSuppliers(newView));
		},
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(SupplierPage);
