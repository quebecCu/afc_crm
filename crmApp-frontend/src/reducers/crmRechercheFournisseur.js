import {
    CHANGE_FORM_FOUR,
    SEARCH_REQUEST_FOUR,
    GET_REQUEST_FOUR
}  from '../actions/crmRechercheFournisseur';

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

        case SEARCH_REQUEST_FOUR:
            return {...state ,formState: action.newFormState , error:''};
        case CHANGE_FORM_FOUR:
            return {...state ,formState: action.newFormState , error:''};
        case GET_REQUEST_FOUR:
            return {...state, dossiersState: action.newDossiersState, error:''};
        default:
            return state

    }

}