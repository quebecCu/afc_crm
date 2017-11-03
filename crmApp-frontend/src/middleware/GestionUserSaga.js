import {eventChannel} from 'redux-saga';
import {take, call, fork, put} from 'redux-saga/effects';
import {SUBMIT_USER, submitUser, CHANGE_FORM_CREATEUSER, changeFormCreateUser} from '../actions/crmCreateUser';
import axios from 'axios';
import {push} from 'react-router-redux';
import {store} from '../store';

export function * createUser (){

    while(true){


        let user = yield take(SUBMIT_USER);
        let{role,
            nom,
            login,
            mdpProv,
            mail,
            permissionsUser
        } = user.newUser;

        console.log(role + nom + login + mdpProv + mail + permissionsUser[0] + permissionsUser[1]);

        //communication avec server
        var server = "http://localhost:3002/createUser";

        axios.post(server, {
            role: role,
            nom: nom,
            login: login,
            mdpProv: mdpProv,
            mail: mail,
            permissionsUser: permissionsUser

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

export function * gestionUserFlow () {
    yield fork (createUser);
}