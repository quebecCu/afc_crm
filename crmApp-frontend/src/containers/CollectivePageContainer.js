import React, { Component } from 'react';
//import Login from './Login';

import PageCollectives from '../components/PageCollectives';
import PageCollectivesClients from '../components/PageCollectivesClients';
<<<<<<< Updated upstream
import RechercheComponent from '../components/RechercheComponent';
import HistoriqueContainer from "../containers/HistoriqueContainer";
=======
import {changeViewCollective} from "../actions/crmCollectiveContainer";
import {CreationClient} from "./CreationClient";
import {sendingRequestColl} from "../actions/crmRechercheCollective";
>>>>>>> Stashed changes

import '../style/Login.css';
/// TODO 

class CollectivePageContainer extends Component   {
<<<<<<< Updated upstream
=======
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}



	handleClick(event) {
		event.preventDefault();
		this.props.changeViewCollective(event.target.className);
	}
>>>>>>> Stashed changes
	
	render() {
		
		return(
		<div className = "row">
		<div className = "col-md-4 col-md-offset-4">
			<HistoriqueContainer page="PageFournisseurs" history={this.props.history} />
		</div>
		</div>
		
		)
	}
}
export default (CollectivePageContainer);
