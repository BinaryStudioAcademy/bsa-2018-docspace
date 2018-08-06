// import { fork } from 'redux-saga/effects'
import signupWatcher from '../components/auth/signup/logic/signupSaga'
import loginWatcher from '../components/auth/login/logic/loginSaga'
// import greetingSaga from '../components/greeting/logic/greetingSaga'

function * rootSaga () {
  yield [
    // fork(greetingSaga)
    signupWatcher(),
    loginWatcher()

  ]
}

export default rootSaga
