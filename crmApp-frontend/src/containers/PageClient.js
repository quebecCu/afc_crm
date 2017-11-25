import React, {Component} from 'react';
import {connect} from "react-redux";
import FicheClient from "./FicheClient";

class PageClient extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <FicheClient client={this.props.crmClientList.currentClient}
							optionnalFields={this.props.crmClientList.clientOptionnalRows}/>;
	}
}

function mapStateToProps(state) {

	return {
		crmClientList: state.crmClientList
	}
}

//fonctions
const mapDispatchToProps = (dispatch) => {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PageClient);
