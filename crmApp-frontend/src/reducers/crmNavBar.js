import {
	ADD_SUBCUSTOMER_NAV, ADD_SUBSUPPLIER_NAV,
	ADD_SUBUSER_NAV, DISPLAY_SUBCUSTOMER_NAV, DISPLAY_SUBSUPPLIER_NAV,
	DISPLAY_SUBUSER_NAV
} from '../actions/crmNavBar';

//ajouter le reste dans l'import

//pour le register e mail
let initialState = {
	displaySubCustomer : false,
	linksSubCustomer: [],
	displaySubSupplier : false,
	linksSubSupplier: [],
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
		case ADD_SUBCUSTOMER_NAV:
			return {...state ,linksSubCustomer: action.newSubCustomer , error:''};
		case DISPLAY_SUBCUSTOMER_NAV:
			return {...state ,displaySubCustomer: action.display , error:''};
		case ADD_SUBSUPPLIER_NAV:
			return {...state ,linksSubSupplier: action.newSubSupplier , error:''};
		case DISPLAY_SUBSUPPLIER_NAV:
			return {...state ,displaySubSupplier: action.display , error:''};
		default:
			return state

	}

}
