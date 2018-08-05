import { fork } from 'redux-saga/effects'
import greetingSaga from '../components/greeting/logic/greetingSaga'
import spaceSaga from '../components/space/logic/spaceSaga'

function * rootSaga () {
  yield [
    fork(greetingSaga),
    fork(spaceSaga)
  ]
}

export default rootSaga
