
import { fork } from 'redux-saga/effects'
import signupWatcher from '../components/auth/signup/logic/signupSaga'
import loginWatcher from '../components/auth/login/logic/loginSaga'
import spaceSaga from '../components/space/spaceContainer/logic/spaceSaga'
import userSaga from '../containers/user/logic/userSaga'

function * rootSaga () {
  yield [
    fork(spaceSaga),
    fork(userSaga),
    signupWatcher(),
    loginWatcher()
  ]
}

export default rootSaga
