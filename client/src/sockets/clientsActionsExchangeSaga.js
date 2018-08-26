import actionsToShareArr from 'src/commonLogic/actionsToShareWithOtherClients'
import { takeEvery } from 'redux-saga/effects'
import socket from './index.js'

function shareReduxActions (action) {
  action.type = `${action.type}(EXTERNAL)`
  socket.emit('share redux action', action)
}

export default function * clientsActionsExchangeSaga () {
  yield takeEvery(actionsToShareArr, shareReduxActions)
}
