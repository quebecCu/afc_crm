import {take, fork} from 'redux-saga/effects';

import {
	GET_DEFAULTPERMS, GET_OPERATIONS, SUBMIT_USER, GET_ROLES, UPDATE_USER,
	updateDefaultPerms, updateOperations, updateRoles,
} from '../actions/crmCreateUser';

import {
	GET_LIST_USERS, REQUEST_USER_BY_ID, DELETE_USER, updateUsers, updateUserToDisplay, getListUser
} from '../actions/crmUserManagement';

import axios from 'axios';
import {store} from '../store';
import CryptoJS from 'crypto-js';


export function* createUser() {

	while (true) {

		let user = yield take(SUBMIT_USER);

		let {
			role,
			nom,
			prenom,
			login,
			mdpProv,
			mail,
			userPerms
		} = user.newUser;

		let mdpProvEncoded = CryptoJS.AES.encrypt(mdpProv, "secretKey13579").toString();
		var tokenToSend = localStorage.getItem("cookieSession");
		if (tokenToSend == undefined)
			tokenToSend = "";
		var config = {
			headers: {
				"Authorization": tokenToSend
			}
		}

		//communication avec server
		var server = "http://localhost:3002/users/create";

		axios.post(server, {
			role: role,
			nom: nom,
			prenom: prenom,
			login: login,
			mdpProv: mdpProvEncoded,
			mail: mail,
			userPerms: userPerms,
		}, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					alert('L\'utilisateur a été créé avec succès');
					store.dispatch(getListUser());
				}
				else if (response.data.status === "fail") {
					alert(response.data.message);
				}
				else {
					alert('Erreur lors de la création de l\'utilisateur');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}


export function* updateUser() {
	while (true) {

		let user = yield take(UPDATE_USER);
		let {
			id,
			role,
			nom,
			prenom,
			login,
			mail,
			userPerms
		} = user.updatedUser;

		var tokenToSend = localStorage.getItem("cookieSession");
		if (tokenToSend == undefined)
			tokenToSend = "";
		var config = {
			headers: {
				"Authorization": tokenToSend
			}
		}
		//communication avec server
		var server = "http://localhost:3002/users/update/";

		axios.post(server, {
			id: id,
			role: role,
			nom: nom,
			prenom: prenom,
			login: login,
			mail: mail,
			userPerms: userPerms,
		}, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					alert('L\'utilisateur a été modifié avec succès');
					store.dispatch(getListUser());
				}
				else if (response.data.status === "fail") {
					alert(response.data.message);
				}
				else {
					alert('Erreur lors de la modification de l\'utilisateur');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

export function* deleteUser() {
	while (true) {

		var tokenToSend = localStorage.getItem("cookieSession");
		if (tokenToSend == undefined)
			tokenToSend = "";

		var config = {
			headers: {
				"Authorization": tokenToSend
			}
		}

		let id = yield take(DELETE_USER);

		//communication avec server
		var server = "http://localhost:3002/users/user/" + id.id;

		axios.delete(server, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					alert('L\'utilisateur a été supprimé avec succès');
					store.dispatch(getListUser());
				} else {
					alert('Erreur lors de la suppression de l\'utilisateur');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

export function* getOperations() {
	while (true) {
		yield take(GET_OPERATIONS);
		var tokenToSend = localStorage.getItem("cookieSession");
		if (tokenToSend == undefined)
			tokenToSend = "";

		var config = {
			headers: {
				"Authorization": tokenToSend
			}
		}
		var server = "http://localhost:3002/users/operations";

		axios.get(server, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					store.dispatch(updateOperations(response.data.message));
				} else {
					alert("Erreur lors du chargement des operations");
				}
			})
			.catch(function (error) {
				console.log(error);
			})
	}
}

export function* getDefaultPerms() {
	while (true) {

		yield take(GET_DEFAULTPERMS);
		console.log("on passe par getDefaultPerms middleware");
		var tokenToSend = localStorage.getItem("cookieSession");
		if (tokenToSend == undefined)
			tokenToSend = "";

		var config = {
			headers: {
				"Authorization": tokenToSend
			}
		}
		var server = "http://localhost:3002/users/defaultPerms";

		axios.get(server, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					store.dispatch(updateDefaultPerms(response.data.message));
				} else {
					alert("Erreur lors du chargement des operations");
				}
			})
			.catch(function (error) {
				console.log(error);
			})
	}
}

export function* getRoles() {
	while (true) {
		yield take(GET_ROLES);

		console.log('loading user roles from middleware');

		//communication avec server
		var server = "http://localhost:3002/users/getRoles";
		var tokenToSend = localStorage.getItem("cookieSession");
		if (tokenToSend == undefined)
			tokenToSend = "";

		var config = {
			headers: {
				"Authorization": tokenToSend
			}
		}
		axios.get(server, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					store.dispatch(updateRoles(response.data.roles));
				} else {
					alert('Erreur lors du chargement des roles');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

export function* getListUsers() {
	while (true) {
		yield take(GET_LIST_USERS);

		console.log('loading users from back-end');

		var server = "http://localhost:3002/users/list";
		var tokenToSend = localStorage.getItem("cookieSession");
		if (tokenToSend == undefined)
			tokenToSend = "";

		var config = {
			headers: {
				"Authorization": tokenToSend
			}
		}
		axios.get(server, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					console.log('users list' + response.data.users);
					store.dispatch(updateUsers(response.data.users));
				} else {
					alert('Erreur lors du chargement des utilisateurs');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

export function* requestUserToDisplay() {
	while (true) {
		let user = yield take(REQUEST_USER_BY_ID);
		let {id} = user.id;

		console.log('user : ' + user);
		console.log('loading user to display from back-end with user id : ' + user.id);

		var tokenToSend = localStorage.getItem("cookieSession");
		if (tokenToSend == undefined)
			tokenToSend = "";

		var config = {
			headers: {
				"Authorization": tokenToSend
			}
		}
		var server = "http://localhost:3002/users/user/" + user.id;

		axios.get(server, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					console.log('user' + response.data.message);

					store.dispatch(updateUserToDisplay(response.data.message));
				} else {
					alert('Erreur lors du chargement des utilisateurs');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}


export function* gestionUserFlow() {
	yield fork(createUser);
	yield fork(getOperations);
	yield fork(getDefaultPerms);
	yield fork(getRoles);
	yield fork(getListUsers);
	yield fork(requestUserToDisplay);
	yield fork(updateUser);
	yield fork(deleteUser);
}
