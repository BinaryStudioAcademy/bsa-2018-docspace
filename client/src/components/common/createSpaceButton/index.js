import React, { Component } from 'react'
import CreateSpaceModal from 'src/components/modals/createSpaceModal'
import './createSpaceButton.css'

class CreateSpaceButton extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showSpaceModal: false
    }
  }

  toggleModal = () => {
    this.setState({
      showSpaceModal: !this.state.showSpaceModal
    })
  }

  render () {
    return (
      <React.Fragment>
        <button onClick={this.toggleModal} className='create-space-btn'> Create space </button>
        {
          this.state.showSpaceModal &&
          <CreateSpaceModal toggleModal={this.toggleModal} />
        }
      </React.Fragment>
    )
  }
}

export default CreateSpaceButton
