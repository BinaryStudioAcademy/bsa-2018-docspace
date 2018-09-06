import React, {Component} from 'react'
import './people.css'
import SpacesSideBar from '../../spacesSidebar'
import PeopleBody from '../../peopleBody'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'

class People extends Component {
  state = {
    active: this.props.t('all_people')
  }
  handleClickNavTab = (tab) => {
    this.setState({ active: tab })
  }
  render () {
    const {t} = this.props
    const sideBarTabs = [t('all_people'), t('people_with_personal_spaces')]
    return (
      <div className='dashboard-spaces'>
        <div className='spaces-header'>
          <h1>{t('people_directory')}</h1>
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
