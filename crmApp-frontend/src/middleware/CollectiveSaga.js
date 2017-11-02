
import {eventChannel} from 'redux-saga';
import {take, call, fork, put} from 'redux-saga/effects';
import {SEARCH_REQUEST_COLL, SENDING_REQUEST, CHANGE_FORM_COLL,getRequestClientColl} from '../actions/crmRechercheCollective';
import axios from 'axios';
import {push} from 'react-router-redux';
import {store} from '../store';

export function * searchFlow (){
	while(true){
		
		let search = yield take(SEARCH_REQUEST_COLL);
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
        axios.post(server, {
        })
            .then(function (response) {
                if(!!response.data.clients ){
                    store.dispatch(getRequestClientColl(response.data.clients));
                }
            })
            .catch(function (error) {
                console.log(error);
            });
		
	}
}  



export function * SearchCollectiveFlow () {
	yield fork (searchFlow)
} 