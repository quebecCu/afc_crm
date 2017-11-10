import {
    CHANGE_FORM_CREATEUSER,
    UPDATE_OPERATIONS,
    UPDATE_DEFAULTPERMS,
    CHANGE_USERPERMS
}  from '../actions/crmCreateUser';
var update = require ('react-addons-update');

let initialState={
    formState:{
        operations: [],
        role: 'employe',
        nom: '',
        login: '',
        mdpProv: '',
        mail:'',
        defaultPerms:[],
        userPerms:[]
    },
    errors:'',

};

export default function reducer (state = initialState, action){
    switch(action.type){
        case CHANGE_FORM_CREATEUSER:
            return {...state, formState: action.newFormState, error:''};
        case UPDATE_OPERATIONS:
            return {...state, formState:{...state.formState, operations: action.operations}, error:''};
        case UPDATE_DEFAULTPERMS:
            return {...state, formState:{...state.formState,
                defaultPerms: action.defaultPerms}, error: ''};
        case CHANGE_USERPERMS:
            let newUserPerms = [...state.formState.userPerms];
            newUserPerms[action.position].level = action.newValue;
            return {...state, formState:{...state.formState, userPerms: newUserPerms}, error:''};

        default:
            return state;
    }
}
