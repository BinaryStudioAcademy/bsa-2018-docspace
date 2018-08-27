import React, {Component} from 'react'
import Camera from 'src/assets/add-photo-img.png'
import PropTypes from 'prop-types'
import { updateUser, checkPassword, sendAvatarRequest, getUserUpdatesRequest } from './logic/userActions'
import { isUserFetching } from './logic/userReducer'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ManagePhoto } from 'src/components/managePhotos/managePhotos'
import { ProfileFields } from 'src/components/userTabs/general'
import { PrivateFields } from 'src/components/userTabs/private'
import RecentWorkListContainer from 'src/components/recentWorkListItem/recentWorkContainer'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import { MoonLoader } from 'react-spinners'
import defaultAvatar from '../../../assets/user.png'

import './user.css'

class User extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isEditMode: false,
      date: new Date(),
      isShowManagePhoto: false,
      isShowGeneral: true
    }

    this.changeIsEditMode = this.changeIsEditMode.bind(this)
    this.editMode = this.editMode.bind(this)
    this.managePhoto = this.managePhoto.bind(this)
    this.handleManagePhoto = this.handleManagePhoto.bind(this)
    this.changeGeneral = this.changeGeneral.bind(this)
    this.changePrivate = this.changePrivate.bind(this)
    this.sendPassword = this.sendPassword.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.renderAddPhoto = this.renderAddPhoto.bind(this)
    this.renderHeaderCenter = this.renderHeaderCenter.bind(this)
    this.renderClock = this.renderClock.bind(this)
    this.renderEditButtons = this.renderEditButtons.bind(this)
    this.renderMainInfo = this.renderMainInfo.bind(this)
    this.renderRecentWorks = this.renderRecentWorks.bind(this)
  }

  componentDidMount () {
    this.props.actions.getUserUpdatesRequest(this.props.userId)
  }

  handlePassword (currentPassword, newPassword) {
    this.props.actions.checkPassword({
      email: this.props.userSettings.user.email,
      id: this.props.userSettings.user._id,
      password: currentPassword,
      newPassword: newPassword
    })
  }

  handleAllPeople = () => {
    this.props.history.push(`/people`)
  }

  changeGeneral () {
    this.setState({isShowGeneral: true})
  }
  changePrivate () {
    this.setState({isShowGeneral: false})
  }
  managePhoto () {
    this.setState(prevState => {
      return { isShowManagePhoto: !prevState.isShowManagePhoto }
    })
  }

  handleManagePhoto () {
    return this.state.isShowManagePhoto
  }
  editMode (userProfile) {
    if (this.state.isEditMode) {
      this.props.actions.updateUser({
        id: this.props.userSettings.user._id,
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        email: userProfile.email,
        login: userProfile.login
      })
    }
    this.changeIsEditMode()
  }

  changeIsEditMode () {
    if (this.state.isEditMode) {
      this.setState({
        isEditMode: false
      })
    } else {
      this.setState({
        isEditMode: true
      })
    }
  }

  sendPassword (newPassword) {
    this.props.actions.updateUser({
      id: this.props.match.params.id,
      password: newPassword
    })
  }

  handleAvatarChoose = () => {
    this.refs.avatarUploader.click()
  }

  handleChoosenFile = (e) => {
    if (e.target.files[0]) {
      this.props.actions.sendAvatarRequest(e.target.files[0], this.props.userSettings.user._id)
    } else {
      console.log('cancel')
    }
  }

  renderAddPhoto (t) {
    return (
      <div className='profile-header-add-photo' onClick={this.managePhoto}>
        <div className='add-photo-content'>
          <button className='add-photo-button'>
            <img src={Camera} alt='camera' className='add-photo-img' />
            <span className='add-photo-label'>{t('add_cover_photo')}</span>
          </button>
        </div>
      </div>
    )
  }

  renderHeaderCenter (t, firstName, lastName, avatar) {
    return (
      <div className='profile-page-center'>
        <a className='profile-link-All-People' onClick={this.handleAllPeople}>
          <span className='profile-link-arrow-img'>
            <i className='fa fa-arrow-left' aria-hidden='true' />
          </span>
          <span>{t('all_people')}</span>
        </a>
        <div className='profile-name-avatar'>
          <div className='profile-avatar-wrapper'>
            <button className='avatar-btn'>
              <img src={avatar || defaultAvatar} className='profile-avatar-cover-btn' alt='avatar' />
            </button>
            <div className='profile-avatar-hover' onClick={this.handleAvatarChoose}>
              <input type='file' ref='avatarUploader' accept='image/*' style={{display: 'none'}} onChange={this.handleChoosenFile} />
              <i className='fa fa-camera profile-avatar-camera' aria-hidden='true' style={{color: 'white', fontSize: '24px'}} />
            </div>
          </div>

          <div className='profile-name'>
            <h1>{firstName} {lastName}</h1>
          </div>
        </div>
      </div>
    )
  }

  renderClock () {
    return (
      <div className='profile-about'>
        <div className='profile-status'>
          <div className='profile-label-time'>
            <i className='fa fa-clock-o label-clock' aria-hidden='true' />
            <span>{this.state.date.toLocaleTimeString().replace(/:\d+ /, ' ')}</span>
          </div>
        </div>
      </div>
    )
  }

  renderEditButtons (t, isFetching) {
    return (
      <div className='profile-edit-buttons'>
        <div className='edit-manage-btn'>
          <div className='manage-btn'>
            <button onClick={this.changeGeneral}>{t('general')}</button>
          </div>
          <div className='manage-btn'>
            <button onClick={this.changePrivate}>{t('private')}</button>
          </div>
        </div>
        { isFetching
          ? <div className='sweet-loading'>
            {
              this.state.isShowGeneral
                ? <span className='user-loading-info'>Data is changing</span>
                : <span className='user-loading-info'>Password is changing</span>
            }
            <MoonLoader
              sizeUnit={'px'}
              size={16}
              color={'#123abc'}
            />
          </div>
          : null
        }
      </div>
    )
  }

  renderMainInfo (t, i18n, errorsUser, user, successful, errors) {
    return (
      !this.state.isShowGeneral
        ? <PrivateFields
          handlePassword={this.handlePassword}
          user={user}
          errors={errors}
          successful={successful}
          sendPassword={this.sendPassword}
          t={t}
        />
        : this.state.isShowGeneral &&
        <ProfileFields
          isEditMode={this.state.isEditMode}
          editMode={this.editMode}
          user={user}
          errors={errorsUser}
          t={t}
          i18n={i18n}
        />
    )
  }

  renderRecentWorks (t) {
    return (
      <div className='recent-work-list-wrapper'>
        <h2 className='recent-work-list-wrapper-header'><span>{t('work')}</span></h2>
        <RecentWorkListContainer userHistory={this.props.userHistory} />
      </div>
    )
  }

  render () {
    const { t, i18n, isFetching } = this.props
    const { user } = this.props.userSettings
    const { firstName, lastName, avatar } = user
    const errorsUser = this.props.userSettings.hasOwnProperty('errors') ? this.props.userSettings.errors : []
    const { successful, errors } = this.props.resultOfChecking
    return (
      <div className='main-wrapper'>
        <div className='profile-page-header'>
          { this.renderAddPhoto(t) }
          <ManagePhoto display={this.handleManagePhoto} t={t} />
          { this.renderHeaderCenter(t, firstName, lastName, avatar)}
        </div>
        <div className='profile-page-center-content'>
          { this.renderClock() }
          <hr />
          { this.renderEditButtons(t, isFetching) }
          { this.renderMainInfo(t, i18n, errorsUser, user, successful, errors) }
          { this.renderRecentWorks(t) }
        </div>
      </div>
    )
  }
}

User.propTypes = {
  userSettings: PropTypes.object,
  match: PropTypes.object,
  isFetching: PropTypes.bool,
  userHistory: PropTypes.array,
  params: PropTypes.array,
  id: PropTypes.string,
  history: PropTypes.object,
  t: PropTypes.func,
  i18n: PropTypes.object,
  userId: PropTypes.string,
  actions: PropTypes.object.isRequired,
  resultOfChecking: PropTypes.shape({
    requesting: PropTypes.bool,
    successful: PropTypes.bool,
    messages: PropTypes.array,
    errors: PropTypes.array
  })
}

const mapStateToProps = (state) => {
  return {
    userSettings: state.user.userReducer.messages.length
      ? state.user.userReducer
      : state.verification,
    resultOfChecking: state.user.checkingReducer,
    isFetching: isUserFetching(state),
    userId: state.verification.user._id,
    userAvatar: state.verification.user.avatar,
    userHistory: state.user.userHistory
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ updateUser, checkPassword, sendAvatarRequest, getUserUpdatesRequest }, dispatch)
  }
}

export default translate('translations')(withRouter(connect(mapStateToProps, mapDispatchToProps)(User)))
