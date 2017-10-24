import {
    CHANGE_FORM_CREATEUSER,
}  from '../actions/crmCreateUser';

let initialState={
    formState:{
        role: 'employe',
        nom: '',
        login: '',
        mdpProv: '',
        mail:'',
        permissionsDefault:[{
            role:'employe',
            droits:["lecture","ecriture"],
            tables:["clientsColl","fournisseursColl"]
            },
            {
                role:'visiteurClient',
                droits:["lecture"],
                tables:["clientsColl"]
            },
            {
                role:'visiteurFournisseur',
                droits:["lecture"],
                tables:["fournisseursColl"]
            }
        ],
        permissionsUser:{}

    },
    errors:'',

};

export default function reducer (state = initialState, action){
    switch(action.type){
        case CHANGE_FORM_CREATEUSER:
            return {...state, formState: action.newFormState, error:''};

        default:
            return state;
    }
}
