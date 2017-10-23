import React, { Component } from 'react';
//import Login from './Login';
import { connect  } from 'react-redux';
import PageCollectives from '../components/PageCollectives';
import PageCollectivesClients from '../components/PageCollectivesClients';
import RechercheComponent from '../components/RechercheComponent';

import '../style/Login.css';
/// TODO 
import {searchRequest, changeForm} from '../actions/crmRechercheCollective'

class CollectivePageContainer extends Component   {
	
	render() {
		let { formState, changeForm } = this.props.crmRechercheCollective;
		
		return(
		<div className = "row">
		<div className = "col-md-4 col-md-offset-4">
		<	PageCollectives
			PageCollectivesClients
			RechercheComponent
						onSubmit = {this.props.searchRequest}
						formState = {formState}
						changeForm = {this.props.changeForm}
																/>
		</div>
		</div>
		
		)
	}
}

function mapStateToProps (state) {
	
	return{
		crmRechercheCollective: state.crmRechercheCollective
	}
}

//fonctions
const  mapDispatchToProps = (dispatch) => {
	
	return{
		searchRequest: (formData) => {
			dispatch(searchRequest(formData))
		},
		changeForm : (newFormState) => {
			dispatch(changeForm(newFormState))
		}		
	}
}

export default connect(mapStateToProps, mapDispatchToProps) (CollectivePageContainer)
