import {take, fork} from 'redux-saga/effects';

import {
	GET_AGA, GET_EMPLOYES_AFC, GET_LIST_ASSUREURS, GET_LIST_CONTRACTS, getEmployesAFC, getListAssureurs,
	setListContracts,
	updateAGA, updateEmployesAFC, updateListAssureurs,
} from '../actions/crmContract';

import axios from 'axios';
import {store} from '../store';
import {sendingRequestColl} from "../actions/crmRechercheCollective";

let tokenToSend = localStorage.getItem("cookieSession");
if (tokenToSend === undefined)
	tokenToSend = "";

let config = {
	headers: {
		"Authorization": tokenToSend
	}
};

export function* requestAGA() {
	while (true) {
		yield take(GET_AGA);

		//communication avec server
		let server = "http://localhost:3002/clients/aga";
		//let backendUrl = window.location.host;
		//backendUrl = backendUrl === 'localhost:3000' ? server : 'https://salty-scrubland-22457.herokuapp.com/users/getRoles';

		axios.get(server, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					store.dispatch(updateAGA(response.data.message));
					store.dispatch(getEmployesAFC());
				} else {
					alert('Erreur lors du chargement des AGAs');
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

export function* requestAFC() {
	while (true) {
		yield take(GET_EMPLOYES_AFC);

		//communication avec server
		let server = "http://localhost:3002/collectiveContracts/employesafc";
		//let backendUrl = window.location.host;
		//backendUrl = backendUrl === 'localhost:3000' ? server : 'https://salty-scrubland-22457.herokuapp.com/users/getRoles';

		axios.get(server, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					store.dispatch(updateEmployesAFC(response.data.message));
					store.dispatch(getListAssureurs());
				} else {
					alert('Erreur lors du chargement des employes');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

export function* requestFourniseurs() {
	while (true) {
		yield take(GET_LIST_ASSUREURS);

		//communication avec server
		let server = "http://localhost:3002/providers";
		//let backendUrl = window.location.host;
		//backendUrl = backendUrl === 'localhost:3000' ? server : 'https://salty-scrubland-22457.herokuapp.com/users/getRoles';

		axios.get(server, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					store.dispatch(updateListAssureurs(response.data.message));
					store.dispatch(sendingRequestColl());
				} else {
					alert('Erreur lors du chargement des fournisseurs');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

export function * ContractsFlow() {
	yield fork(requestlistContracts);
	yield fork(requestAGA);
	yield fork(requestAFC);
	yield fork(requestFourniseurs)
}
