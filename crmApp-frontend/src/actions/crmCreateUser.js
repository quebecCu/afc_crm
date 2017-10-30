export const CHANGE_FORM_CREATEUSER = 'CHANGE_FORM_CREATEUSER';
export const SUBMIT_USER = 'SUBMIT_USER';

export function changeFormCreateUser (newFormState){
    return {type: CHANGE_FORM_CREATEUSER, newFormState}
}

export function submitUser (newUser){
    return {type: SUBMIT_USER, newUser}
}