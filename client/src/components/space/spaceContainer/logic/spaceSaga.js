import { takeEvery, put } from 'redux-saga/effects'
import * as actions from 'src/components/space/spaceContainer/logic/spaceActions'
import * as actionTypes from 'src/components/space/spaceContainer/logic/spaceActionTypes'
import SpaceService from 'src/services/spaceService'
import { normalize } from 'normalizr'
import { spacesArray } from './spacesNormalizerSchema'

function * getSpaces (action) {
  try {
    const spaces = yield SpaceService.getSpaces()
    const normalized = normalize(spaces, spacesArray)
    const all = normalized.result
    const byId = normalized.entities.byId || {}
    yield put(actions.allSpacesFetchedAndNormalized(all, byId))
  } catch (e) {
    console.log(e)
    yield put(actions.getAllSpacesError())
  }
}

function * getSpace (action) {
  try {
    const space = yield SpaceService.getSpace(action.payload)
    yield put(actions.getSpaceSuccess(space))
  } catch (e) {
    console.log(e)
    yield put(actions.getSpaceError())
  }
}

function * createSpace (action) {
  try {
    const newSpace = yield SpaceService.createSpace(action.payload)
    yield put(actions.createSpaceSuccess(newSpace))
  } catch (e) {
    console.log(e)
    yield put(actions.createSpaceError())
  }
}

function * updateSpace (action) {
  try {
    const target = action.payload
    const updated = yield SpaceService.updateSpace(target._id, target)
    yield put(actions.updateSpaceSuccess(updated))
  } catch (e) {
    console.log(e)
    yield put(actions.updateSpaceError())
  }
}

function * deleteSpace (action) {
  try {
    yield SpaceService.deleteSpace(action.payload.id)
    yield put(actions.deleteSpaceSuccess(action.payload.id))
  } catch (e) {
    console.log(e)
    yield put(actions.deleteSpaceError())
  }
}

export default function * selectionsSaga () {
  yield takeEvery(actionTypes.GET_ALL_SPACES_REQUEST, getSpaces)
  yield takeEvery(actionTypes.GET_SPACE_REQUEST, getSpace)
  yield takeEvery(actionTypes.CREATE_SPACE_REQUEST, createSpace)
  yield takeEvery(actionTypes.DELETE_SPACE_REQUEST, deleteSpace)
  yield takeEvery(actionTypes.UPDATE_SPACE_REQUEST, updateSpace)
}
