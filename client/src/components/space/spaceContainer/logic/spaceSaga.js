import { takeEvery, put } from 'redux-saga/effects'
import * as actions from 'src/components/space/spaceContainer/logic/spaceActions'
import * as actionTypes from 'src/components/space/spaceContainer/logic/spaceActionTypes'
import { spaceService } from 'src/services/spaceService'

function * getSpace (action) {
  const result = yield spaceService.getSpace(action.payload)

  yield put(actions.setSpace(result))
}

export default function * selectionsSaga () {
  yield takeEvery(actionTypes.GET_SPACE, getSpace)
}
