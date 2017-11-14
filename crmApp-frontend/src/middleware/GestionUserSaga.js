import {take, fork} from 'redux-saga/effects';

import {
	CHANGE_FORM_CREATEUSER, GET_DEFAULTPERMS, GET_OPERATIONS, SUBMIT_USER, GET_ROLES,
	changeFormCreateUser, submitUser, updateDefaultPerms, updateOperations, updateRoles
} from '../actions/crmCreateUser';

import {
	GET_LIST_USERS, REQUEST_USER_BY_ID, updateUsers, updateUserToDisplay
} from '../actions/crmUserManagement';

import axios from 'axios';
import {push} from 'react-router-redux';
import {store} from '../store';
import CryptoJS from 'crypto-js';

export function * createUser () {

    while(true){

        let user = yield take(SUBMIT_USER);
        let{role,
            nom,
			prenom,
            login,
            mdpProv,
            mail,
            userPerms
        } = user.newUser;

        let mdpProvEncoded = CryptoJS.AES.encrypt(mdpProv, "secretKey13579").toString();

        //communication avec server
        var server = "http://localhost:3002/users/create";

        axios.post(server, {
            role: role,
            nom: nom,
			prenom: prenom,
            login: login,
            mdpProv: mdpProvEncoded,
            mail: mail,
            userPerms: userPerms
        })
            .then(function (response) {
                if(!!response.data.status && response.data.status === "success"){
                    alert ('L\'utilisateur a été créé avec succès');
                    store.dispatch(push("/PageAccueil/admin"));
                } else {
                    alert ('Erreur lors de la création de l\'utilisateur');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export function * getOperations() {
    while(true){
        yield take(GET_OPERATIONS);

		console.log('loading operations from back-end');

        var server = "http://localhost:3002/users/getOperations";

        axios.get(server)
            .then(function(response){
                if(!!response.data.status && response.data.status === "success"){
                    store.dispatch(updateOperations(response.data.operations));
                } else {
                    alert("Erreur lors du chargement des operations");
                }
            })
            .catch(function(error){
                console.log(error);
            })
    }
}

export function * getDefaultPerms() {
    while(true){

        yield take(GET_DEFAULTPERMS);
        console.log("on passe par getDefaultPerms middleware");

        var server = "http://localhost:3002/users/defaultPerms";

        axios.get(server)
            .then(function(response){
                if(!!response.data.status && response.data.status === "success"){
                    store.dispatch(updateDefaultPerms(response.data.message));
                } else {
                    alert("Erreur lors du chargement des operations");
                }
            })
            .catch(function(error){
                console.log(error);
            })
    }
}

export function * getRoles() {
    while(true){
        yield take(GET_ROLES);

        console.log('loading user roles from middleware');

        //communication avec server
        var server = "http://localhost:3002/users/getRoles";

        axios.get(server)
            .then(function (response) {
                if(!!response.data.status && response.data.status === "success"){
                    store.dispatch(updateRoles(response.data.roles));
                } else {
                    alert ('Erreur lors du chargement des roles');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export function * getListUser() {
	while(true) {
		yield take(GET_LIST_USERS);

		console.log('loading users from back-end');

		var server = "http://localhost:3002/users/list";

		axios.get(server)
			.then(function (response) {
				if(!!response.data.status && response.data.status === "success") {
					console.log('users list' + response.data.users);
					store.dispatch(updateUsers(response.data.users));
				} else {
					alert ('Erreur lors du chargement des utilisateurs');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

export function * requestUserToDisplay(){
	while(true) {
		let user = yield take(REQUEST_USER_BY_ID);
		console.log(user);
		let{id} = user.id;

		console.log('loading user to display from back-end' + user.id);

		var server = "http://localhost:3002/users/user/"+user.id;

		axios.get(server)
			.then(function (response) {
				if(!!response.data.status && response.data.status === "success") {
					console.log('user' + response.data.message);

					store.dispatch(updateUserToDisplay(response.data.message));
				} else {
					alert ('Erreur lors du chargement des utilisateurs');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}


export function * gestionUserFlow() {
    yield fork (createUser);
	yield fork (getOperations);
	yield fork (getDefaultPerms);
	yield fork (getRoles);
	yield fork (getListUser);
	yield fork (requestUserToDisplay)
}
