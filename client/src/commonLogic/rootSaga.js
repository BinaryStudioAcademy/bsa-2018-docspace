
import { fork, all } from 'redux-saga/effects'
import signupWatcher from 'src/components/auth/signup/logic/signupSaga'
import loginWatcher from 'src/components/auth/login/logic/loginSaga'
import spaceSaga from 'src/components/space/spaceContainer/logic/spaceSaga'
import userSaga from 'src/components/containers/user/logic/userSaga'
import resetSaga from 'src/components/auth/reset/logic/resetSaga'
import setNewPassSaga from 'src/components/auth/setNewPass/logic/setNewPassSaga'
import verificationWatcher from 'src/components/auth/verification/logic/verificationSaga'
import pageSaga from 'src/components/page/logic/pageSaga'
import commentSaga from 'src/components/page/commentsLogic/commentsSaga'

function * rootSaga () {
  yield all([
    fork(spaceSaga),
    fork(pageSaga),
    fork(userSaga),
    fork(commentSaga),
    fork(resetSaga),
    fork(setNewPassSaga),
    verificationWatcher(),
    signupWatcher(),
    loginWatcher()
  ])
}

export default rootSaga
