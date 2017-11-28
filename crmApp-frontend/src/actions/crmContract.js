export const CHANGE_VIEW_CONTRACT = 'CHANGE_VIEW_CONTRACT';
export const GET_EMPLOYES_AFC = 'GET_EMPLOYES_AFC';
export const UPDATE_EMPLOYES_AFC = 'UPDATE_EMPLOYES_AFC';
export const GET_LIST_ASSUREURS = 'GET_LIST_ASSUREURS';
export const UPDATE_LIST_ASSUREURS = 'UPDATE_LIST_ASSUREURS';
export const GET_AGA = 'GET_AGA';
export const UPDATE_AGA = 'UPDATE_AGA';

export function changeViewContract (newView){
	return {type: CHANGE_VIEW_CONTRACT, newView}
}

export function getEmployesAFC(){
	return {type: GET_EMPLOYES_AFC}
}

export function updateEmployesAFC(listEmployes){
	return {type: UPDATE_EMPLOYES_AFC, listEmployes}
}
//nomassureurs et AGA
export function getListAssureurs(){
	return {type: GET_LIST_ASSUREURS}
}

export function updateListAssureurs(listAssureurs){
	return {type: UPDATE_LIST_ASSUREURS, listAssureurs}
}

export function getAGA(){
	return {type: GET_AGA}
}

export function updateAGA(listAGA){
	return {type: UPDATE_AGA, listAGA}
}
