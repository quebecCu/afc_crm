export const GET_HISTORY_REQUEST = 'GET_HISTORY_REQUEST';
export const SET_HISTORY_REQUEST = 'SET_HISTORY_REQUEST';

export function getHistory(){
	return {type: GET_HISTORY_REQUEST}
}

export function setHistory(historique){
	return {type: SET_HISTORY_REQUEST,historique}
}