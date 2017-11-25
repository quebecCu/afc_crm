export const GET_CLIENT_REQ = 'GET_CLIENT_REQ';
export const BIND_CLIENT_DATA = 'BIND_CLIENT_DATA';

export function getClientRequest(client) {
	return {type: GET_CLIENT_REQ, client}
}

export function bindClientData(clientData, clientOptionnalRows) {
	return {type: BIND_CLIENT_DATA, clientData, clientOptionnalRows}
}
