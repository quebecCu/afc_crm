import React, {Component} from 'react';
import {withRouter} from 'react-router'
import {Route,Link,Switch} from 'react-router-dom'
import ContractFile from "./ContractFile";
import CreateContractContainer from './CreateContractContainer';
import ErrorPage from "../ErrorPage";

class ContractPage extends Component {

	render() {
		const { match } = this.props;
		return (
			<Switch>
				<Route exact path={match.url} render={(props) => (
				  <ContractFile {...props} idContract={match.params.idContract} />
					)}/>
				/>
				<Route path={match.url + "/update"} render={(props) => (
				  <CreateContractContainer {...props} idContract={match.params.idContract} />
					)}/>
				<Route
					component={ErrorPage}/>
			</Switch>
		);
	}
}

export default withRouter(ContractPage);
