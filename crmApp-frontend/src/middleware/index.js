import {AuthFlow} from './LoginSaga';
import {ResetEmailFlow} from './ResetSaga';
import {ResetPasswordFlow} from './ResetPasswordSaga';
import {SearchCollectiveFlow} from './CollectiveSaga';
import {all} from 'redux-saga/effects';
import {FournisseursFlow} from "./FournisseurSaga";
import{gestionUserFlow} from "./GestionUserSaga";


export default function * root(){
	
	yield all ([AuthFlow(), ResetEmailFlow(), SearchCollectiveFlow(), FournisseursFlow(), ResetPasswordFlow(), gestionUserFlow()])
}