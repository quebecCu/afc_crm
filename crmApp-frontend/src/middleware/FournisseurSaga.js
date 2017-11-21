import {take, fork} from 'redux-saga/effects';
import {SENDING_REQUEST_FOUR, getRequestFour} from '../actions/crmRechercheFournisseur';
import axios from 'axios';
import {store} from '../store';

export function * getListFournisseurs (){
	while(true){

		yield take(SENDING_REQUEST_FOUR);

		var tokenToSend= localStorage.getItem("cookieSession");
		if(tokenToSend == undefined)
			tokenToSend="";
		
		var config ={
				headers: {
					"Authorization": tokenToSend 
				} 
		}
		//communication avec server
		var server = "http://localhost:3002/fournisseurs";
		
		var backendUrl = window.location.host;
		backendUrl = backendUrl==='localhost:3000' ? server : 'https://salty-scrubland-22457.herokuapp.com/fournisseurs';
		
		console.log("test  " )

		axios.post(backendUrl, {	
			
		}, config)
		
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