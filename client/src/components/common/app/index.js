import React, {Component} from 'react'
import Dashboard from '../../dashboard'
import history from '../../../commonLogic/history'
import {ConnectedRouter} from 'connected-react-router'
import {Provider} from 'react-redux'
import {store} from '../../../commonLogic/store'
import './app.css'

class App extends Component {
  render () {
    return (
      <div className='app__root'>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Dashboard />
          </ConnectedRouter>
        </Provider>
      </div>
    )
  }
}

export default App
