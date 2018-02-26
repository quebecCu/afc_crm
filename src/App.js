import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router-dom'
import {ConnectedRouter} from 'react-router-redux';
import {PrivateRoute, PublicRoute} from "./components/CustomRoute";
import ErrorPage from "./components/ErrorPage";
import DashboardContainer from "./components/DashboardContainer";
import LoginPage from "./components/LoginPage";
import ResetPage from "./components/ResetPage";
import ResetPagePassword from "./components/ResetPagePasswordContainer";
import {history, store} from './store.js';
import {checkIfLogged} from './actions/crmLogin';
import './style/App.css'

class App extends Component {
	constructor(props){
			super(props);
			if (localStorage.getItem('cookieSession')){
				let _isAdmin;
				if (localStorage.getItem('isAdmin') === "true"){
					_isAdmin = true;
				}else{
					_isAdmin = false;
				}
				let formStateAdm = {_auth:{
					cookie: localStorage.getItem('cookieSession'),
					isAdmin: _isAdmin
				}};
				store.dispatch(checkIfLogged(formStateAdm));
			}
	}
	
	render() {
		return (
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<Switch>
						<PublicRoute
							exact
							path="/"
							component={LoginPage}/>
						<PrivateRoute
							path="/dashboard"
							component={DashboardContainer}
							/>
						<PublicRoute
							exact
							path="/Reset"
							component={ResetPage}/>
						<PublicRoute
							exact
							path="/ResetPassword/:token"
							component={ResetPagePassword}/>
						<Route
							component={ErrorPage}/>
					</Switch>
				</ConnectedRouter>
			</Provider>
		);
	}

}

export default App;
