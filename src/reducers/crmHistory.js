import {
    SET_HISTORY_REQUEST
} from '../actions/crmHistory';
//ajouter le reste dans l'import



let initialState = {
			historique: []
};

export default function reducer (state = initialState, action ){

	switch (action.type){
		case SET_HISTORY_REQUEST:
			return {...state, historique: action.historique};
		default:
			return state
	}

}
