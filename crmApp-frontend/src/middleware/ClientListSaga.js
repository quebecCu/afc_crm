import {take, fork} from 'redux-saga/effects';
import axios from 'axios';
import {store} from '../store';
import {bindClientData, GET_CLIENT_REQ} from "../actions/crmClientList";
import {changeLoading} from "../actions/crmDashboard";

export function* getClient() {

	while (true) {

		let tokenToSend = localStorage.getItem("cookieSession");
		if (tokenToSend === undefined)
			tokenToSend = "";

		let config = {
			headers: {
				"Authorization": tokenToSend
			}
		};

		let clientReq = yield take(GET_CLIENT_REQ);
		let id = clientReq.idClient;

		let server = "http://localhost:3002/clients/" + id;

		axios.get(server, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					store.dispatch(bindClientData(response.data.message));
					store.dispatch(changeLoading(false));
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
