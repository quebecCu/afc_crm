import React, { Component } from 'react';
import './style/App.css';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'
import {PageAccueil} from "./js/components/PageAccueil";
import {BarreNav} from "./js/components/BarreNav";
import {Login} from "./js/components/Login";
import history from './js/history';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            div2: "",
            name: ""
        };
    }
    render(){
        return (
			<Router history={history}>
				<div>
					<Route exact path="/" component={Login}/>
					<Route path="/PageAccueil/:id" component={BarreNav} />
					<Route exact path="/PageAccueil" component={PageAccueil} />
				</div>
			</Router>
        );
    }
}


export default App;