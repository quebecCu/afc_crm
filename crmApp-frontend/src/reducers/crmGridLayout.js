import {CHANGE_GRID, CHANGE_LAYOUT} from '../actions/crmGridLayout';

//ajouter le reste dans l'import

let initialState = {
	grid: [

	],
	layouts: {

	}
};

export default function reducer (state = initialState, action ){

	switch (action.type){

		case CHANGE_LAYOUT:
			return {...state ,layouts: action.newLayout , error:''};
		case CHANGE_GRID:
			return {...state ,grid: action.newGrid , error:''};
		default:
			return state

	}

}
