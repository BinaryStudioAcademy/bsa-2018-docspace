import React, {Component} from 'react'
import SpaceDetails from './spaceDetails'
import EditSpaceDetailsForm from './editSpaceDetailsForm'
import './spaceOverviewTab.css'

export default class SpaceOverviewTab extends Component {
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
    const {isEditing} = this.state
    return (
      <React.Fragment>
        <h3 className='space-details-header'> Space Details
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
              ? <SpaceDetails />
              : <EditSpaceDetailsForm
                goBackToDetails={this.backToSpaceDetails}
              />
          }
        </div>
      </React.Fragment>
    )
  }
}
