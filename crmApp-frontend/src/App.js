import React, { Component } from 'react';
import './style/App.css';
import {
    Switch
} from 'react-router-dom'
import LoginPage from "./containers/LoginPage";
import ErrorPage from "./components/ErrorPage";
import ResetPage from "./containers/ResetPage";
import ResetPagePassword from "./containers/ResetPagePasswordContainer";
import {store} from './store.js';
import {history} from './store.js';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import DashboardContainer from "./containers/DashboardContainer";
import {PrivateRoute, PublicOnlyRoute} from "./components/CustomRoute";

class App extends Component {

    render(){
        return (
        	<Provider	store={store}>
        		<ConnectedRouter history={history}>
        			<Switch>
						<PublicOnlyRoute exact path="/" component={LoginPage}/>
						<PrivateRoute exact path="/Home" component={DashboardContainer} />
						<PublicOnlyRoute exact path="/Reset" component={ResetPage} />
						<PublicOnlyRoute exact path="/ResetPassword/:token" component={ResetPagePassword} />
						<PublicOnlyRoute exact path="/404" component={ErrorPage} />

					</Switch>
				</ConnectedRouter>
			</Provider>
        );
    }

}

export default App;
