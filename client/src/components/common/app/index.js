import React, { Component } from 'react'
import logo from '../../../resources/logo.svg'
import Greeting from '../../greeting'

import './app.css'

import Modal from '../../modal'
import TemplateList from '../../templateList'

const items = [
  {
    name: 'Empty space',
    description: 'Start from empty list',
    img: logo
  },
  {
    name: 'Empty space',
    description: 'Start from empty list',
    img: logo
  },
  {
    name: 'Empty space',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    img: logo
  },
  {
    name: 'Empty space',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum suscipit ',
    img: logo
  },
  {
    name: 'Empty space',
    description: 'Start from empty list',
    img: logo
  },
  {
    name: 'Empty space',
    description: 'Start from empty list',
    img: logo
  },
  {
    name: 'Empty space',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum suscipit ',
    img: logo
  },
  {
    name: 'Empty space',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum suscipit ',
    img: logo
  },
  {
    name: 'Empty space',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum suscipit ',
    img: logo
  }

]

class App extends Component {
  constructor () {
    super()
    this.state = {
      showModal: true
    }
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  render () {
    return (
      <div className='app__root'>
        <header className='app__header'>
          <img src={logo} className={'app__logo'} alt='logo' />
          <h1 className='app__title'>Binary docspace</h1>
        </header>

        <Modal
          show={this.state.showModal}
          toggleModal={this.toggleModal}
        >
          <TemplateList
            items={items}
          />
        </Modal>
        <button onClick={this.toggleModal}>Open Modal</button>
        <Greeting />
      </div>
    )
  }
}

export default App
