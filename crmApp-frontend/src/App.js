import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var jeremy ="";

class App extends Component {

	 fetchData(){
	    const url = 'http://localhost:3002';
	    fetch(url)
	    .then (response => {console.log("response: reception: ", response  )})
	    .catch( error => {console.error("grosse erreur les gars !", error)});
	}

  render() {
    return (
      <div className="App">
        <div className="App-header"   >
          <img src={logo} className="App-logo" alt="logo"  />
          <h2> {jeremy}</h2>
          
          <button onClick={this.fetchData} >
          "Fetch Data"
          </button>

          
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
