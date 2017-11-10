import {combineReducers} from 'redux';
import { routerReducer} from 'react-router-redux';
import {CLEAR_SESSION} from '../actions/crmLogin';
import {RESET_REQUEST} from '../actions/crmReset';
import {RESET_PASSWORD_REQUEST} from '../actions/crmResetPassword';
import {SEARCH_REQUEST_COLL,  SENDING_REQUEST_COLL} from '../actions/crmRechercheCollective';
import crmLogin from './crmLogin';
import crmReset from './crmReset';
import crmResetPassword from './crmResetPassword';
import crmRechercheCollective from './crmRechercheCollective';
import crmRechercheFournisseur from './crmRechercheFournisseur';
import crmCreateUser from './crmCreateUser';
import crmDashboard from "./crmDashboard";
import crmCollectiveContainer from './crmCollectiveContainer';
import crmUserManagement from './crmUserManagement';
// TODO les autres reducers a rajouter ici 


const appReducer = combineReducers ({
	routerReducer,
	crmLogin,
	crmReset,
	crmRechercheCollective,
	crmRechercheFournisseur,
	crmCreateUser,
	crmResetPassword,
	crmDashboard,
	crmCollectiveContainer,
	crmUserManagement
});

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
	case SEARCH_REQUEST_COLL: {
		const {routerReducer, crmRechercheCollective} = state;
		state =  {routerReducer, crmRechercheCollective};
	}
	case RESET_PASSWORD_REQUEST: {
		 const {routerReducer, crmResetPassword} = state;
            state = {routerReducer, crmResetPassword};
			}
	}
	return appReducer(state, action);
}

export default rootReducer;