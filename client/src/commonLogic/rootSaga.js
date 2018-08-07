import { fork } from 'redux-saga/effects'
import spacesSaga from '../components/dashboard/spaces__content/logic/spacesSaga'
function * rootSaga () {
  yield [
    fork(spacesSaga)
  ]
}

export default rootSaga
