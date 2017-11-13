import {
    CHANGE_FORM_CREATEUSER,
    UPDATE_OPERATIONS,
    UPDATE_DEFAULTPERMS,
	CHANGE_USER_PERMS,
	UPDATE_ROLES
}  from '../actions/crmCreateUser';

let initialState={
    formState:{
        role: 'Employe',
    	operations:[],
        nom: '',
        login: '',
        mdpProv: '',
        mail:'',
        defaultPerms:[],
        userPerms:[{id: 0, entite: "Gestion des contrats - ACollectives", level:3},
			{id:1, entite: "Gestion des fournisseurs", level:7},
			{id:2, entite: "Gestion des clients - ACollectives", level:7}],
        roles:[],
    },
    errors:'',
};

export default function reducer (state = initialState, action){
    switch(action.type){
        case CHANGE_FORM_CREATEUSER:
            return {...state, formState: action.newFormState, errors:''};
		case CHANGE_USER_PERMS:
			let newUserPerms = [...state.formState.userPerms];
			newUserPerms[action.position].level = action.newValue;
			let test = {...state, formState:{...state.formState, userPerms: newUserPerms}, errors:''};
			return test;
		case UPDATE_DEFAULTPERMS:
			return {...state, formState:{...state.formState,
				defaultPerms: action.defaultPerms}, errors: ''};
        case UPDATE_OPERATIONS:
            return {...state, formState:{...state.formState, operations: action.operations}, errors:''};
        case UPDATE_ROLES:
            return {...state, formState:{...state.formState, roles:action.rolesList}, errors:''};
        default:
            return state;
    }
}
