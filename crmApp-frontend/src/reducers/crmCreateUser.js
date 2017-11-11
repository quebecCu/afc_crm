import {
    CHANGE_FORM_CREATEUSER,
    UPDATE_OPERATIONS,
    UPDATE_DEFAULTPERMS,
	CHANGE_USER_PERMS,
	UPDATE_ROLES
}  from '../actions/crmCreateUser';

let initialState={
    formState:{
        role: 'Utilisateur_All',
        nom: '',
        login: '',
        mdpProv: '',
        mail:'',
        defaultPerms:[],
        userPerms:[],
        roles:[],
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
        case CHANGE_USER_PERMS:
            let newUserPerms = [...state.formState.userPerms];
			console.log("0", state.formState);
            newUserPerms[action.position].level = action.newValue;
			console.log("1", state.formState);
			let test = {...state, formState:{...state.formState, userPerms: newUserPerms}, error:''};
			console.log("2", state.formState);
            return test;
        case UPDATE_ROLES:
            return {...state, formState:{...state.formState, roles:action.rolesList}, error:''};
        default:
            return state;
    }
}
