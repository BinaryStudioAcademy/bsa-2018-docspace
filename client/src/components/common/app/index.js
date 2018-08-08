import React, { Component } from 'react'
import Greeting from '../../greeting'
import SpaceModal from '../../modals/spaceModal'
import './app.css'

class App extends Component {
  render () {
    return (
      <div className='app__root'>
        <Greeting />
        <SpaceModal />
      </div>
    )
  }
}

export default App
