export const CHANGE_FORM_CREATEUSER = 'CHANGE_FORM_CREATEUSER';
export const SUBMIT_USER = 'SUBMIT_USER';
export const GET_OPERATIONS = 'GET_OPERATIONS';
export const UPDATE_OPERATIONS = 'UPDATE_OPERATIONS';
export const GET_DEFAULTPERMS = 'GET_DEFAULTPERMS';
export const UPDATE_DEFAULTPERMS = 'UPDATE_DEFAULTPERMS';
export const CHANGE_USERPERMS = 'CHANGE_USER_PERMS';
export const GET_ROLES = 'GET_ROLES';
export const UPDATE_ROLES = 'UPDATE_ROLES';

export function changeFormCreateUser (newFormState){
    return {type: CHANGE_FORM_CREATEUSER, newFormState}
}

export function submitUser (newUser){
    return {type: SUBMIT_USER, newUser}
}

export function getOperations(){
    return {type: GET_OPERATIONS}
}

export function updateOperations(operations){
    return {type: UPDATE_OPERATIONS, operations}
}

export function getDefaultPerms(){
    return {type: GET_DEFAULTPERMS}
}

export function updateDefaultPerms(defaultPerms){
    return {type: UPDATE_DEFAULTPERMS, defaultPerms}
}

export function updateUserPerms(position, newValue){
    return {type: CHANGE_USERPERMS, position, newValue}
}

export function getRoles() {
    return {type: GET_ROLES}
}

export function updateRoles(rolesList) {
    return {type: UPDATE_ROLES, rolesList}
}
