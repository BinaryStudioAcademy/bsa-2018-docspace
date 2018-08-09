import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import { signupReducer } from 'src/components/auth/signup/logic/signupReducer'
import { loginReducer } from 'src/components/auth/login/logic/loginReducer'
import { spaceReducer } from 'src/components/space/spaceContainer/logic/spaceReducer'
import userReducers from 'src/containers/user/logic/userReducer'

const baseReducer = combineReducers({
  signup: signupReducer,
  login: loginReducer,
  space: spaceReducer,
  user: userReducers,
  routing
})

export default baseReducer
