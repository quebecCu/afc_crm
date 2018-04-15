import React from 'react';
import {withRouter} from 'react-router'
import {Route,Link,Switch} from 'react-router-dom'
import ListUsers from './ListUsers.js';
import CreateUser from './CreateUser';
import UserContainer from './UserContainer';
import ErrorPage from "../ErrorPage";

class GestionUser extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { match } = this.props;
		return (
			<Switch>
				<Route exact path={match.url} component={ListUsers}/>
				<Route path={match.url + "/create"} component={CreateUser}/>
				<Route path={match.url + "/:idUser"} component={UserContainer}/>
				<Route component={ErrorPage}/>
			</Switch>
		);
	}
}

export default withRouter(GestionUser);
