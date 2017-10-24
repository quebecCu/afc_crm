export const CHANGE_FORM_CREATEUSER = 'CHANGE_FORM_CREATEUSER';

export function changeFormCreateUser (newFormState){
    return {type: CHANGE_FORM_CREATEUSER, newFormState}
}