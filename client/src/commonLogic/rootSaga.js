// import { fork } from 'redux-saga/effects'
import signupWatcher from '../components/auth/signup/logic/signupSaga'
// import greetingSaga from '../components/greeting/logic/greetingSaga'

function * rootSaga () {
  yield [
    // fork(greetingSaga)
    signupWatcher()
  ]
}

export default rootSaga
