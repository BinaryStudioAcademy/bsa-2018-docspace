import React, { Component } from 'react'
import './app.css'

import PageEditor from 'src/components/pageEditor'

class App extends Component {
  render () {
    return (
      <div className='app__root'>
        <PageEditor />
      </div>
    )
  }
}

export default App
