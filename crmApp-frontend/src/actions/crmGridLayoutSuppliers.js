export const CHANGE_LAYOUT_FOUR = 'CHANGE_LAYOUT_FOUR';
export const CHANGE_GRID_FOUR = 'CHANGE_GRID_FOUR';
export const REQUEST_GRID_FOUR = 'REQUEST_GRID_FOUR';
export const CREATE_FOURNISSEUR_FILE = 'CREATE_FOURNISSEUR_FILE';
export const CHANGE_VIEW_GRID_FOUR = 'CHANGE_VIEW_GRID_FOUR';
export const UPDATE_FOURNISSEUR_FILE = 'UPDATE_FOURNISSEUR_FILE';
//export const GET_RELEVES = 'GET_RELEVES';
//export const GET_CHAMBRE_COMMERCE = 'GET_CHAMBRE_COMMERCE';
//export const UPDATE_RELEVES = 'UPDATE_RELEVES';
//export const UPDATE_CHAMBRE_COMMERCE = 'UPDATE_CHAMBRE_COMMERCE';

export function changeViewGridFour (newView){
	return {type: CHANGE_VIEW_GRID_FOUR, newView}
}

export function changeLayoutFour (newLayout){
	return {type: CHANGE_LAYOUT_FOUR, newLayout}
}

export function changeGridFour (newGrid){
	return {type: CHANGE_GRID_FOUR, newGrid}
}

export function requestGridFour (){
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
