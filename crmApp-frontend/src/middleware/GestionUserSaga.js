import {eventChannel} from 'redux-saga';
import {take, call, fork, put} from 'redux-saga/effects';

import {
	CHANGE_FORM_CREATEUSER, GET_DEFAULTPERMS, GET_OPERATIONS, SUBMIT_USER, GET_ROLES,
	changeFormCreateUser, submitUser, updateDefaultPerms, updateOperations, updateRoles
} from '../actions/crmCreateUser';

import {
	GET_LIST_USERS, updateUsers
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
            login,
            mdpProv,
            mail,
            userPerms
        } = user.newUser;

        let mdpProvEncoded = CryptoJS.AES.encrypt(mdpProv, "secretKey13579").toString();

        //communication avec server
        var server = "http://localhost:3002/createUser";

        axios.post(server, {
            role: role,
            nom: nom,
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

        var server = "http://localhost:3002/getOperations";

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

        var server = "http://localhost:3002/getDefaultPerms";

        axios.get(server)
            .then(function(response){
                if(!!response.data.status && response.data.status === "success"){
                    store.dispatch(updateDefaultPerms(response.data.defaultPerms));
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

        console.log('loading user roles from back-end');

        //communication avec server
        var server = "http://localhost:3002/getRoles";

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

		var server = "http://localhost:3002/users/listUsers";

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

export function * gestionUserFlow() {
    yield fork (createUser);
	yield fork (getOperations);
	yield fork (getDefaultPerms);
	yield fork (getRoles);
	yield fork (getListUser);
}
