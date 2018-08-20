import { routerReducer as routing } from 'react-router-redux/lib'
import { combineReducers } from 'redux'
import { signupReducer } from 'src/components/auth/signup/logic/signupReducer'
import { loginReducer } from 'src/components/auth/login/logic/loginReducer'
import { resetReducer } from 'src/components/auth/reset/logic/resetReducer'
import { resetNewPassReducer } from 'src/components/auth/resetNewPass/logic/resetNewPassReducer'
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
  resetNewPass: resetNewPassReducer,
  routing
})

export default baseReducer
