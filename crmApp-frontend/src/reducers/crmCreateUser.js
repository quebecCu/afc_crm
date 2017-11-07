import {
    CHANGE_FORM_CREATEUSER, UPDATE_ROLES,} from '../actions/crmCreateUser';

let initialState={
    formState:{
        role: 'Employe',
        nom: '',
        login: '',
        mdpProv: '',
        mail:'',
        permissionsDefault:[
            {
                role:'employe',
                perm:[{idDroit: 0, droit:"lecture", table:"clientsColl"},
                    {idDroit:1,droit:"ecriture",table:"clientsColl"},
                    {idDroit:2,droit:"lecture",table:"fournisseursColl"},
                    {idDroit:3,droit:"ecriture",table:"fournisseursColl"}]
            },
            {
                role:'visiteurClient',
                perm:[{idDroit: 0, droit:"lecture", table:"clientsColl"}]
            }
        ],
        roles:[],
        permissionsUser:[]
    },
    errors:'',
};

export default function reducer (state = initialState, action){
    switch(action.type){
        case CHANGE_FORM_CREATEUSER:
            return {...state, formState: action.newFormState, error:''};
        case UPDATE_ROLES:
            return {...state, formState:{...state.formState, roles:action.rolesList}, error:''};
        default:
            return state;
    }
}
