import actionsToShareArr from 'src/commonLogic/actionsToShareWithOtherClients'
import { fork, take, call, put, takeEvery } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import connectSocket from './connectSocket'

function subscribe (socket) {
  return eventChannel(emit => {
    // Receive external actions from another clients and emit them to the saga event channel
    socket.on('external redux action from another client', action => {
      emit(action)
    })

    return () => {}
  })
}

// Read external actions from another client.
function * read (socket) {
  const channel = yield call(subscribe, socket)
  while (true) {
    let action = yield take(channel)
    yield put(action)
  }
}

function shareReduxActions (socket, action) {
  // Add (EXTERNAL) to action type and send it to another client via socket.
  // Now we can react on this external action in reducers or sagas
  action.type = `${action.type}(EXTERNAL)`
  socket.emit('share redux action', action)
}

export default function * clientsActionsExchangeSaga () {
  const socket = yield call(connectSocket)
  yield takeEvery(actionsToShareArr, shareReduxActions, socket)
  yield fork(read, socket)
}
