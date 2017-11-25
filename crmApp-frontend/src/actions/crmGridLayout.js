export const CHANGE_LAYOUT = 'CHANGE_LAYOUT';
export const CHANGE_GRID = 'CHANGE_GRID';
export const REQUEST_GRID = 'REQUEST_GRID';
export const CREATE_CUSTOMER_FILE = 'CREATE_CUSTOMER_FILE';
export const CHANGE_VIEW_GRID = 'CHANGE_VIEW_GRID';
export const UPDATE_CUSTOMER_FILE = 'UPDATE_CUSTOMER_FILE';
export const GET_RELEVES = 'GET_RELEVES';
export const GET_CHAMBRE_COMMERCE = 'GET_CHAMBRE_COMMERCE';
export const UPDATE_RELEVES = 'UPDATE_RELEVES';
export const UPDATE_CHAMBRE_COMMERCE = 'UPDATE_CHAMBRE_COMMERCE';

export function changeViewGrid (newView){
	return {type: CHANGE_VIEW_GRID, newView}
}

export function changeLayout (newLayout){
	return {type: CHANGE_LAYOUT, newLayout}
}

export function changeGrid (newGrid){
	return {type: CHANGE_GRID, newGrid}
}

export function requestGrid (){
	return {type: REQUEST_GRID}
}

export function createCustomerFile(file) {
	return {type: CREATE_CUSTOMER_FILE, file}
}

export function updateCustomerFile(file) {
	return {type: UPDATE_CUSTOMER_FILE, file}
}

export function updateReleves(releves) {
	return {type: UPDATE_RELEVES, releves}
}

export function updateChambreCommerce(chambreCommerce) {
	return {type: UPDATE_CHAMBRE_COMMERCE, chambreCommerce}
}
