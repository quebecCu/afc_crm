import {
	CHANGE_FORM,
}  from '../actions/crmResetPassword';

//ajouter le reste dans l'import 

//pour le register e mail
let initialState = {
		formState:{
			newPassword:'',
			confirmPassword: ''
		},
		errors: '',
		isLoading: false,
		loggedIn: false,
};

export default function reducer (state = initialState, action ){

	switch (action.type){

	case CHANGE_FORM:
		return {...state ,formState: action.newFormState , error:''}
	default:
		return state

	}

}