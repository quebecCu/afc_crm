import React, {Component} from 'react';
import {withRouter} from 'react-router'
import {Route,Link,Switch} from 'react-router-dom'
import ErrorPage from "../ErrorPage";
import CreateUser from './CreateUser';
import DisplayUser from './DisplayUser';

class PageClient extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { match } = this.props;
		return (
			<Switch>
				<Route exact path={match.url} render={(props) => (
				  <DisplayUser {...props} idUser={match.params.idUser} />
					)}/>
				/>
				<Route path={match.url + "/update"} render={(props) => (
				  <CreateUser {...props} idUser={match.params.idUser} />
					)}/>
				<Route
					component={ErrorPage}/>
			</Switch>
		);
	}
}

export default withRouter(PageClient);
