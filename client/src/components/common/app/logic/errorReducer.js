import * as actionTypes from 'src/components/containers/user/logic/userActionTypes'
import * as actionTypesError from 'src/components/common/app/logic/errorActionTypes'
const initialState = {
  status: 0,
  message: ''
}

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.COMPARE_USER_ERROR:
    {
      return {
        status: action.err.status
      }
    }
    case actionTypesError.REDIRECT_TO_HELPFUL_LINK:
    {
      return action.payload
    }
    default: return state
  }
}

export default errorReducer
