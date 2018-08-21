import { routerReducer as routing } from 'react-router-redux/lib'
import { combineReducers } from 'redux'
import { signupReducer } from 'src/components/auth/signup/logic/signupReducer'
import { loginReducer } from 'src/components/auth/login/logic/loginReducer'
import { resetReducer } from 'src/components/auth/reset/logic/resetReducer'
import { setNewPassReducer } from 'src/components/auth/setNewPass/logic/setNewPassReducer'
import userReducers from 'src/components/containers/user/logic/userReducer'
import spaceReducer from 'src/components/space/spaceContainer/logic/spaceReducer'
import pageReducer from 'src/components/page/logic/pageReducer'
import {verificationReducer} from 'src/components/auth/verification/logic/verificationReducer'
import commentReducer from '../components/page/commentsLogic/commentsReducer'

const baseReducer = combineReducers({
  signup: signupReducer,
  login: loginReducer,
  user: userReducers,
  pages: pageReducer,
  spaces: spaceReducer,
  verification: verificationReducer,
  comments: commentReducer,
  reset: resetReducer,
  setNewPass: setNewPassReducer,
  routing
})

export default baseReducer
