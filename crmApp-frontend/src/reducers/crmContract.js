import {
	CHANGE_VIEW_CONTRACT
} from "../actions/crmContract";

let initialState = {
	view: '',
	errors: '',
};

export default function reducer (state = initialState, action){
	switch(action.type){
		case CHANGE_VIEW_CONTRACT:
			return {...state, view: action.newView, errors:''};
		default:
			return state;
	}
}
