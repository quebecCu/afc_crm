import {
    CHANGE_VIEW_UM
}  from '../actions/crmUserManagement';

//ajouter le reste dans l'import

//pour le register e mail
let initialState = {
    view: '',
    errors: '',
};

export default function reducer (state = initialState, action ){

    switch (action.type){

        case CHANGE_VIEW_UM:
            return {...state ,view: action.newView , error:''};
        default:
            return state

    }

}