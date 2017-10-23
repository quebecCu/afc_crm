import {
	CHANGE_FORM,
	SEARCH_REQUEST,
}  from '../actions/crmRechercheCollective';

//ajouter le reste dans l'import 

//pour le register e mail
let initialState = {
		formState:{
			nomEntreprise:'',
			nomEmploye: '',
			numeroPolice:'',
			nomAssureur:'',
			moisRenouvellement:'',
			clientActif: '',
			statutProspect: ''
		},
		errors: '',
};

export default function reducer (state = initialState, action ){

	switch (action.type){

	case SEARCH_REQUEST:
		return {...state ,formState: action.newFormState , error:''}
	case CHANGE_FORM:
		return {...state ,formState: action.newFormState , error:''}
		
	default:
		return state

	}

}