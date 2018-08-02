import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import { greetingReducer } from '../components/greeting/logic/greetingReducer'

const baseReducer = combineReducers({
  greeting: greetingReducer,
  routing
})

export default baseReducer
