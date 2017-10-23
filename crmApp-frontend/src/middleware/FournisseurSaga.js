import {eventChannel} from 'redux-saga';
import {take, call, fork, put} from 'redux-saga/effects';
import {SENDING_REQUEST_FOUR, GET_REQUEST_FOUR, getRequestFour} from '../actions/crmRechercheFournisseur';
import {hashSync , genSaltSync} from 'bcryptjs';
import axios from 'axios';
import {push} from 'react-router-redux';
import {store} from '../store';

export function * getListFournisseurs (){
    while(true){

        let request = yield take(SENDING_REQUEST_FOUR);


        //communication avec server
        var server = "http://localhost:3002/fournisseurs";
        let res;
        axios.post(server, {
        })
            .then(function (response) {
                if(!!response.data.fournisseur ){
                    store.dispatch(getRequestFour(response.data.fournisseur));
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export function * FournisseursFlow () {
    yield fork (getListFournisseurs);
}