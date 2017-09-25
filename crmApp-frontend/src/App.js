import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Request from 'superagent' ;
// import _ from 'lodash';


class App extends Component {

	constructor(props){
		super(props);
		this.state = {
				div2 :"",
				name:""
		};
		
//		this._componentWillMount = this._componentWillMount.bind(this);
		this.maFonction = this.maFonction.bind(this);

	}
	
	
	// premiere methode afin de retrouver les données depuis le backend
	componentWillMount(){
		let url = 'http://localhost:3002/test2';
		Request.get(url).then((response) => {
			this.setState({
				resultat: response,
				name:response.body.name,
				greeting: response.body.title,
				first:response.body.utilisateur[0].first_name,
				last: response.body.utilisateur[0].last_name,
				version: response.body.version
			}); 
			console.log(response);
			console.log(response.body.name);
			console.log(response.body.title);
			console.log("id: ", response.body.utilisateur[0].id);
			console.log("first name: " , response.body.utilisateur[0].first_name);
			console.log("last name: " , response.body.utilisateur[0].last_name);
			console.log("version: " , response.body.version);
		}).catch(function(error) {  
		      console.log('Request failed', error)  
		    });
	} 
	
	maFonction(){
		let url = 'http://localhost:3002/users/test';
		Request.get(url).then((res) => {
			console.log(res.text);
			this.setState({ div2 : res.text });
//			let div = res.text;
//			console.log(div2);
			
}).catch(function(error) {  
		      console.log('Request failed', error)  
		    });
	}
	
  render() {
    return (
      <div className="App">
        <div className="App-header"   >
          <img  src={logo} className="App-logo" alt="logo"  />
          <h2 name={this.state.name}> {this.state.name} </h2>
          <h1 name={this.state.greeting}> {this.state.greeting} </h1>
          <h1 name={this.state.first}>  Prenom :  {this.state.first} </h1>
          <h1 name={this.state.last}> Nom utilisateur: {this.state.last} </h1>
          <h1 name={this.state.version}> Version: {this.state.version} </h1>

          <button onClick={this.maFonction}>
          "Click here Broski"
          </button>
          
          <h1> {this.state.div2} </h1>

        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
