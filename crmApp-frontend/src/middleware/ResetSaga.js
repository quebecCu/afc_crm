import {eventChannel} from 'redux-saga';
import {take, call, fork, put} from 'redux-saga/effects';
import {RESET_REQUEST, SENDING_REQUEST, CHANGE_FORM, SET_AUTH} from '../actions/crmReset';
import {hashSync , genSaltSync} from 'bcryptjs';
//importer le salt pour le username et password
//import genSalt from '../salt';
import axios from 'axios';
import {push} from 'react-router-redux';
import {store} from '../store';

export function * resetFlow (){
	while(true){
		
		let reset = yield take(RESET_REQUEST);
		let {email} = request.data;
		 
		yield put ({ type: SENDING_REQUEST, sending:true})
		
	}
}  


export function * AuthFlow () {
	yield fork (resetFlow)
}