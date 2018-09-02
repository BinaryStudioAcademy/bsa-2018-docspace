import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import SpaceDetails from './spaceDetails'
import EditSpaceDetailsForm from './editSpaceDetailsForm'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { deleteSpaceRequest } from 'src/components/space/spaceContainer/logic/spaceActions'

import './spaceOverviewTab.css'

class SpaceOverviewTab extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isEditing: false,
      showDeleteSpaceModal: false // for the future
    }
  }
  handleDeleteSpace = () => {
    this.props.actions.deleteSpaceRequest(this.props.space._id)
  }

  handleDeleteSpace = () => {
    this.props.actions.deleteSpaceRequest(this.props.space._id)
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
        <h3 className='space-details-header'> {t('Space_details')}
          <span className='edit-icons'>
            <i
              className={`fas fa-pen ${isEditing ? 'active' : ''}`}
              onClick={this.goToEditDetails}
            />
            <i
              className='fas fa-trash'
              onClick={this.handleDeleteSpace}
            />
          </span>
        </h3>

        <div className='space-overview-body'>
          {
            !isEditing
              ? <SpaceDetails
                space={this.props.space}
                pathToCategories={`${this.props.match.url}/categories`}
                user={this.props.user}
              />
              : <EditSpaceDetailsForm
                goBackToDetails={this.backToSpaceDetails}
                updateSpace={this.props.updateSpace}
                space={this.props.space}
                deleteCategory={this.props.deleteCategory}
                createCategory={this.props.createCategory}
              />
          }
        </div>
      </React.Fragment>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(
      {
        deleteSpaceRequest
      }
      , dispatch)
  }
}

SpaceOverviewTab.propTypes = {
  t: PropTypes.func.isRequired,
  updateSpace: PropTypes.func.isRequired,
  space: PropTypes.object.isRequired,
  actions: PropTypes.object,
  createCategory: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  match: PropTypes.shape({
    url: PropTypes.string.isRequired
  }),
  user: PropTypes.object
}

export default translate('translations')(connect(null, mapDispatchToProps)(SpaceOverviewTab))
