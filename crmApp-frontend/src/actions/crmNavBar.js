export const ADD_SUBUSER_NAV = 'ADD_SUBUSER_NAV';
export const DISPLAY_SUBUSER_NAV = 'DISPLAY_SUBUSER_NAV';

export function addSubUserNav (newSubUser){
	return {type: ADD_SUBUSER_NAV, newSubUser}
}

export function displaySubUserNav (display){
	return {type: DISPLAY_SUBUSER_NAV, display}
}
