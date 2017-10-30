import {eventChannel} from 'redux-saga';
import {take, call, fork, put} from 'redux-saga/effects';
import {RESET_PASSWORD_REQUEST, SENDING_PASSWORD_REQUEST, CHANGE_FORM, SET_PASSWORD_AUTH} from '../actions/crmResetPassword';
import {hashSync , genSaltSync} from 'bcryptjs';
//importer le salt pour le username et password
//import genSalt from '../salt';
import axios from 'axios';
import {push} from 'react-router-redux';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import {store} from '../store';
import CryptoJS from 'crypto-js';

export function * resetPasswordFlow (){
	while(true){
		
		let reset = yield take(RESET_PASSWORD_REQUEST);
		let {newPassword, confirmPassword} = reset.data;
		 
		yield put ({ type: SENDING_PASSWORD_REQUEST, sending:true})
		
		var encryptedNewPassword = CryptoJS.AES.encrypt(newPassword, "secretKey24680").toString();
		var encryptedConfirmPassword = CryptoJS.AES.encrypt(confirmPassword, "secretKey24680").toString();
		//communication avec server
		var server = "http://localhost:3002/ResetPassword";
		//changer la location de la variable server pour plus de securite 
		
		axios.post(server, {
			newPassword: encryptedNewPassword,
			confirmPassword: encryptedConfirmPassword 
		})
		.then(function (response) {
//			console.log(response.data.emailSent);
			if(!!response.data && response.data.status === "success"){
				alert("votre MP a été changé");
				store.dispatch(push('/'));
			}
			else {
				// rajouter une alert 
				alert("MP non changé il y a eu un pblm etc ");
			}
//			callbackResponse: {response.data.res}
		})
		.catch(function (error) {
			console.log(error);
		});
	}
}  


export function * ResetPasswordFlow () {
	yield fork (resetPasswordFlow)
}