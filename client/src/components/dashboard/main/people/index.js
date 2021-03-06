import React, {Component} from 'react'
import './people.css'
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
    return (
      <div className='dashboard-spaces'>
        <div className='spaces-header'>
          <h2>{t('people_directory')}</h2>
        </div>
        <div className='spaces-body'>
          <div className='people-list-container' >
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
