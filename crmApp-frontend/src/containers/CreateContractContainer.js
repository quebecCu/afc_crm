import React from 'react';
import ContractClientPart from '../components/ContractClientPart.js';
import ContractInfoPart from '../components/ContractInfoPart';
import ContractModulesPart from '../components/ContractModulesPart';
import {connect} from "react-redux";
import {changeFormContract, getAGA, getEmployesAFC, getListAssureurs} from "../actions/crmContract";
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);


class CreateContractContainer extends React.Component {
	constructor(props){
		super(props);

	}

	render(){
		let { formState } = this.props.crmContract;

		let layout = [
			{i: '1', x: 0, y: 0, w: 5, h: 7, minH: 7, minW:3},
			{i: '2', x: 6, y: 0, w: 5, h: 6, minH: 6, minW:3},

			];
		let layouts = {lg:layout, md:layout, sm:layout, xs:layout, xxs:layout};
		return <div>
			<ResponsiveReactGridLayout className="layout" layouts={layouts} rowHeight={40}
									   breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
									   cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
										compactType={null}
										autoSize = {true}>
				<div key="1"><ContractClientPart getEmployesAFC={this.props.getEmployesAFC}/></div>
				<div key="2"><ContractInfoPart getListAssureurs={this.props.getListAssureurs}
											   getAGA={this.props.getAGA}/></div>


			</ResponsiveReactGridLayout>
			<ContractModulesPart formState={formState} changeForm = {this.props.changeForm}/>
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
		changeForm : (newFormState) => {
			dispatch(changeFormContract(newFormState))
		},
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
