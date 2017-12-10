export const CHANGE_VIEW_CONTRACT = 'CHANGE_VIEW_CONTRACT';
export const CHANGE_FORM_CONTRACT = 'CHANGE_FORM_CONTRACT';
export const GET_EMPLOYES_AFC = 'GET_EMPLOYES_AFC';
export const UPDATE_EMPLOYES_AFC = 'UPDATE_EMPLOYES_AFC';
export const GET_LIST_ASSUREURS = 'GET_LIST_ASSUREURS';
export const UPDATE_LIST_ASSUREURS = 'UPDATE_LIST_ASSUREURS';
export const GET_AGA = 'GET_AGA';
export const UPDATE_AGA = 'UPDATE_AGA';
export const GET_LIST_CONTRACTS = 'GET_LIST_CONTRACTS';
export const SET_LIST_CONTRACTS = 'SET_LIST_CONTRACTS';
export const CHANGE_SEARCH_CONTRACTS = 'CHANGE_SEARCH_CONTRACTS';
export const CHANGE_BIG_LAYOUT = 'CHANGE_BIG_LAYOUT';
export const CHANGE_LIL_LAYOUT = 'CHANGE_LIL_LAYOUT';


export function changeViewContract (newView){
	return {type: CHANGE_VIEW_CONTRACT, newView}
}

export function changeFormContract (newForm){
	return {type: CHANGE_FORM_CONTRACT, newForm}
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

export function getListContracts() {
	return {type: GET_LIST_CONTRACTS}
}

export function setListContracts(contracts) {
	return {type: SET_LIST_CONTRACTS, contracts}
}

export function changeSearchContracts(search) {
	return {type: CHANGE_SEARCH_CONTRACTS, search}
}

export function changeBigLayout(layout) {
	return {type: CHANGE_BIG_LAYOUT, layout}
}

export function changeLilLayout(layout) {
	return {type: CHANGE_LIL_LAYOUT, layout}
}
