import React, {Component} from 'react';
import {connect} from "react-redux";
import FicheClient from "./FicheClient";
import {changeIdDisplay} from "../actions/crmGridLayout";

class PageClient extends Component {

	render() {
		return <FicheClient client={this.props.crmClientList.currentClient}
							handleClick={this.props.handleClick} changeIdDisplay={this.props.changeIdDisplay}
							optionnalFields={this.props.crmClientList.clientOptionnalRows.facultatif}/>;
	}
}

function mapStateToProps(state) {

	return {
		crmClientList: state.crmClientList
	}
}

//fonctions
const mapDispatchToProps = (dispatch) => {
	return {
		changeIdDisplay: (newId) => {
			dispatch(changeIdDisplay(newId))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(PageClient);
