export const CHANGE_LAYOUT = 'CHANGE_LAYOUT';
export const CHANGE_GRID = 'CHANGE_GRID';
export const REQUEST_GRID = 'REQUEST_GRID';
export const CREATE_CUSTOMER_FILE = 'CREATE_CUSTOMER_FILE';
export const CHANGE_VIEW_GRID = 'CHANGE_VIEW_GRID';
export const UPDATE_CUSTOMER_FILE = 'UPDATE_CUSTOMER_FILE';


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
