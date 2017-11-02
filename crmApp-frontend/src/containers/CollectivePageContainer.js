import React, { Component } from 'react';
//import Login from './Login';

import PageCollectives from '../components/PageCollectives';
import PageCollectivesClients from '../components/PageCollectivesClients';
import RechercheComponent from '../components/RechercheComponent';
import HistoriqueContainer from "../containers/HistoriqueContainer";

import '../style/Login.css';
/// TODO 

class CollectivePageContainer extends Component   {
	
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
