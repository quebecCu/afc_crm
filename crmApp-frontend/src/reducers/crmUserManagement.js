import {
	CHANGE_VIEW_UM, UPDATE_USERS
} from '../actions/crmUserManagement';

//pour le register e mail
let initialState = {
	view: '',
	formState: {
		users: [],
	},
	errors: '',
};

export default function reducer(state = initialState, action) {

	switch (action.type) {
		case CHANGE_VIEW_UM:
			return {...state, view: action.newView, errors: ''};
		case UPDATE_USERS:
			return {...state, formState:{...state.formState, users:action.newList}, errors: ''};
		default:
			return state
	}

}
