import { takeEvery, put } from 'redux-saga/effects'
import * as actions from './spaceActions'
import * as actionTypes from './spaceActionTypes'
import { spaceService } from '../../../services/spaceService'

function * getSpace (action) {
  const result = yield spaceService.getSpace(action.payload)

  yield put(actions.setSpace(result))
}

export default function * selectionsSaga () {
  yield takeEvery(actionTypes.GET_SPACE, getSpace)
}
