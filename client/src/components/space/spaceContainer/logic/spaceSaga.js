import { takeEvery, put, select } from 'redux-saga/effects'
import * as actions from 'src/components/space/spaceContainer/logic/spaceActions'
import * as actionTypes from 'src/components/space/spaceContainer/logic/spaceActionTypes'
import SpaceService from 'src/services/spaceService'
import CategoryService from 'src/services/categoryService'
import { normalize } from 'normalizr'
import { spacesArray } from './spacesNormalizerSchema'
import { push } from 'connected-react-router'

const selectActiveSpaceFromRouter = (state) => state.router.location.pathname.split('/')[2]
const spaceByIdFromRouter = (state, spaceId) => state.spaces.byId[spaceId]

function * getSpaces (action) {
  try {
    const spaces = yield SpaceService.getSpaces()
    const normalized = normalize(spaces, spacesArray)
    const all = normalized.result
    const byId = normalized.entities.byId || {}
    // Problem: when we open this modal on space overview,
    // it's cause deleting pages from current space becouse of GET_ALL_SPACES_SUCCESS action
    // So, we spread current space with space from server. Thus, pages will not disappear from current space
    const id = yield select(selectActiveSpaceFromRouter)
    if (all.includes(id)) {
      const currentSpaceOnClient = yield select(spaceByIdFromRouter, id)
      byId[id] = {
        ...currentSpaceOnClient, ...byId[id]
      }
    }
    //
    yield put(actions.allSpacesFetchedAndNormalized(all, byId))
  } catch (e) {
    console.log(e)
    yield put(actions.getAllSpacesError())
  }
}

const spacesById = (state) => state.spaces.byId

function * getSpace (action) {
  try {
    const space = yield SpaceService.getSpace(action.payload)
    const spaces = yield select(spacesById)
    // PROBLEM : First we load a list of all spaces by route 'spacedirectory', then we choose a space
    // and send action GET_SPACE_REQUEST. As result, after getiing space there is appear new space
    // with pages , user and homepage. BUT. There are the space is state with same id, as id of this new space
    // So, we have duplicated id in spaces.all store.
    // SOLVE: For preventing this, we check, if space with target id already exist in store.
    // If true, then we just update info about the space. In other case - add new space to store.

    if (spaces[space._id]) {
      yield put(actions.getSpaceSuccess(space))
    } else {
      yield put(actions.getSpaceSuccess(space))
    }
  } catch (e) {
    console.log(e)
    yield put(actions.getSpaceError())
  }
}

function * createSpace (action) {
  try {
    const newSpace = yield SpaceService.createSpace(action.payload)
    yield put(actions.createSpaceSuccess(newSpace))
    yield put(push(`/spaces/${newSpace._id}/overview`))
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
    yield put(push(`/spacedirectory`))
  } catch (e) {
    console.log(e)
    yield put(actions.deleteSpaceError())
  }
}

function * createCategory (action) {
  try {
    const newCategory = yield CategoryService.createCategory(action.payload)
    yield put(actions.createCategorySuccess(newCategory))
  } catch (e) {
    console.log(e)
    yield put(actions.createCategoryError())
  }
}

function * deleteCategory (action) {
  try {
    const updatedSpace = yield CategoryService.deleteCategory(action.payload.categoryId, action.payload.spaceId)
    yield put(actions.deleteCategorySuccess(updatedSpace))
  } catch (e) {
    console.log(e)
    yield put(actions.deleteCategoryError())
  }
}

export default function * selectionsSaga () {
  yield takeEvery(actionTypes.GET_ALL_SPACES_REQUEST, getSpaces)
  yield takeEvery(actionTypes.GET_SPACE_REQUEST, getSpace)
  yield takeEvery(actionTypes.CREATE_SPACE_REQUEST, createSpace)
  yield takeEvery(actionTypes.DELETE_SPACE_REQUEST, deleteSpace)
  yield takeEvery(actionTypes.UPDATE_SPACE_REQUEST, updateSpace)
  yield takeEvery(actionTypes.CREATE_CATEGORY_REQUEST, createCategory)
  yield takeEvery(actionTypes.DELETE_CATEGORY_REQUEST, deleteCategory)
}
