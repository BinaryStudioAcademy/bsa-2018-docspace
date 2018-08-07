import * as actionTypes from 'src/components/page/logic/pageActionTypes'

export const setPage = (page) => {
  return {
    type: actionTypes.SET_PAGE,
    payload: page
  }
}
