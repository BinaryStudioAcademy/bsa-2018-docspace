import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/common/app/index'
import About from './components/about'
import Signup from './components/auth/signup'
import Login from './components/auth/login'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import { store, sagaMiddleware } from './commonLogic/store'
import rootSaga from './commonLogic/rootSaga'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/signup' component={Signup} />
        <Route path='/login' component={Login} />
        <Route path='/about' component={About} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
