import {take, fork} from 'redux-saga/effects';
import axios from 'axios';
import {store} from '../store';
import {bindClientData, GET_CLIENT_REQ} from "../actions/crmClientList";

export function* getClient() {

	while (true) {

		var tokenToSend = localStorage.getItem("cookieSession");
		if (tokenToSend == undefined)
			tokenToSend = "";

		var config = {
			headers: {
				"Authorization": tokenToSend
			}
		};

		let clientReq = yield take(GET_CLIENT_REQ);
		let client = clientReq.client;

		var server = "http://localhost:3002/clients/" + client.id;

		axios.get(server, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					console.log('client' + Object.keys(response.data.message));

					store.dispatch(bindClientData(client, response.data.message));
				} else {
					alert('Erreur lors du chargement du client');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}


export function* ClientListFlow() {
	yield fork(getClient);
}
