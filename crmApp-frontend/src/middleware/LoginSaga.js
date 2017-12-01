import {take, fork, put} from 'redux-saga/effects';
import {
	LOGIN_REQUEST, SENDING_REQUEST, CLEAR_SESSION, LOGOUT, SET_AUTH, login, LOGIN
} from '../actions/crmLogin';
//importer le salt pour le username et password
//import genSalt from '../salt';
import axios from 'axios';
import {push} from 'react-router-redux';
import {store} from '../store';

export function * loginFlow (){
	while(true){
		let request = yield take(LOGIN_REQUEST);
		let {username, password} = request.data;
		yield put ({ type: SENDING_REQUEST, sending:true});


		//communication avec server
		let server = "http://localhost:3002/login";
		//changer la location de la variable server pour plus de securite
		let backendUrl = window.location.host;
		backendUrl = backendUrl==='localhost:3000' ? server : 'https://salty-scrubland-22457.herokuapp.com/login';


		axios.post(backendUrl, {
			username: username,
			password: password
		})
		.then(function (response) {
			if(!!response.data.status && response.data.status=== "success"){
				let _isAdmin =response.data.message.isAdmin;
				let _cookie = response.data.message.cookie;
				let formStateAdm ={_auth:{
					cookie:_cookie,
					isAdmin: _isAdmin
				}};
				localStorage.setItem("cookieSession" ,_cookie);
				store.dispatch(login(formStateAdm));
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

		localStorage.removeItem("cookieSession");

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
