import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import { greetingReducer } from '../components/greeting/logic/greetingReducer'
import { signupReducer } from '../components/auth/signup/logic/signupReducer'

const baseReducer = combineReducers({
  greeting: greetingReducer,
  signup: signupReducer,
  routing
})

export default baseReducer
