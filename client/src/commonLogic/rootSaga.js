
import { fork, all } from 'redux-saga/effects'
import signupWatcher from 'src/components/auth/signup/logic/signupSaga'
import loginWatcher from 'src/components/auth/login/logic/loginSaga'
import spaceSaga from 'src/components/space/spaceContainer/logic/spaceSaga'
import userSaga from 'src/components/containers/user/logic/userSaga'
import resetSaga from 'src/components/auth/reset/logic/resetSaga'
import setNewPasswordSaga from 'src/components/auth/setNewPassword/logic/setNewPasswordSaga'
import verificationWatcher from 'src/components/auth/verification/logic/verificationSaga'
import pageSaga from 'src/components/page/logic/pageSaga'
import commentSaga from 'src/components/page/commentsLogic/commentsSaga'
import blogSaga from 'src/components/blog/logic/blogSaga'
import historyWatcher from 'src/commonLogic/historySaga/historySaga'
import groupSaga from 'src/components/group/logic/groupSaga'

function * rootSaga () {
  yield all([
    fork(spaceSaga),
    fork(pageSaga),
    fork(userSaga),
    fork(commentSaga),
    fork(blogSaga),
    fork(groupSaga),
    fork(resetSaga),
    fork(setNewPasswordSaga),
    verificationWatcher(),
    signupWatcher(),
    loginWatcher(),
    historyWatcher()
  ])
}

export default rootSaga
