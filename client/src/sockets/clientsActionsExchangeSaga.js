import actionsToShareArr from 'src/commonLogic/actionsToShareWithOtherClients'
import { takeEvery } from 'redux-saga/effects'
import socket from './index.js'

function shareReduxActions (action) {
  console.log(' SHARE ACTION IN SAGA')
  console.log(action)
  action.type = `${action.type}(EXTERNAL)`
  socket.emit('share redux action', action)
}

export default function * clientsActionsExchangeSaga () {
  yield takeEvery(actionsToShareArr, shareReduxActions)
}
