import React from 'react';
import ContractClientPart from '../components/ContractClientPart.js';
import ContractInfoPart from '../components/ContractInfoPart';
import {connect} from "react-redux";
import {getAGA, getEmployesAFC, getListAssureurs} from "../actions/crmContract";

class CreateContractContainer extends React.Component {
	constructor(props){
		super(props);

	}

	render(){
		return <div>
			<ContractClientPart getEmployesAFC={this.props.getEmployesAFC}/>
			<ContractInfoPart getListAssureurs={this.props.getListAssureurs}
								getAGA={this.props.getAGA}/>

		</div>;
	}
}

function mapStateToProps(state) {

	return {
		crmContract: state.crmContract,
	}
}

//fonctions
const mapDispatchToProps = (dispatch) => {
	return {
		getAGA: () => {
			dispatch(getAGA());
		},
		getListAssureurs: () => {
			dispatch(getListAssureurs());
		},
		getEmployesAFC: () => {
			dispatch(getEmployesAFC());
		}

	}
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateContractContainer);
