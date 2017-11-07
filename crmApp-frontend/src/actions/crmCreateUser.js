export const CHANGE_FORM_CREATEUSER = 'CHANGE_FORM_CREATEUSER';
export const SUBMIT_USER = 'SUBMIT_USER';
export const GET_ROLES = 'GET_ROLES';
export const UPDATE_ROLES = 'UPDATE_ROLES';

export function changeFormCreateUser (newFormState){
    return {type: CHANGE_FORM_CREATEUSER, newFormState}
}

export function submitUser (newUser){
    return {type: SUBMIT_USER, newUser}
}

export function getRoles() {
    return {type: GET_ROLES}
}

export function updateRoles(rolesList) {
    return {type: UPDATE_ROLES, rolesList}
}