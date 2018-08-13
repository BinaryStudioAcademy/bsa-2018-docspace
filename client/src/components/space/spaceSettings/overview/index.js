import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import SpaceDetails from './spaceDetails'
import EditSpaceDetailsForm from './editSpaceDetailsForm'
import './spaceOverviewTab.css'

class SpaceOverviewTab extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isAditing: false,
      showDeleteSpaceModal: false // for the future
    }
  }

  goToEditDetails =() => {
    this.setState({
      isEditing: true
    })
  }

  backToSpaceDetails = () => {
    this.setState({
      isEditing: false
    })
  }

  render () {
    const { isEditing } = this.state
    const { t } = this.props
    return (
      <React.Fragment>
        <h3 className='space-details-header'> {t('space_details')}
          <span className='edit-icons'>
            <i
              className={`fas fa-pencil-alt ${isEditing ? 'active' : ''}`}
              onClick={this.goToEditDetails}
            />
            <i
              className='fas fa-trash-alt'
              onClick={this.handleDeleteSpace}
            />
          </span>
        </h3>

        <div className='space-overview-body'>
          {
            !isEditing
              ? <SpaceDetails space={this.props.space} />
              : <EditSpaceDetailsForm
                goBackToDetails={this.backToSpaceDetails}
                updateSpace={this.props.updateSpace}
                space={this.props.space}
              />
          }
        </div>
      </React.Fragment>
    )
  }
}

SpaceOverviewTab.propTypes = {
  t: PropTypes.func.isRequired,
  updateSpace: PropTypes.func.isRequired,
  space: PropTypes.object.isRequired
}

export default translate('translations')(SpaceOverviewTab)
