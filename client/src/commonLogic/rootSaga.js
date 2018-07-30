import { fork } from 'redux-saga/effects';
import greetingSaga from '../components/greeting/logic/greetingSaga';

function* rootSaga() {
  yield [
    fork(greetingSaga),
  ];
}


export default rootSaga;
