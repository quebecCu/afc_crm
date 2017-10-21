import {AuthFlow} from './LoginSaga';

import {ResetEmailFlow} from './ResetSaga';

import {call, all} from 'redux-saga/effects';



export default function * root(){
	
	yield all ([AuthFlow(), ResetEmailFlow()])
}