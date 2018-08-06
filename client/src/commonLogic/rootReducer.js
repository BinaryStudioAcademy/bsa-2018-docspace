import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import { greetingReducer } from '../components/greeting/logic/greetingReducer'
import { signupReducer } from '../components/auth/signup/logic/signupReducer'
import { loginReducer } from '../components/auth/login/logic/loginReducer'

const baseReducer = combineReducers({
  greeting: greetingReducer,
  signup: signupReducer,
  login: loginReducer,
  routing
})

export default baseReducer
