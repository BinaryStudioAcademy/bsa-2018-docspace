import React from 'react'
import ReactDOM from 'react-dom'

import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import { store, sagaMiddleware } from './commonLogic/store'
import rootSaga from './commonLogic/rootSaga'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import history from './commonLogic/history'
import { I18nextProvider } from 'react-i18next'
import i18n from 'src/config/i18n'

import App from './components/common/app/index'
import Signup from './components/auth/signup'
import Login from './components/auth/login'
import PageEditorContainer from 'src/components/pageEditorContainer'
import SpaceContainer from 'src/components/space/spaceContainer'

sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>

    <I18nextProvider i18n={i18n}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path='/signup' component={Signup} />
          <Route path='/login' component={Login} />
          <Route path='/spaces/:id/pages/:id/edit' exact component={PageEditorContainer} />
          <Route path='/spaces/:id' component={SpaceContainer} />
          <Route path='/' component={App} />
        </Switch>
      </ConnectedRouter>
    </I18nextProvider>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
