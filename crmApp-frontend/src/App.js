import React, { Component } from 'react';
import './style/App.css';
import {
    Switch,
    Route
} from 'react-router-dom'
import {PageAccueil} from "./components/PageAccueil";
import {BarreNav} from "./components/BarreNav";
import LoginPage from "./containers/LoginPage";
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
					<Route exact path="/PageAccueil" component={PageAccueil} />
					</div>
			</ConnectedRouter>
			</Provider>
        );
    }
}


export default App;