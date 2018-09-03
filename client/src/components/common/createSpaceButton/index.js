import React, { Component } from 'react'
import CreateSpaceModal from 'src/components/modals/createSpaceModal'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'
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
    const {t} = this.props
    return (
      <React.Fragment>
        <button onClick={this.toggleModal} className='create-space-btn'>{t('Create space')}</button>
        {
          this.state.showSpaceModal &&
          <CreateSpaceModal toggleModal={this.toggleModal} />
        }
      </React.Fragment>
    )
  }
}

CreateSpaceButton.propTypes = {
  t: PropTypes.func
}

export default translate('translations')(CreateSpaceButton)
