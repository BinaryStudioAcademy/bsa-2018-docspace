import React, {Component} from 'react'
import Camera from 'src/assets/add-photo-img.png'
import PropTypes from 'prop-types'
import { updateUser, checkPassword, sendAvatarRequest, getUserUpdatesRequest, compareUserRequest } from './logic/userActions'
import { isUserFetching } from './logic/userReducer'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ManagePhoto } from 'src/components/managePhotos/managePhotos'
import { ProfileFields } from 'src/components/userTabs/general'
import { PrivateFields } from 'src/components/userTabs/private'
import RecentWorkListContainer from 'src/components/recentWorkListItem/recentWorkContainer'
import { translate } from 'react-i18next'
import { MoonLoader } from 'react-spinners'
import defaultAvatar from '../../../assets/user.png'
import { Redirect, withRouter, NavLink } from 'react-router-dom'

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
    this.props.actions.compareUserRequest(this.props.userLogin, this.props.match.params.login)
    this.props.actions.getUserUpdatesRequest(this.props.match.params.login)
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.match.params.login !== nextProps.match.params.login) {
      this.props.actions.compareUserRequest(this.props.userLogin, nextProps.match.params.login)
      this.props.actions.getUserUpdatesRequest(nextProps.match.params.login)
    }
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

  changeState (target) {
    if (target.name === this.props.t('general')) {
      this.setState({isShowGeneral: true})
    } else {
      this.setState({isShowGeneral: false})
    }
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

  renderAddPhoto (t, resultOfComparing) {
    return resultOfComparing
      ? (
        <div className='profile-header-add-photo' onClick={this.managePhoto}>
          <div className='add-photo-content'>
            <button className='add-photo-button'>
              <img src={Camera} alt='camera' className='add-photo-img' />
              <span className='add-photo-label'>{t('add_cover_photo')}</span>
            </button>
          </div>
        </div>
      ) : null
  }

  renderHeaderCenter (t, firstName, lastName, avatar, resultOfComparing) {
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
            <div className={resultOfComparing ? 'profile-avatar-hover' : ''} onClick={resultOfComparing ? this.handleAvatarChoose : undefined}>
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

  renderEditButtons (t, isFetching, resultOfComparing) {
    const TABS = [
      {
        name: t('general')
      },
      {
        name: t('password')
      }
    ]
    return (
      <div className='profile-edit-buttons'>
        {resultOfComparing
          ? <div className='user-settings-nav-bar'>
            {TABS.map(({ name, path }) =>
              <NavLink
                key={name}
                className={(this.state.isShowGeneral && name === t('general')) || (!this.state.isShowGeneral && name === t('password')) ? 'activity-nav-bar-tab active-link' : 'activity-nav-bar-tab'}
                to='#'
                activeClassName='active-link'
                onClick={({target}) => this.changeState(target)}
                name={name}
              >
                {name}
              </NavLink>
            )}
          </div>
          : <h2 className='recent-work-list-wrapper-header'>{t('general_information')}</h2>
        }
        { isFetching
          ? <div className='sweet-loading'>
            {
              this.state.isShowGeneral
                ? <span className='user-loading-info'>{t('data_is_changing')}</span>
                : <span className='user-loading-info'>{t('password_is_changing')}</span>
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

  renderMainInfo (t, i18n, errorsUser, user, successful, errors, resultOfComparing) {
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
          resultOfComparing={resultOfComparing}
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
    if (this.props.isNotFound.hasOwnProperty('isNotFound') && this.props.match.params.login !== this.props.userLogin) {
      return <Redirect to='/' />
    }
    const { t, i18n, isFetching } = this.props
    const user = this.props.resultOfComparing ? this.props.userSettings.user : this.props.compareUser
    const { firstName, lastName, avatar } = user
    const errorsUser = this.props.userSettings.hasOwnProperty('errors') ? this.props.userSettings.errors : []
    const { successful, errors } = this.props.resultOfChecking
    return (
      <div className='main-wrapper'>
        <div className='profile-page-header'>
          { this.renderAddPhoto(t, this.props.resultOfComparing) }
          <ManagePhoto display={this.handleManagePhoto} t={t} />
          { this.renderHeaderCenter(t, firstName, lastName, avatar, this.props.resultOfComparing)}
        </div>
        <div className='profile-page-center-content'>
          { this.renderClock() }
          <hr />
          { this.renderEditButtons(t, isFetching, this.props.resultOfComparing) }
          { this.renderMainInfo(t, i18n, errorsUser, user, successful, errors, this.props.resultOfComparing) }
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
  resultOfComparing: PropTypes.bool,
  userLogin: PropTypes.string,
  compareUser: PropTypes.object,
  isNotFound: PropTypes.object,
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
    userLogin: state.verification.user.login,
    userAvatar: state.verification.user.avatar,
    userHistory: state.user.userHistory,
    isNotFound: state.user.getUser,
    compareUser: state.user.getUser._doc ? state.user.getUser._doc : state.verification.user,
    resultOfComparing: state.user.getUser.resultOfComparing
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ updateUser, checkPassword, sendAvatarRequest, getUserUpdatesRequest, compareUserRequest }, dispatch)
  }
}

export default translate('translations')(withRouter(connect(mapStateToProps, mapDispatchToProps)(User)))
