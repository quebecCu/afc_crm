export const GET_POSTES_CONTACTS = 'GET_POSTES_CONTACTS';
export const UPDATE_POSTES_CONTACTS = 'UPDATE_POSTES_CONTACTS';
export const GET_CONTACTS = 'GET_CONTACTS';
export const UPDATE_CONTACTS = 'UPDATE_CONTACTS';
export const CHANGE_FORM_STATE = 'CHANGE_FORM_STATE';
export const ADD_ARRAY_CONTACTS = 'ADD_ARRAY_CONTACTS';

export function getPostesContacts() {
	return {type: GET_POSTES_CONTACTS}
}

export function updatePostesContacts(postes) {
	return {type: UPDATE_POSTES_CONTACTS, postes}
}

export function getContacts(idClient) {
	return {type: GET_CONTACTS, idClient}
}

export function updateContacts(contacts) {
	return {type: UPDATE_CONTACTS, contacts}
}

export function changeFormState(newFormState) {
	return {type: CHANGE_FORM_STATE, newFormState}
}

export function addArrayContacts(newArray) {
	return {type: ADD_ARRAY_CONTACTS, newArray}
}

