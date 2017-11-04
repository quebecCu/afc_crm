
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const CHANGE_FORM = 'CHANGE_FORM';
export const CLEAR_SESSION = 'CLEAR_SESSION';
export const SENDING_REQUEST = 'SENDING_REQUEST';
export const LOGOUT = 'LOGOUT';
export const SET_AUTH = 'SET_AUTH';
export const LOGIN = 'LOGIN';


export function changeForm (newFormState){
	return {type: CHANGE_FORM, newFormState}
}

export function loginRequest (data){
	return {type: LOGIN_REQUEST, data}
}

export function sendingRequest (sending){
	return {type: SENDING_REQUEST, sending}
}

export function setAuthState (newAuthState){
	return {type: SET_AUTH, newAuthState}
}

export function login () {
	return {type: LOGIN}
}

export function logout (){
	return {type: LOGOUT}
}


