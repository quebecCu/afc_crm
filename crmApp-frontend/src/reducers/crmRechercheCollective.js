import {
	CHANGE_FORM_COLL,
	SEARCH_REQUEST_COLL,
    GET_REQUEST_CLIENT_COLL,
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
    dossiersState: [

    ],
		errors: '',
};

export default function reducer (state = initialState, action ){

	switch (action.type){

	case CHANGE_FORM_COLL:
		return {...state ,formState: action.newFormState , error:''}
	case GET_REQUEST_CLIENT_COLL:
    	return {...state ,formState: action.newDossiersState , error:''}
	case SEARCH_REQUEST_COLL:
    	return {...state ,formState: action.newFormState , error:''}
	default:
		return state

	}

}