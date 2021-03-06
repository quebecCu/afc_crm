import React, {Component} from 'react';
import {withRouter} from 'react-router'
import {Route,Link,Switch} from 'react-router-dom'
import ErrorPage from "../ErrorPage";
import FicheClient from "./FicheClient";
import CreationClient from "./GridContainer";

class PageClient extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { match } = this.props;
		return (
			<Switch>
				<Route exact path={match.url} render={(props) => (
				  <FicheClient {...props} idClient={match.params.idClient} />
					)}/>
				/>
				<Route path={match.url + "/update"} render={(props) => (
				  <CreationClient {...props} idClient={match.params.idClient} />
					)}/>
				<Route
					component={ErrorPage}/>
			</Switch>
		);
	}
}

export default withRouter(PageClient);
