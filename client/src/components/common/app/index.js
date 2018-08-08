import React, { Component } from 'react'
import SpaceModal from '../../modals/spaceModal'
import './app.css'

class App extends Component {
  render () {
    return (
      <div className='app__root'>
        <SpaceModal />
      </div>
    )
  }
}

export default App
