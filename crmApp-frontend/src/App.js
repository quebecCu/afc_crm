import React, { Component } from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import {PageAccueil} from "./PageAccueil";
import {BarreNav} from "./components/BarreNav";

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
					<Route exact path="/" component={PageAccueil}/>
					<Route path="/:id" component={BarreNav} />
				</div>
			</Router>
        );
    }
}

export default App;