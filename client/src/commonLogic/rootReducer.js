import { routerReducer as routing } from 'react-router-redux/lib'
import { combineReducers } from 'redux'
import { signupReducer } from 'src/components/auth/signup/logic/signupReducer'
import { loginReducer } from 'src/components/auth/login/logic/loginReducer'
import { resetReducer } from 'src/components/auth/reset/logic/resetReducer'
import { setNewPasswordReducer } from 'src/components/auth/setNewPassword/logic/setNewPasswordReducer'
import userReducers from 'src/components/containers/user/logic/userReducer'
import spaceReducer from 'src/components/space/spaceContainer/logic/spaceReducer'
import pageReducer from 'src/components/page/logic/pageReducer'
import blogReducer from 'src/components/blog/logic/blogReducer'
import {verificationReducer} from 'src/components/auth/verification/logic/verificationReducer'
import commentReducer from '../components/page/commentsLogic/commentsReducer'

const baseReducer = combineReducers({
  signup: signupReducer,
  login: loginReducer,
  user: userReducers,
  pages: pageReducer,
  spaces: spaceReducer,
  blog: blogReducer,
  verification: verificationReducer,
  comments: commentReducer,
  reset: resetReducer,
  setNewPassword: setNewPasswordReducer,
  routing
})

export default baseReducer
