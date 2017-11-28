import {take, fork} from 'redux-saga/effects';

import {
	GET_AGA, GET_EMPLOYES_AFC, GET_LIST_ASSUREURS,
	updateAGA, updateEmployesAFC, updateListAssureurs,
} from '../actions/crmContract';

import axios from 'axios';
import {store} from '../store';
import {updateListAssureurs} from "../actions/crmContract";

export function* getAGA() {
	while (true) {
		yield take(GET_AGA);

		console.log('loading AGA list from middleware');

		//communication avec server
		var server = "http://localhost:3002/users/getRoles";
		var backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://salty-scrubland-22457.herokuapp.com/users/getRoles';

		var tokenToSend = localStorage.getItem("cookieSession");
		if (tokenToSend === undefined)
			tokenToSend = "";

		var config = {
			headers: {
				"Authorization": tokenToSend
			}
		}
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
