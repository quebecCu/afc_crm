import {take, fork} from 'redux-saga/effects';
import axios from 'axios';
import {store} from '../store';
import {changeLoading} from "../actions/crmDashboard";
import {
	addArrayContacts,
	GET_CONTACTS, GET_POSTES_CONTACTS, updateContacts,
	updatePostesContacts
} from "../actions/crmContacts";

let tokenToSend = localStorage.getItem("cookieSession");
if (tokenToSend === undefined)
	tokenToSend = "";

let config = {
	headers: {
		"Authorization": tokenToSend
	}
};

export function* requestPostesContacts() {

	while (true) {

		yield take(GET_POSTES_CONTACTS);


		let server = "http://localhost:3002/clients/jobs";

		axios.get(server, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					store.dispatch(updatePostesContacts(response.data.message));
					store.dispatch(changeLoading(false));
				} else {
					alert('Erreur lors du chargement des postes d\'un contact');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

export function* requestContacts() {

	while (true) {

		let client = yield take(GET_CONTACTS);
		let id = client.idClient;

		let server = "http://localhost:3002/clients/contacts/"+ id;

		axios.get(server, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					store.dispatch(updateContacts(response.data.message));
					store.dispatch(changeLoading(false));
					store.dispatch(addArrayContacts(response.data.message));
				} else {
					alert('Erreur lors du chargement des contact');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}


export function * ContactsFlow() {
	yield fork(requestPostesContacts);
	yield fork(requestContacts);
}
