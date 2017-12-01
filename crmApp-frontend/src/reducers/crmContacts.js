

import {ADD_ARRAY_CONTACTS, CHANGE_FORM_STATE, UPDATE_CONTACTS, UPDATE_POSTES_CONTACTS} from "../actions/crmContacts";

let initialState = {
	postes: [],
	contacts: [],
	arrayContacts: [
		{
			prenom: '',
			nom: '',
			idposte: 1,
			titre: 'Mr',
			num_tel_principal: '',
			ext_tel_principal: '',
			mail: '',
			estdecideur: false
		}
	],
	errors: '',
};

export default function reducer(state = initialState, action) {

	switch (action.type) {
		case UPDATE_POSTES_CONTACTS:
			return {...state, postes: action.postes, errors:''};
		case UPDATE_CONTACTS:
			return {...state, contacts: action.contacts, errors:''};
		case CHANGE_FORM_STATE:
			return {...state, arrayContacts: action.newFormState, errors: ''};
		case ADD_ARRAY_CONTACTS:
			return {...state, arrayContacts: action.newArray, errors: ''};
		default:
			return state

	}

}
