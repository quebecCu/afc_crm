import {
    CHANGE_VIEW_DASH
}  from '../actions/crmDashboard';

//ajouter le reste dans l'import

//pour le register e mail
let initialState = {
    view: 'Home',
    errors: '',
};

export default function reducer (state = initialState, action ){

    switch (action.type){

        case CHANGE_VIEW_DASH:
            return {...state ,view: action.newView , error:''};
        default:
            return state

    }

}