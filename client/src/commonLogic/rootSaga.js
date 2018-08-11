
import { fork } from 'redux-saga/effects'
import signupWatcher from 'src/components/auth/signup/logic/signupSaga'
import loginWatcher from 'src/components/auth/login/logic/loginSaga'
import spaceSaga from 'src/components/space/spaceContainer/logic/spaceSaga'
import userSaga from 'src/containers/user/logic/userSaga'
import verWatcher from 'src/components/auth/verification/logic/verSaga'

function * rootSaga () {
  yield [
    fork(spaceSaga),
    fork(userSaga),
    verWatcher(),
    signupWatcher(),
    loginWatcher()
  ]
}

export default rootSaga
