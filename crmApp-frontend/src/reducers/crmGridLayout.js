import {
	CHANGE_GRID, CHANGE_LAYOUT, CHANGE_VIEW_GRID, UPDATE_CHAMBRE_COMMERCE,
	UPDATE_RELEVES
} from '../actions/crmGridLayout';

//ajouter le reste dans l'import

let initialState = {
	releves: [],
	chambreCommerce: [],
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
		default:
			return state

	}

}
