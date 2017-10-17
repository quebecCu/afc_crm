import {AuthFlow} from './LoginSaga';
import {call, all} from 'redux-saga/effects';



export default function * root(){
	
	yield all ([AuthFlow()])
}