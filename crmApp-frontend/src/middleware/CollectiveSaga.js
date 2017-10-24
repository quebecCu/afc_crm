
import {eventChannel} from 'redux-saga';
import {take, call, fork, put} from 'redux-saga/effects';
import {SEARCH_REQUEST, SENDING_REQUEST, CHANGE_FORM} from '../actions/crmRechercheCollective';
import axios from 'axios';
import {push} from 'react-router-redux';
import {store} from '../store';

export function * searchFlow (){
	while(true){
		
		let search = yield take(SEARCH_REQUEST);
		let {nomEntreprise,
			nomEmploye,
			numeroPolice,
			nomAssureur,
			moisRenouvellement,
			clientActif,
			statutProspect} = search.data;
		 
		yield put ({ type: SENDING_REQUEST, sending:true})
		
		//communication avec server
		var server = "http://localhost:3002/assurancesCollectives";
		//changer la location de la variable server pour plus de securite 
//		
//		axios.post(server, {
//			username: username,
//			password: hash
//		})
//		.then(function (response) {
////			console.log(response.data.res);
//			if(!!response.data.res && response.data.res== "true"){
//				store.dispatch(push('/PageAccueil'));
//			}
//			else {
//				alert ("identifiant ou mot de passe incorrects");
//			}
////			callbackResponse: {response.data.res}
//		})
//		.catch(function (error) {
//			console.log(error);
//		});
		
	}
}  



export function * SearchCollectiveFlow () {
	yield fork (searchFlow)
} 