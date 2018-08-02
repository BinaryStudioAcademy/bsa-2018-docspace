import * as actionTypes from './loginActionTypes'

const initialState = {
  email: '',
  fullName: '',
  password: ''
}

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN: {
      return {
        ...state,
        email: action.payload.email,
        fullName: action.payload.fullName,
        password: action.payload.password
      }
    }
    default: return state
  }
}
