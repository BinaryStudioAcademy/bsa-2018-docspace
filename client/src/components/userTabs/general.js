import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Button from '../../components/common/button'
import Input from 'src/components/common/input'

class ProfileFields extends Component {
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

  renderEmail (email) {
    const displayEmail = this.state.email || email

    return this.props.isEditMode ? <Input name='user-input-change-data' inputType='text' value={!this.state.email ? email : this.state.email} onChange={this.handleEmail} />
      : <a href='#'>{displayEmail}</a>
  }

  renderLogin (login) {
    const displayLogin = this.state.login || login

    return this.props.isEditMode ? <Input name='user-input-change-data' inputType='text' value={displayLogin} onChange={this.handleLogin} />
      : <span className='profile-field-nickname' href='#'>@{displayLogin}</span>
  }

  renderFirstName (firstName) {
    const displayFirstName = this.state.firstName || firstName

    return this.props.isEditMode ? <Input name='user-input-change-data' inputType='text' value={displayFirstName} onChange={this.handleFirstName} />
      : <span>{displayFirstName}</span>
  }

  renderLastName (lastName) {
    const displayLastName = this.state.lastName || lastName

    return this.props.isEditMode ? <Input name='user-input-change-data' inputType='text' value={displayLastName} onChange={this.handleLastName} />
      : <span>{displayLastName}</span>
  }

  renderLabelButton () {
    return !this.props.isEditMode ? {icon: <i className='fa fa-cog' aria-hidden='true' />, value: `Edit`}
      : {icon: <i className='fa fa-check' aria-hidden='true' />, value: `Save`}
  }

  handleSubmitDataUser () {
    if (this.props.editMode) {
      this.props.editMode({
        email: this.state.email ? this.state.email : this.props.user.email,
        login: this.state.login ? this.state.login : this.props.user.login,
        firstName: this.state.firstName ? this.state.firstName : this.props.user.firstName,
        lastName: this.state.lastName ? this.state.lastName : this.props.user.lastName
      })
    }
  }

  render () {
    const {email, login, firstName, lastName} = this.props.user
    return (
      <div className='profile-fields-wrapper'>
        <ul className='profile-fields-items'>
          <li className='profile-fields-item'>
            <div>
              <label htmlFor='email' className='profile-fields-item-labels'>Email</label>
              <div id='email' className='profile-fields-item-contents'>
                {this.renderEmail(email)}
              </div>
            </div>
          </li>
          <li className='profile-fields-item'>
            <div>
              <label htmlFor='nickname' className='profile-fields-item-labels'>Nickname</label>
              <div id='nickname' className='profile-fields-item-contents'>
                {this.renderLogin(login)}
              </div>
            </div>
          </li>
          <li className='profile-fields-item'>
            <div>
              <label htmlFor='firstName' className='profile-fields-item-labels'>First Name</label>
              <div id='firstName' className='profile-fields-item-contents'>
                {this.renderFirstName(firstName)}
              </div>
            </div>
          </li>
          <li className='profile-fields-item'>
            <div>
              <label htmlFor='lastName' className='profile-fields-item-labels'>Last Name</label>
              <div id='lastName' className='profile-fields-item-contents'>
                {this.renderLastName(lastName)}
              </div>
            </div>
          </li>
        </ul>
        <div className='edit-btn'>
          <Button
            icon={this.renderLabelButton().icon}
            value={this.renderLabelButton().value}
            onClick={this.handleSubmitDataUser}
          />
        </div>
      </div>
    )
  }
}

export default ProfileFields

ProfileFields.propTypes = {
  user: PropTypes.object,
  email: PropTypes.string,
  login: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  isEditMode: PropTypes.bool,
  editMode: PropTypes.func
}
