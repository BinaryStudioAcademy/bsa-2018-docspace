import React, {Component} from 'react'
import './people.css'
import SpacesSideBar from '../../spacesSidebar'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'
import PeopleBody from '../../peopleBody'

class People extends Component {
  state = {
    active: this.props.t('All People')
  }
  handleClickNavTab = (tab) => {
    this.setState({ active: tab })
  }
  render () {
    const {t} = this.props
    const sideBarTabs = [t('All People'), t('People with Personal Spaces')]
    return (
      <div className='dashboard-spaces'>
        <div className='spaces-header'>
          <h1>{t('People Directory')}</h1>
        </div>
        <div className='spaces-body'>
          <div className='spaces-sidebar'>
            <SpacesSideBar menuTabs={sideBarTabs} handleClickNavTab={this.handleClickNavTab} activeTab={this.state.active} />
          </div>
          <div className='people-list-container' >
            <h1>People</h1>
            <PeopleBody />
          </div>
        </div>
      </div>

    )
  }
}

People.propTypes = {
  t: PropTypes.func
}

export default translate('translations')(People)
