import React from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router'
import {Route,Link,Switch} from 'react-router-dom'
import CreateContractContainer from './CreateContractContainer';
import ListContractsComponent from "./ListContractsComponent";
import ContractPage from "./ContractPage";
import ErrorPage from "../ErrorPage";

class ContractsContainer extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { match } = this.props;

		return (
			<Switch>
				<Route exact path={match.url} component={ListContractsComponent}/>
				<Route path={match.url + "/create"} component={CreateContractContainer}/>
				<Route path={match.url + "/:idContract"} component={ContractPage}/>
				<Route
					component={ErrorPage}/>
			</Switch>
		);
	}

}
export default withRouter(ContractsContainer)
