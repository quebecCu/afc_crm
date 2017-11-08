import {take, fork, put} from 'redux-saga/effects';
import {
    LOGIN_REQUEST, SENDING_REQUEST, CLEAR_SESSION, LOGOUT, SET_AUTH, login, LOGIN
} from '../actions/crmLogin';
//importer le salt pour le username et password
//import genSalt from '../salt';
import axios from 'axios';
import {push} from 'react-router-redux';
import {store} from '../store';
import CryptoJS from 'crypto-js';

export function * loginFlow (){
	while(true){
		let request = yield take(LOGIN_REQUEST);
		let {username, password} = request.data;
		 
		yield put ({ type: SENDING_REQUEST, sending:true});
				

		var encrypted = CryptoJS.AES.encrypt(password, "secretKey13579").toString();
	
		//communication avec server
		var server = "http://localhost:3002/login";
		//changer la location de la variable server pour plus de securite 
		
		axios.post(server, {
			username: username,
			password: encrypted
		})
		.then(function (response) {
			if(!!response.data.status && response.data.status=== "success"){
				store.dispatch(login());
			}
			else {
				alert ("identifiant ou mot de passe incorrects");
			}
		})
		.catch(function (error) {
			console.log(error);
		});
		
	}
}  

export function * logoutFlow() {
	while(true){
		yield take (LOGOUT);
		yield put({ type: SET_AUTH, newAuthState: false });
		
		yield put({ type: CLEAR_SESSION});

		yield put(push("/"))

		
	}
}

export function * loginPush() {
	while(true) {
		yield take (LOGIN);
        yield put({ type: SET_AUTH, newAuthState: true });
        yield put(push("/Home"));

	}
}


export function * AuthFlow () {
	yield fork (loginFlow);
	yield fork (logoutFlow);
	yield fork (loginPush);
	//a faire
//	yield fork (registerFlow)
}