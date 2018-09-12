import actionsToShareArr from 'src/commonLogic/actionsToShareWithOtherClients'
import {VERIFICATION_SUCCESS} from 'src/components/auth/verification/logic/verificationActionTypes'
import { fork, take, call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import connectSocket from './connectSocket'

function subscribe (socket) {
  return eventChannel(emit => {
    // Receive external actions from another clients and emit them to the saga event channel
    socket.on('external redux action from another client', action => {
      emit(action)
    })

    // просто првоерял, работает ли такое
    socket.on('fun', () => {
      console.log('FUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUN')
    })

    // todo on server: create notification object
    // notification = {
    //   text: 'page <default title> was updated by Zxc'
    //    type: 'page_updating'
    // }

    socket.on('new notification', (notification) => {
      emit({
        type: 'NOTIFICATION',
        payload: notification
      }
      )
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

function * handleUpdatePage (socket, action) {
  console.log('update handler')
  console.log(socket)
  console.log(action)
  if (action.payload.watchedBy) {
    let notification = {
      message: `Page ${action.payload.title} was updated`
    }
    socket.emit('notify users', notification, action.payload.watchedBy)
  }
}

function * handleComment (socket, action) {
  console.log('comment handler')
  const {page, newComment} = action.payload
  if (page && page.watchedBy) {
    const notification = {
      message: `Page ${page.title} was commented by ${newComment.userId.login}`,
      link: `/spaces/${page.spaceId}/${page.blogId ? 'blog' : 'pages'}/${page._id}`,
      icon: 'fas fa-comments'
    }
    socket.emit('notify users', notification, page.watchedBy)
  }
}

function * handleLike (socket, action) {
  const page = action.payload.page
  if (page && page.watchedBy) {
    socket.emit('notify users', {message: 'liked'}, page.watchedBy)
  }
}

function shareReduxActions (socket, action) {
  // Add (EXTERNAL) to action type and send it to another client via socket.
  // Now we can react on this external action in reducers or sagas
  let newAction = { ...action }
  newAction.type = `${newAction.type}(EXTERNAL)`
  socket.emit('share redux action', newAction)
}

function * clientsActionsExchangeSaga (verificationSuccessAction) {
  console.log(' INSIDE CREATOR ')
  console.log(verificationSuccessAction)
  const socket = yield (connectSocket(verificationSuccessAction.response.user))
  yield takeEvery(actionsToShareArr, shareReduxActions, socket)

  yield takeEvery('UPDATE_PAGE_SUCCESS', handleUpdatePage, socket)
  yield takeEvery('CREATE_COMMENT_SUCCESS', handleComment, socket)
  yield takeEvery('PUT_LIKE_ON_PAGE_SUCCESS', handleLike, socket)

  // тут можно добаить функцию logouthandler, которая будет отключать конекшн сокета и эмитить на сервер логаут, чтобы тоже удалять там конекшн
  // это если уберут перезагрузку при логауте, т.к. сейчас все работает
  // yield takeEvery(LOGOUT, logoutHandler)
  yield fork(read, socket)
}

export default function * runSocketConnectionHandler () {
  // Если не будет верификации после логина или сигнапа, то добавить их суда в массивчик. Сейчас верификация происходит всегда
  // yield takeLatest( [VERIFICATION_SUCCESS, LOGIN_SUCCESS, SIGNUP_SUCCESS], clientsActionsExchangeSaga)
  yield takeLatest(VERIFICATION_SUCCESS, clientsActionsExchangeSaga)
}
