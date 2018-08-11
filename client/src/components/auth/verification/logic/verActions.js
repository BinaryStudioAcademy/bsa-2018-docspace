import * as actionTypes from './verActionTypes'

const verRequest = (action) => {
  return ({
    type: actionTypes.VERIFICATION,
    ...action
  })
}

export default verRequest
