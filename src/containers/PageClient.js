import React, {Component} from 'react';
import {withRouter} from 'react-router'
import {Route,Link,Switch} from 'react-router-dom'
import ErrorPage from "../components/ErrorPage";
import FicheClient from "./FicheClient";
import CreationClient from "./GridContainer";
import {changeIdDisplay, deleteCustomer, requestGrid} from "../actions/crmGridLayout";
import LoadingAnimation from "../components/LoadingAnimation";
import {changeViewDashboard} from "../actions/crmDashboard";
import {changeViewContract, setFromClient} from "../actions/crmContract";

class PageClient extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { match } = this.props;
		return (
			<Switch>
				<Route exact path={match.url} render={(props) => (
				  <FicheClient {...props} idClient={match.params.idContract} />
					)}/>
				/>
				<Route path={match.url + "/update"} render={(props) => (
				  <CreationClient {...props} idClient={match.params.idContract} />
					)}/>
				<Route
					component={ErrorPage}/>
			</Switch>
		);
	}
}

export default withRouter(PageClient);
