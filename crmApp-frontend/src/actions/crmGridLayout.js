export const CHANGE_LAYOUT = 'CHANGE_LAYOUT';
export const CHANGE_GRID = 'CHANGE_GRID';
export const REQUEST_GRID = 'REQUEST_GRID';
export const CREATE_CUSTOMER_FILE = 'CREATE_CUSTOMER_FILE';

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
