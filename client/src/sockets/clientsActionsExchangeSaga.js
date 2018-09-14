import actionsToShareArr from 'src/commonLogic/actionsToShareWithOtherClients'
import {VERIFICATION_SUCCESS} from 'src/components/auth/verification/logic/verificationActionTypes'
import { fork, take, call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import connectSocket from './connectSocket'
import _ from 'lodash'

const spaceWatchersBySpaceId = (state, id) => state.spaces.byId[id].watchedBy

function subscribe (socket) {
  return eventChannel(emit => {
    // Receive external actions from another clients and emit them to the saga event channel
    socket.on('external redux action from another client', action => {
      emit(action)
    })

    socket.on('new notification', (notification) => {
      emit({
        type: 'NOTIFICATION',
        payload: notification
      })
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
  const page = action.payload
  const spaceWatchers = yield select(spaceWatchersBySpaceId, page.spaceId)
  let watchers = _.uniq([ ...spaceWatchers, ...page.watchedBy ].filter(id => id !== socket.authUserId))
  console.log('WATCHERS')
  console.log(watchers)

  let notification = {
    message: `${page.blogId ? 'Blog page' : 'Page'} ${page.title} was updated`,
    link: `/spaces/${page.spaceId}/${page.blogId ? 'blog' : 'pages'}/${page._id}`,
    icon: page.blogId ? 'fas fa-rss-square' : 'fas fa-file-alt'
  }
  socket.emit('notify users', notification, watchers)
}

function * handleUpdateBlogPage (socket, action) {
  const page = action.payload

  const spaceWatchers = yield select(spaceWatchersBySpaceId, page.spaceId)

  let watchers = _.uniq([ ...spaceWatchers, ...page.watchedBy ].filter(id => id !== socket.authUserId))

  let notification = {
    message: `'Blog page ${page.title} was updated`,
    link: `/spaces/${page.spaceId}/blog/${page._id}`,
    icon: 'fas fa-rss-square'
  }
  socket.emit('notify users', notification, watchers)
}

function * handleComment (socket, action) {
  const {page, newComment} = action.payload
  const spaceWatchers = yield select(spaceWatchersBySpaceId, page.spaceId)

  let watchers = _.uniq([ ...spaceWatchers, ...page.watchedBy ].filter(id => id !== socket.authUserId))
  const notification = {
    message: `${page.blogId ? 'Blog page' : 'Page'} was commented by ${newComment.userId.firstName + ' ' + newComment.userId.lastName}`,
    link: `/spaces/${page.spaceId}/${page.blogId ? 'blog' : 'pages'}/${page._id}`,
    icon: 'fas fa-comments'
  }
  socket.emit('notify users', notification, watchers)
}

function * handleLike (socket, action) {
  const {page, likedUser} = action.payload
  const spaceWatchers = yield select(spaceWatchersBySpaceId, page.spaceId)

  let watchers = _.uniq([ ...spaceWatchers, ...page.watchedBy ].filter(id => id !== socket.authUserId))

  const notification = {
    message: `${page.blogId ? 'Blog page' : 'Page'} was liked by ${likedUser.firstName + ' ' + likedUser.lastName}`,
    icon: 'fas fa-thumbs-up',
    link: `/spaces/${page.spaceId}/${page.blogId ? 'blog' : 'pages'}/${page._id}`
  }
  socket.emit('notify users', notification, watchers)
}

function shareReduxActions (socket, action) {
  // Add (EXTERNAL) to action type and send it to another client via socket.
  // Now we can react on this external action in reducers or sagas

  const newAction = { ...action, type: `${action.type}(EXTERNAL)` }
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
  yield takeEvery('UPDATE_BLOG_PAGE_SUCCESS', handleUpdateBlogPage, socket)

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
