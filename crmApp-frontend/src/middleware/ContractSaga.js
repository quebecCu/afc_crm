import {take, fork} from 'redux-saga/effects';

import {
	GET_AGA, GET_EMPLOYES_AFC, GET_LIST_ASSUREURS, GET_LIST_CONTRACTS, setListContracts,
	updateAGA, updateEmployesAFC, updateListAssureurs,
} from '../actions/crmContract';

import axios from 'axios';
import {store} from '../store';

let tokenToSend = localStorage.getItem("cookieSession");
if (tokenToSend === undefined)
	tokenToSend = "";

let config = {
	headers: {
		"Authorization": tokenToSend
	}
};

export function* getAGA() {
	while (true) {
		yield take(GET_AGA);

		console.log('loading AGA list from middleware');

		//communication avec server
		let server = "http://localhost:3002/users/getRoles";
		let backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://salty-scrubland-22457.herokuapp.com/users/getRoles';

		axios.get(backendUrl, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					store.dispatch(updateAGA(response.data.roles));
				} else {
					alert('Erreur lors du chargement des roles');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

export function * requestlistContracts() {
	while (true) {
		yield take(GET_LIST_CONTRACTS);

		//communication avec server
		let server = "http://localhost:3002/collectiveContracts";
		//let backendUrl = window.location.host;
		//backendUrl = backendUrl === 'localhost:3000' ? server : 'https://salty-scrubland-22457.herokuapp.com/users/getRoles';

		axios.get(server, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					store.dispatch(setListContracts(response.data.message));
				} else {
					alert('Erreur lors du chargement des contracts');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

export function * ContractsFlow() {
	yield fork(requestlistContracts);
	yield fork(getAGA);
}
