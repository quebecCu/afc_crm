import {eventChannel} from 'redux-saga';
import {take, call, fork, put} from 'redux-saga/effects';
import {LOGIN_REQUEST, SENDING_REQUEST, CHANGE_FORM, CLEAR_SESSION, LOGOUT, SET_AUTH} from '../actions/crmLogin';
import {hashSync , genSaltSync} from 'bcryptjs';
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

				store.dispatch(push('/PageAccueil'));
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
		yield put({ type: SET_AUTH, newAuthState: false })
		
		yield put({ type: CLEAR_SESSION})

		yield put(push("/login"))

		
	}
}


export function * AuthFlow () {
	yield fork (loginFlow)
	yield fork (logoutFlow)
	//a faire
//	yield fork (registerFlow)
}