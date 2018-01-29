import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router'
import {Route,Link,Switch} from 'react-router-dom'
import ContractFile from "../components/ContractFile";
import CreateContractContainer from '../containers/CreateContractContainer';
import ErrorPage from "../components/ErrorPage";

class ContractPage extends Component {

	render() {
		const { match } = this.props;
		return (
			<Switch>
				<Route exact path={match.url} component={ContractFile}/>
				<Route path={match.url + "/update"} component={CreateContractContainer}/>
				<Route
					component={ErrorPage}/>
			</Switch>
		);
	}
}

export default withRouter(ContractPage);
