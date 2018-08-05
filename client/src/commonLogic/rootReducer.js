import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import { greetingReducer } from '../components/greeting/logic/greetingReducer'
import { spaceReducer } from '../components/space/logic/spaceReducer'

const baseReducer = combineReducers({
  greeting: greetingReducer,
  space: spaceReducer,
  routing
})

export default baseReducer
