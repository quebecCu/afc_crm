import {AuthFlow} from './LoginSaga';
import {ResetEmailFlow} from './ResetSaga';
import {ResetPasswordFlow} from './ResetPasswordSaga';
import {SearchCollectiveFlow} from './CollectiveSaga';
import {call, all} from 'redux-saga/effects';
import {FournisseursFlow} from "./FournisseurSaga";



export default function * root(){
	
	yield all ([AuthFlow(), ResetEmailFlow(), SearchCollectiveFlow(), FournisseursFlow(), ResetPasswordFlow()])
}