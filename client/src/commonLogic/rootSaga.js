import { fork, all } from 'redux-saga/effects'
import userSaga from '../containers/user/logic/userSaga'

function * rootSaga () {
  yield all([
    fork(userSaga)
  ])
}

export default rootSaga
