import React, {Component} from 'react';
//import Login from './Login';
import {connect} from 'react-redux';
import PageAccueil from './PageAccueil';

import {loginRequest, changeForm} from '../../actions/crmLogin'

import {getHistory} from '../../actions/crmHistory'



class AccueilPageContainer extends Component {
	
	constructor(props){
		super(props);
    	this.props.getHistory(); 
  	}

	render() {
		let {historique} = this.props.crmHistory;
		//gestion derreur sur la div login

		return (
			<PageAccueil
				historique={historique}
			/>
		)
	}
}

// les fonctions redux
//valeurs
function mapStateToProps(state) {

	return {
		crmHistory: state.crmHistory,
	}
}

//fonctions
const mapDispatchToProps = (dispatch) => {

	return {
		loginRequest: (formData) => {
			dispatch(loginRequest(formData))
		},
		changeForm: (newFormState) => {
			dispatch(changeForm(newFormState))
		},
		getHistory: () => {
			dispatch(getHistory());
		},

	}
};

export default connect(mapStateToProps, mapDispatchToProps)(AccueilPageContainer)
