
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
import likesSaga from 'src/components/page/likesLogic/likesSaga'
import blogSaga from 'src/components/blog/logic/blogSaga'
import historyWatcher from 'src/commonLogic/historySaga/historySaga'
import activitySaga from 'src/components/dashboard/main/activity/logic/activitySaga'
import workSaga from 'src/components/dashboard/main/work/logic/workSaga'
import groupSaga from 'src/components/group/logic/groupSaga'
import matchingUsersSaga from 'src/components/modals/groupDialog/logic/matchingUserSaga'
import matchingPagesSaga from 'src/components/modals/searchModal/logic/searchSaga'
import clientsActionsExchangeSaga from 'src/sockets/clientsActionsExchangeSaga'
import allUsersSaga from 'src/components/dashboard/peopleBody/logic/allUsersSaga'

function * rootSaga () {
  yield all([
    fork(spaceSaga),
    fork(pageSaga),
    fork(userSaga),
    fork(commentSaga),
    fork(likesSaga),
    fork(blogSaga),
    fork(activitySaga),
    fork(workSaga),
    fork(groupSaga),
    fork(matchingUsersSaga),
    fork(matchingPagesSaga),
    fork(resetSaga),
    fork(setNewPasswordSaga),
    fork(clientsActionsExchangeSaga),
    fork(allUsersSaga),
    verificationWatcher(),
    signupWatcher(),
    loginWatcher(),
    historyWatcher()
  ])
}

export default rootSaga
