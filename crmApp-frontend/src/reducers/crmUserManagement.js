import {
	CHANGE_VIEW_UM, UPDATE_USERS, UPDATE_USER_TO_DISPLAY
} from '../actions/crmUserManagement';

//pour le register e mail
let initialState = {
	view: '',
	formState: {
		users: [],
		userToDisplay: {}
	},
	errors: '',
};

export default function reducer(state = initialState, action) {

	switch (action.type) {
		case CHANGE_VIEW_UM:
			return {...state, view: action.newView, errors: ''};
		case UPDATE_USERS:
			return {...state, formState:{...state.formState, users:action.newList}, errors: ''};
		case UPDATE_USER_TO_DISPLAY:
			return {...state, formState:{...state.formState, userToDisplay:action.user}, errors: ''};
		default:
			return state
	}

}
