import {combineReducers} from 'redux';
import { routerReducer} from 'react-router-redux';
import {CLEAR_SESSION} from '../actions/crmLogin';
import {RESET_REQUEST} from '../actions/crmReset';
import crmLogin from './crmLogin';
import crmReset from './crmReset';

// TODO les autres reducers a rajouter ici 


const appReducer = combineReducers ({
	routerReducer,
	crmLogin,
	crmReset,
	
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
	}
	return appReducer(state, action);
}

export default rootReducer;