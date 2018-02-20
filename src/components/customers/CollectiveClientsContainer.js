import React from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router'
import {Route,Link,Switch} from 'react-router-dom'
import PageCollectivesClients from './PageCollectivesClients';
import CreationClient from "./GridContainer";
import PageClient from "./PageClient";
import ErrorPage from "../ErrorPage";

class CollectiveClientsContainer extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { match } = this.props;

		return (
			<Switch>
				<Route exact path={match.url} component={PageCollectivesClients}/>
				<Route path={match.url + "/create"} component={CreationClient}/>
				<Route path={match.url + "/:idContract"} component={PageClient}/>
				<Route component={ErrorPage}/>
			</Switch>
		);
	}

}
export default withRouter(CollectiveClientsContainer)
