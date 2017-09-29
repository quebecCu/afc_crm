import React, { Component } from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import {PageAccueil} from "./PageAccueil";
import {BarreNav} from "./components/BarreNav";
import {Login} from "./Login";
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
			<Router>
				<div>
					<Route exact path="/" component={Login}/>
					<Route path="/:id" component={BarreNav} />
					<Route path="/PageAccueil" component={PageAccueil} />
					
				</div>
			</Router>
        );
    }
}


export default App;