/** Imports **/
import axios from 'axios';
import CryptoJS from 'crypto-js';
import {push} from 'react-router-redux';

import 'react-s-alert/dist/s-alert-default.css';

import {fork, put, take} from 'redux-saga/effects';
import {RESET_PASSWORD_REQUEST, sendingRequest} from '../actions/crmResetPassword';
import {store} from '../store';

export function* resetPasswordFlow() {

	while (true) {

		let reset = yield take(RESET_PASSWORD_REQUEST);
		let {newPassword, confirmPassword} = reset.data;
		let resetToken = reset.token;

		yield put(sendingRequest(true));

		let encryptedNewPassword = CryptoJS.AES.encrypt(newPassword, "secretKey24680").toString();
		let encryptedConfirmPassword = CryptoJS.AES.encrypt(confirmPassword, "secretKey24680").toString();

		// TODO: Add a .ENV file?
		let server = "http://localhost:3002/ResetPassword";
		//changer la location de la variable server pour plus de securite

		axios.post(server, {
			confirmPassword: encryptedConfirmPassword,
			newPassword: encryptedNewPassword,
			resetToken: resetToken
		}).then((response) => {
			if (!!response.data && response.data.status === 'success') {
				alert("Votre mot de passe a été changé");
				store.dispatch(push('/'));
			}
			else {
				// rajouter une alert
				alert('Mot de passe non changé\n\n' + response.data.message);
			}
		})
			.catch((error) => {
				console.log(error);
			});
	}
}

export function* ResetPasswordFlow() {
	yield fork(resetPasswordFlow)
}
