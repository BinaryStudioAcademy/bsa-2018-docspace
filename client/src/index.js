import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/common/app/index'
import About from './components/about'
import SpaceContainer from 'src/components/space/spaceContainer'
import Signup from './components/auth/signup'
import Login from './components/auth/login'
import User from './containers/user'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import { store, sagaMiddleware } from './commonLogic/store'
import rootSaga from './commonLogic/rootSaga'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import history from './commonLogic/history'

sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path='/userSettings/:id' component={User} />
        <Route exact path='/' component={App} />
        <Route path='/signup' component={Signup} />
        <Route path='/login' component={Login} />
        <Route path='/about' component={About} />
        <Route path='/spaces' component={SpaceContainer} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
