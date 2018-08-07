import { fork } from 'redux-saga/effects'
import signupWatcher from '../components/auth/signup/logic/signupSaga'
import loginWatcher from '../components/auth/login/logic/loginSaga'
import spaceSaga from '../components/space/logic/spaceSaga'

function * rootSaga () {
  yield [
    fork(spaceSaga),
    signupWatcher(),
    loginWatcher()
  ]
}

export default rootSaga
