import React, { Component } from 'react';
import './style/App.css';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import {PageAccueil} from "./js/components/PageAccueil";
import {BarreNav} from "./js/components/BarreNav";
import {Login} from "./js/components/Login";
//import { Router, Route, browserHistory } from 'react-router';
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render(){
        return (
        		<provider >
			<Router>
				<div>
				<Route exact path="/Login" component={Login}/> 
				<Route exact path="/PageAccueil" component={PageAccueil} />
					
				</div>
			</Router>
			</provider >
        );
    }
}


export default App;

