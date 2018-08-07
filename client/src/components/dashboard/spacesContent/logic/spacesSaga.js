import { takeEvery, put } from 'redux-saga/effects'
import * as actionTypes from './spacesActionTypes'
import { spacesService } from '../../../../services/spacesService'

function * getSpaces () {
  const result = yield spacesService.getSpaces()
  yield put({
    type: actionTypes.SET_SPACES,
    payload: result.spaces
  })
}

export default function * selectionsSaga () {
  yield takeEvery(actionTypes.GET_SPACES, getSpaces)
}
