import {
    CHANGE_FORM_CREATEUSER,
}  from '../actions/crmCreateUser';

let initialState={
    formState:{
        role: ''

    },
    errors:'',

};

export default function reducer (state = initialState, action){
    switch(action.type){
        case CHANGE_FORM_CREATEUSER:
            return ({...state, formState: action.newFormState, error:''});
        default:
            return state;
    }
}