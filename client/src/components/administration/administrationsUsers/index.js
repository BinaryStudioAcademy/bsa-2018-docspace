import React, { Component } from 'react'
import InviteUsers from './inviteUsers'
import Input from 'src/components/common/input'
import PeopleBody from 'src/components/dashboard/peopleBody'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'

class AdministrationUsers extends Component {
  constructor (props) {
    super(props)
    this.state = {
      nameField1: '',
      nameField2: '',
      nameField3: '',
      emailField1: '',
      emailField2: '',
      emailField3: '',
      filterValue: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }
  // renderTable = () => {
  //   return ''
  // }
  handleChange (target) {
    this.setState({
      [target.name]: target.value
    })
  }
  render () {
    const { t } = this.props
    return (
      <React.Fragment>
        <div>
          <h1>{t('invite_new_users')}</h1>
          <InviteUsers
            valueName={this.state.nameField1}
            valueEmail={this.state.emailField1}
            nameName='nameField1'
            nameEmail='emailField1'
            onChange={this.handleChange}
            t={t}
          />
          <InviteUsers
            valueName={this.state.nameField2}
            valueEmail={this.state.emailField2}
            nameName='nameField2'
            nameEmail='emailField2'
            onChange={this.handleChange}
            t={t}
          />
          <InviteUsers
            valueName={this.state.nameField3}
            valueEmail={this.state.emailField3}
            nameName='nameField3'
            nameEmail='emailField3'
            onChange={this.handleChange}
            t={t}
          />
        </div>
        <button>{t('invite_users')}</button>
        <div className='admin-filter-container'>
          <Input label={t('name_or_email_contains')}
            onChange={({target}) => this.handleChange(target)}
            value={this.state.filterValue}
            inputType='text'
            name='filterValue'
          />
        </div>
        <div className='people-list-container' >
          <PeopleBody />
        </div>
      </React.Fragment>
    )
  }
}

AdministrationUsers.propTypes = {
  t: PropTypes.func
}

export default translate('translations')(AdministrationUsers)
