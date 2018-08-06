import React, {Component} from 'react'
import SpaceDetails from './spaceDetails'
import EditSpaceDetailsForm from './editSpaceDetailsForm'
import './spaceOverviewTab.css'

export default class SpaceOverviewTab extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeSubTab: 'details',
      renderBySubTab: {
        'details': this.renderSpaceDetails,
        'edit details': this.renderEditDetailsForm,
        'delete space': this.renderDeleteSpaceDialog
      }
    }
  }

  renderSpaceDetails = () => (
    <SpaceDetails
      goToEditDetails={() => this.openSubTab('edit details')}
    />
  )

  renderEditDetailsForm = () => (
    <EditSpaceDetailsForm
      goBackToDetails={() => this.openSubTab('details')}
    />
  )

  renderDeleteSpaceDialog = () => (
    <div> delete </div>
  )

  openSubTab = (name) => {
    this.setState({
      activeSubTab: name
    })
  }

  render () {
    const {activeSubTab, renderBySubTab} = this.state
    const onDeleteSpaceTab = activeSubTab === 'delete space'
    return (
      <React.Fragment>
        <div className='sub-tab-menu'>
          <div
            className={`overview-tab-btn left ${!onDeleteSpaceTab ? 'active' : ''}`}
            onClick={() => this.openSubTab('details')}
          >
            Space details
          </div>
          <div
            className={`overview-tab-btn right ${onDeleteSpaceTab ? 'active' : ''}`}
            onClick={() => this.openSubTab('delete space')}
          >
            Delete space
          </div>
        </div>
        <div className='space-overview-body'>
          { renderBySubTab[activeSubTab]() }
        </div>
      </React.Fragment>
    )
  }
}
