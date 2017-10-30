import {eventChannel} from 'redux-saga';
import {take, call, fork, put} from 'redux-saga/effects';
import {RESET_REQUEST, SENDING_REQUEST, CHANGE_FORM, SET_AUTH} from '../actions/crmReset';
import {hashSync , genSaltSync} from 'bcryptjs';
//importer le salt pour le username et password
//import genSalt from '../salt';
import axios from 'axios';
import {push} from 'react-router-redux';
import {store} from '../store';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';

export function * resetFlow (){
	while(true){
		
		let reset = yield take(RESET_REQUEST);
		let {email} = reset.data;
		 
		yield put ({ type: SENDING_REQUEST, sending:true})
		
		//communication avec server
		var server = "http://localhost:3002/Reset";
		//changer la location de la variable server pour plus de securite 
		
		axios.post(server, {
			email: email,
		})
		.then(function (response) {
//			console.log(response.data.emailSent);
			if(!!response.data && response.data.status === "success"){
				alert("Veuillez consulter vos courriels svp");
				store.dispatch(push('/'));
			}
			else {
				// rajouter une alert 
				alert("Ce courriel n'est pas present dans nos dossiers ");
			}
//			callbackResponse: {response.data.res}
		})
		.catch(function (error) {
			console.log(error);
		});
	}
}  


export function * ResetEmailFlow () {
	yield fork (resetFlow)
}