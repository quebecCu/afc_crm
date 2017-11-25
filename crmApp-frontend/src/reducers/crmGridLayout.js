import {
	CHANGE_GRID, CHANGE_LAYOUT, CHANGE_REQUIRED_FIELDS, CHANGE_VIEW_GRID, UPDATE_ACTIVITES, UPDATE_CHAMBRE_COMMERCE,
	UPDATE_CHAMP_TYPES,
	UPDATE_ETATS, UPDATE_PROVENANCES,
	UPDATE_RELEVES
} from '../actions/crmGridLayout';

//ajouter le reste dans l'import

let initialState = {
	releves: [],
	chambreCommerce: [],
	champTypes: [],
	activites: [],
	etats: [],
	provenances: [],
	requiredFields: {},
	grid: [],
	layouts: {},
	view:'read',
	errors: ''
};

export default function reducer (state = initialState, action ){

	switch (action.type){

		case CHANGE_LAYOUT:
			return {...state ,layouts: action.newLayout , error:''};
		case CHANGE_GRID:
			return {...state ,grid: action.newGrid , error:''};
		case CHANGE_VIEW_GRID:
			return {...state ,view: action.newView , error:''};
		case UPDATE_RELEVES:
			return {...state,releves: action.releves, error:''};
		case UPDATE_CHAMBRE_COMMERCE:
			return {...state,chambreCommerce: action.chambreCommerce, error:''};
		case UPDATE_CHAMP_TYPES:
			return {...state,champTypes: action.champTypes, error:''};
		case UPDATE_ACTIVITES:
			return {...state,activites: action.activites, error:''};
		case UPDATE_ETATS:
			return {...state,etats: action.etats, error:''};
		case UPDATE_PROVENANCES:
			return {...state,provenances: action.provenances, error:''};
		case CHANGE_REQUIRED_FIELDS:
			return {...state ,requiredFields: action.newRequiredFields , error:''};
		default:
			return state

	}

}
