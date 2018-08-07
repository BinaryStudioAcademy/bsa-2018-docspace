import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import { userReducer } from '../containers/user/logic/userReducer'

const baseReducer = combineReducers({
  user: userReducer,
  routing
})

export default baseReducer
