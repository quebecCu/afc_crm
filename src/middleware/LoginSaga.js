import {take, fork, put} from 'redux-saga/effects';
import {
	LOGIN_REQUEST, SENDING_REQUEST, CLEAR_SESSION, LOGOUT, SET_AUTH, login, LOGIN, logout, CHECK_IF_LOGGED
} from '../actions/crmLogin';
//importer le salt pour le username et password
//import genSalt from '../salt';
import axios from 'axios';
import {push} from 'react-router-redux';
import {store} from '../store';
import {changeLoadingLogin} from "../actions/crmDashboard";

export function * loginFlow (){
	while(true){
		let request = yield take(LOGIN_REQUEST);
		let {username, password} = request.data;
		yield put ({ type: SENDING_REQUEST, sending:true});

		//communication avec server
		let server = "http://localhost:3002/login";
		//changer la location de la variable server pour plus de securite
		let backendUrl = window.location.host;
		backendUrl = backendUrl==='localhost:3000' ? server : 'https://afr-crm2.herokuapp.com/login';

		axios.post(backendUrl, {
			username: username,
			password: password,
		})
		.then(function (response) {
			store.dispatch(changeLoadingLogin(true));
			if(!!response.data.status && response.data.status=== "success"){
				let _isAdmin =response.data.message.isAdmin;
				let _cookie = response.data.message.cookie;
				let _iduser = response.data.message.iduser;

				let formStateAdm = {_auth:{
					cookie:_cookie,
					isAdmin: _isAdmin
				}};
				
				localStorage.setItem("idUser" , _iduser);	
				localStorage.setItem("cookieSession" ,_cookie);
				localStorage.setItem("username", username);
				localStorage.setItem("isAdmin", _isAdmin);

				store.dispatch(login(formStateAdm));
				document.getElementById("errorPassword").style.display = "none";
			}
			else
			{
				document.getElementById("errorPassword").style.display = "";
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

		let formStateLogout ={
					username:'',
					password: '',
					email:''
		};
		store.dispatch(logout(formStateLogout));
		 yield put(push("/"))
	}
}

export function * loginPush() {
	while(true) {
		yield take (LOGIN);
		yield put({ type: SET_AUTH, newAuthState: true });
		yield put(push("/dashboard"));
	}
}

export function * checkIfLogged() {
	while(true) {
		yield take (CHECK_IF_LOGGED);
		yield put({ type: SET_AUTH, newAuthState: true });
	}
}

export function * AuthFlow () {
	yield fork (loginFlow);
	yield fork (logoutFlow);
	yield fork (loginPush);
	yield fork (checkIfLogged);
	//yield fork (registerFlow);
}
