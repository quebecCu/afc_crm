import {
	CHANGE_VIEW_CONTRACT,
	UPDATE_AGA,
	UPDATE_EMPLOYES_AFC,
	UPDATE_LIST_ASSUREURS
} from "../actions/crmContract";

let initialState = {
	view: '',
	formState: {
		AGA: [],
		employesAFC:[],
		listAssureurs:[]
	},
	errors: '',
};

export default function reducer (state = initialState, action){
	switch(action.type){
		case CHANGE_VIEW_CONTRACT:
			return {...state, view: action.newView, errors:''};
		case UPDATE_AGA:
			return {...state, formState:{...state.formState, AGA:action.listAGA}, errors:'' };
		case UPDATE_EMPLOYES_AFC:
			return {...state, formState:{...state.formState, employesAFC:action.listEmployes}, errors:'' };
		case UPDATE_LIST_ASSUREURS:
			return {...state, formState:{...state.formState, listAssureurs:action.listAssureurs}, errors:'' };
		default:
			return state;
	}
}
