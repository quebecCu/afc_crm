import {
	ADD_SUBUSER_NAV,
	DISPLAY_SUBUSER_NAV
}  from '../actions/crmNavBar';

//ajouter le reste dans l'import

//pour le register e mail
let initialState = {
	displaySubUser : false,
	linksSubUser: [],
	errors: '',
};

export default function reducer (state = initialState, action ){

	switch (action.type){

		case ADD_SUBUSER_NAV:
			return {...state ,linksSubUser: action.newSubUser , error:''};
		case DISPLAY_SUBUSER_NAV:
			return {...state ,displaySubUser: action.display , error:''};
		default:
			return state

	}

}
