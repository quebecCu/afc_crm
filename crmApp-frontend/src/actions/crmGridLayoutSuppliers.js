export const CHANGE_LAYOUT = 'CHANGE_LAYOUT';
export const CHANGE_GRID = 'CHANGE_GRID';
export const REQUEST_GRID_FOUR = 'REQUEST_GRID_FOUR';
export const CREATE_FOURNISSEUR_FILE = 'CREATE_FOURNISSEUR_FILE';
export const CHANGE_VIEW_GRID = 'CHANGE_VIEW_GRID';
export const UPDATE_FOURNISSEUR_FILE = 'UPDATE_FOURNISSEUR_FILE';
//export const GET_RELEVES = 'GET_RELEVES';
//export const GET_CHAMBRE_COMMERCE = 'GET_CHAMBRE_COMMERCE';
//export const UPDATE_RELEVES = 'UPDATE_RELEVES';
//export const UPDATE_CHAMBRE_COMMERCE = 'UPDATE_CHAMBRE_COMMERCE';

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
	return {type: REQUEST_GRID_FOUR}
}

export function createSuppliersFile(file) {
	return {type: CREATE_FOURNISSEUR_FILE, file}
}

export function updateSuppliersFile(file) {
	return {type: UPDATE_FOURNISSEUR_FILE, file}
}
//
//export function updateReleves(releves) {
//	return {type: UPDATE_RELEVES, releves}
//}
//
//export function updateChambreCommerce(chambreCommerce) {
//	return {type: UPDATE_CHAMBRE_COMMERCE, chambreCommerce}
//}
