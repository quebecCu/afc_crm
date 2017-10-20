import {combineReducers} from 'redux';
import { routerReducer} from 'react-router-redux';
import {CLEAR_SESSION} from '../actions/crmLogin';
import crmLogin from './crmLogin';


// TODO les autres reducers a rajouter ici 


const appReducer = combineReducers ({
	routerReducer,
	crmLogin,
	
})


const rootReducer = (state, action) => {
	switch (action.type) {
	case CLEAR_SESSION: {
		const {routerReducer, crmLogin} = state;
		state =  {routerReducer, crmLogin};
	}
	}
	return appReducer(state, action);
}

export default rootReducer;