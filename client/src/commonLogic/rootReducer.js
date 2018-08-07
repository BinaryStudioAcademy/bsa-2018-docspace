import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import { greetingReducer } from '../components/greeting/logic/greetingReducer'
import { signupReducer } from 'src/components/auth/signup/logic/signupReducer'
import { loginReducer } from 'src/components/auth/login/logic/loginReducer'
import { spaceReducer } from 'src/components/space/spaceContainer/logic/spaceReducer'
import { pageReducer } from 'src/components/page/logic/pageReducer'

const baseReducer = combineReducers({
  greeting: greetingReducer,
  signup: signupReducer,
  login: loginReducer,
  space: spaceReducer,
  page: pageReducer,
  routing
})

export default baseReducer
