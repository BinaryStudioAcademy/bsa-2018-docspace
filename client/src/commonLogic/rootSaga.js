import { fork } from 'redux-saga/effects'
import spacesSaga from '../components/dashboard/spacesContent/logic/spacesSaga'
import signupWatcher from '../components/auth/signup/logic/signupSaga'
import loginWatcher from '../components/auth/login/logic/loginSaga'
import spaceSaga from 'src/components/space/spaceContainer/logic/spaceSaga'

function * rootSaga () {
  yield [
    fork(spaceSaga),
    spacesSaga(),
    signupWatcher(),
    loginWatcher()
  ]
}

export default rootSaga
