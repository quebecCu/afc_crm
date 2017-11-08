import {take, fork} from 'redux-saga/effects';
import {SUBMIT_USER} from '../actions/crmCreateUser';
import axios from 'axios';
import {push} from 'react-router-redux';
import {store} from '../store';
import CryptoJS from 'crypto-js';

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
        
        let mdpProvEncoded = CryptoJS.AES.encrypt(mdpProv, "secretKey13579").toString();

        //communication avec server
        var server = "http://localhost:3002/createUser";

        axios.post(server, {
            role: role,
            nom: nom,
            login: login,
            mdpProv: mdpProvEncoded,
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