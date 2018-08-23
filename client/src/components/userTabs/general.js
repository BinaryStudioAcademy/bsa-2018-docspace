import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Button from '../../components/common/button'
import Input from 'src/components/common/input'
import Errors from 'src/components/common/error'
import { translate } from 'react-i18next'
import Dropdown from 'src/components/common/dropdownMenu'

export class ProfileFields extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      login: '',
      firstName: '',
      lastName: ''
    }
    this.renderEmail = this.renderEmail.bind(this)
    this.renderLogin = this.renderLogin.bind(this)
    this.renderFirstName = this.renderFirstName.bind(this)
    this.renderLastName = this.renderLastName.bind(this)
    this.handleEmail = this.handleEmail.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleFirstName = this.handleFirstName.bind(this)
    this.handleLastName = this.handleLastName.bind(this)
    this.handleSubmitDataUser = this.handleSubmitDataUser.bind(this)
    this.propsToState = this.propsToState.bind(this)
  }

  handleEmail (e) {
    this.setState({email: e.target.value})
  }

  handleLogin (e) {
    this.setState({login: e.target.value})
  }

  handleFirstName (e) {
    this.setState({firstName: e.target.value})
  }

  handleLastName (e) {
    this.setState({lastName: e.target.value})
  }

  renderEmail (propsEmail) {
    return this.props.isEditMode ? <Input name='user-input-change-data' inputType='email' value={this.state.email} onChange={this.handleEmail} />
      : <span>{propsEmail}</span>
  }

  renderLogin (propsLogin) {
    return this.props.isEditMode ? <Input name='user-input-change-data' inputType='text' value={this.state.login} onChange={this.handleLogin} />
      : <span>{propsLogin}</span>
  }

  renderFirstName (propsFirstName) {
    return this.props.isEditMode ? <Input name='user-input-change-data' inputType='text' value={this.state.firstName} onChange={this.handleFirstName} />
      : <span>{propsFirstName}</span>
  }

  renderLastName (propsLastName) {
    return this.props.isEditMode ? <Input name='user-input-change-data' inputType='text' value={this.state.lastName} onChange={this.handleLastName} />
      : <span>{propsLastName}</span>
  }

  renderLabelButton () {
    return !this.props.isEditMode ? {icon: <i className='fa fa-cog' aria-hidden='true' />, value: this.props.t('Edit')}
      : {icon: <i className='fa fa-check' aria-hidden='true' />, value: this.props.t('Save')}
  }

  propsToState () {
    if (!this.props.isEditMode) {
      this.setState({
        email: this.props.user.email,
        login: this.props.user.login,
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName
      })
    }
  }

  handleSubmitDataUser () {
    this.propsToState()
    if (this.props.editMode) {
      this.props.editMode({
        email: this.state.email,
        login: this.state.login,
        firstName: this.state.firstName,
        lastName: this.state.lastName
      })
    }
  }

  render () {
    const {email, login, firstName, lastName} = this.props.user
    const { t, i18n } = this.props
    const changeLanguage = lng => {
      i18n.changeLanguage(lng)
      localStorage.setItem('language', lng)
    }

    const dropdownMenuItems = [
      {
        name: t('Ukrainian'),
        onClick: () => changeLanguage('uk')
      },
      {
        name: t('English'),
        onClick: () => changeLanguage('en')
      }
    ]
    return (
      <div className='profile-fields-wrapper'>
        <ul className='profile-fields-items'>
          <li className='profile-fields-item'>
            <div>
              <label htmlFor='email' className='profile-fields-item-labels'>{t('email')}</label>
              <div id='email' className='profile-fields-item-contents'>
                {this.renderEmail(email)}
              </div>
            </div>
          </li>
          <li className='profile-fields-item'>
            <div>
              <label htmlFor='nickname' className='profile-fields-item-labels'>{t('nickname')}</label>
              <div id='nickname' className='profile-fields-item-contents'>
                {this.renderLogin(login)}
              </div>
            </div>
          </li>
          <li className='profile-fields-item'>
            <div>
              <label htmlFor='firstName' className='profile-fields-item-labels'>{t('first_name')}</label>
              <div id='firstName' className='profile-fields-item-contents'>
                {this.renderFirstName(firstName)}
              </div>
            </div>
          </li>
          <li className='profile-fields-item'>
            <div>
              <label htmlFor='lastName' className='profile-fields-item-labels'>{t('last_name')}</label>
              <div id='lastName' className='profile-fields-item-contents'>
                {this.renderLastName(lastName)}
              </div>
            </div>
          </li>
        </ul>
        {!!this.props.errors.length && (
          <div className='user-general-errors-user'><Errors errors={this.props.errors} /></div>
        )}
        <div className='edit-btn'>
          <Button
            icon={this.renderLabelButton().icon}
            value={this.renderLabelButton().value}
            onClick={this.handleSubmitDataUser}
          />
        </div>
        <div className='language-choise'>
          <span>{t('choose language')}</span>
          <Dropdown
            icon='fas fa-ellipsis-h'
            type='buttons-item'
            menuItems={dropdownMenuItems}
          />
        </div>
      </div>
    )
  }
}

ProfileFields.propTypes = {
  user: PropTypes.object,
  email: PropTypes.string,
  login: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  isEditMode: PropTypes.bool,
  editMode: PropTypes.func,
  errors: PropTypes.array,
  t: PropTypes.func,
  i18n: PropTypes.object
}
export default translate('translations')(ProfileFields)
