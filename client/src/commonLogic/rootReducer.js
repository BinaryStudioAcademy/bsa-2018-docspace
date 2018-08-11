import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import { signupReducer } from 'src/components/auth/signup/logic/signupReducer'
import { loginReducer } from 'src/components/auth/login/logic/loginReducer'
import userReducers from 'src/containers/user/logic/userReducer'
import spaceReducer from 'src/components/space/spaceContainer/logic/spaceReducer'
import pageReducer from 'src/components/page/logic/pageReducer'
import {verReducer} from 'src/components/auth/verification/logic/verReducer'

const baseReducer = combineReducers({
  signup: signupReducer,
  login: loginReducer,
  user: userReducers,
  page: pageReducer,
  spaces: spaceReducer,
  verification: verReducer,
  routing
})

export default baseReducer
