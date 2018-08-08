import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import { signupReducer } from '../components/auth/signup/logic/signupReducer'
import { loginReducer } from '../components/auth/login/logic/loginReducer'
import { spaceReducer } from '../components/space/spaceContainer/logic/spaceReducer'
import { userReducer } from '../containers/user/logic/userReducer'

const baseReducer = combineReducers({
  signup: signupReducer,
  login: loginReducer,
  space: spaceReducer,
  user: userReducer,
  routing
})

export default baseReducer
