import React from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router'
import {Route,Link,Switch} from 'react-router-dom'
import CreateContractContainer from './CreateContractContainer';
import ListContractsComponent from "../components/ListContractsComponent";
import ContractPage from "./ContractPage";
import ErrorPage from "../components/ErrorPage";

class ContractsContainer extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { match } = this.props;

		return (
			<Switch>
				<Route exact path={match.url} component={ListContractsComponent}/>
				<Route path={match.url + "/:idContract"} component={ContractPage}/>
				<Route path={match.url + "/create"} component={CreateContractContainer}/>
				<Route
					component={ErrorPage}/>
			</Switch>
		);
	}

}
export default withRouter(ContractsContainer)
