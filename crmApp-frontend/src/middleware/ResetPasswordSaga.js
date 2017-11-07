/** Imports **/
import axios from 'axios';
import CryptoJS from 'crypto-js';
import {push} from 'react-router-redux';
import {fork, put, take} from 'redux-saga/effects';
import {RESET_PASSWORD_REQUEST, SENDING_PASSWORD_REQUEST} from '../actions/crmResetPassword';
import {store} from '../store';

export function* resetPasswordFlow() {
	while (true) {

		let reset = yield take(RESET_PASSWORD_REQUEST);
		let {newPassword, confirmPassword} = reset.data;
		let token = reset.token;

		yield put({type: SENDING_PASSWORD_REQUEST, sending: true});

		let encryptedNewPassword = CryptoJS.AES.encrypt(newPassword, "secretKey24680").toString();
		let encryptedConfirmPassword = CryptoJS.AES.encrypt(confirmPassword, "secretKey24680").toString();

		// TODO: Add a .ENV file
		let server = "http://localhost:3002/ResetPassword";
		//changer la location de la variable server pour plus de securite

		axios.post(server, {
			confirmPassword: encryptedConfirmPassword,
			newPassword: encryptedNewPassword,
			token: token

		})
			.then(function (response) {

				console.log(response.data.emailSent);

				if (!!response.data && response.data.status === "success") {
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

export function* ResetPasswordFlow() {
	yield fork(resetPasswordFlow)
}
