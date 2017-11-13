export const CHANGE_VIEW_UM = 'CHANGE_VIEW_UM';
export const GET_LIST_USERS = 'GET_LIST_USERS';
export const UPDATE_USERS = 'UPDATE_USERS';


export function changeViewUserManagement (newView){
    return {type: CHANGE_VIEW_UM, newView}
}

export function getListUser() {
	return {type: GET_LIST_USERS}
}

export function updateUsers(newList) {
	return {type: UPDATE_USERS, newList}
}
