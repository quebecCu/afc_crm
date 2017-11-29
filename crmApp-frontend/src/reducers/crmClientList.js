import {
	BIND_CLIENT_DATA
} from "../actions/crmClientList";

let initialState = {
	currentClient: {},
	clientOptionnalRows: {
		facultatif: []
	},
	errors: '',
};

export default function reducer(state = initialState, action) {

	switch (action.type) {

		case BIND_CLIENT_DATA:
			return {
				...state,
				currentClient: action.clientData,
				clientOptionnalRows: action.clientOptionnalRows,
				errors: ''
			};
			break;
		default:
			return state

	}

}
