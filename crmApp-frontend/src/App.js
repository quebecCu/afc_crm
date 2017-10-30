import React, { Component } from 'react';
import './style/App.css';
import {
    Switch,
    Route
} from 'react-router-dom'
import {BarreNav} from "./components/BarreNav";
import LoginPage from "./containers/LoginPage";
import ResetPage from "./containers/ResetPage";

import ResetPagePassword from "./containers/ResetPagePasswordContainer";
import AccueilPageContainer from "./containers/AccueilPageContainer";
import CollectivePageContainer from "./containers/CollectivePageContainer";


//import history from './history';
import {store} from './store.js';

import {history} from './store.js';
import {Provider } from 'react-redux';

import {ConnectedRouter} from 'react-router-redux';


class App extends Component {

    render(){
        return (
        	<Provider	store={store}>
        	<ConnectedRouter history={history}>
        	<div>
					<Route exact path="/" component={LoginPage}/>
					<Route path="/PageAccueil/:id" component={BarreNav} />
					<Route exact path="/PageAccueil" component={AccueilPageContainer} />
					<Route exact path="/Reset" component={ResetPage} />
					<Route exact path="/ResetPassword" component={ResetPagePassword} />
					</div>
			</ConnectedRouter>
			</Provider>
        );
    }
}


export default App;