export const ADD_SUBUSER_NAV = 'ADD_SUBUSER_NAV';
export const DISPLAY_SUBUSER_NAV = 'DISPLAY_SUBUSER_NAV';
export const ADD_SUBCUSTOMER_NAV = 'ADD_SUBCUSTOMER_NAV';
export const DISPLAY_SUBCUSTOMER_NAV = 'DISPLAY_SUBCUSTOMER_NAV';

export function addSubUserNav (newSubUser){
	return {type: ADD_SUBUSER_NAV, newSubUser}
}

export function displaySubUserNav (display){
	return {type: DISPLAY_SUBUSER_NAV, display}
}

export function addSubCustomerNav (newSubCustomer){
	return {type: ADD_SUBCUSTOMER_NAV, newSubCustomer}
}

export function displaySubCustomerNav (display){
	return {type: DISPLAY_SUBCUSTOMER_NAV, display}
}
