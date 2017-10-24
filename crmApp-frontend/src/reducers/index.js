import {combineReducers} from 'redux';
import { routerReducer} from 'react-router-redux';
import {CLEAR_SESSION} from '../actions/crmLogin';
import {RESET_REQUEST} from '../actions/crmReset';
import {SEARCH_REQUEST} from '../actions/crmRechercheCollective';
import {SEARCH_REQUEST_FOUR} from '../actions/crmRechercheFournisseur';
import crmLogin from './crmLogin';
import crmReset from './crmReset';
import crmRechercheCollective from './crmRechercheCollective';
import crmRechercheFournisseur from './crmRechercheFournisseur';
import crmCreateUser from './crmCreateUser';
// TODO les autres reducers a rajouter ici 


const appReducer = combineReducers ({
	routerReducer,
	crmLogin,
	crmReset,
	crmRechercheCollective,
	crmRechercheFournisseur,
	crmCreateUser
})


const rootReducer = (state, action) => {
	switch (action.type) {
	case CLEAR_SESSION: {
		const {routerReducer, crmLogin} = state;
		state =  {routerReducer, crmLogin};
	}
	case RESET_REQUEST: {
		const {routerReducer, crmReset} = state;
		state =  {routerReducer, crmReset};
	}
	case SEARCH_REQUEST: {
		const {routerReducer, crmRechercheCollective} = state;
		state =  {routerReducer, crmRechercheCollective};
	}
	case SEARCH_REQUEST_FOUR: {
		const {routerReducer, crmRechercheFournisseur} = state;
		state = {routerReducer, crmRechercheFournisseur};
	}
	}
	return appReducer(state, action);
}

export default rootReducer;