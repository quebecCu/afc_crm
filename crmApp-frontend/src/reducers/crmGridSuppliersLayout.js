import {
	CHANGE_GRID_FOUR, CHANGE_LAYOUT_FOUR, CHANGE_VIEW_GRID_FOUR 
} from '../actions/crmGridLayoutSuppliers';
//ajouter le reste dans l'import

let initialState = {
	grid: [],
	layouts: {},
	view:'read',
	errors: ''
};

export default function reducer (state = initialState, action ){

	switch (action.type){

		case CHANGE_LAYOUT_FOUR:
			return {...state ,layouts: action.newLayout , error:''};
		case CHANGE_GRID_FOUR:
			return {...state ,grid: action.newGrid , error:''};
		case CHANGE_VIEW_GRID_FOUR:
			return {...state ,view: action.newView , error:''};
		default:
			return state

	}

}
