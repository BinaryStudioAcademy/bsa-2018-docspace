import React, {Component} from 'react'
import Camera from 'src/assets/add-photo-img.png'
import PropTypes from 'prop-types'
import { getUserData, updateUser, checkPassword } from './logic/userActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ManagePhoto } from 'src/components/managePhotos/managePhotos'
import ProfileFields from 'src/components/userTabs/general'
import PrivateFields from 'src/components/userTabs/private'
import RecentWorkListItem from 'src/components/recentWorkListItem/recentWorkListItem'

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
    this.changeTab = this.changeTab.bind(this)
    this.sendPassword = this.sendPassword.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
  }

  handlePassword (currentPassword) {
    this.props.actions.checkPassword({
      email: this.props.user.email,
      password: currentPassword
    })
  }

  changeTab () {
    if (!this.state.isEditMode) {
      this.setState(prevState => {
        return { isShowGeneral: !prevState.isShowGeneral }
      })
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
        id: this.props.match.params.id,
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

  componentWillMount () {
    this.props.actions.getUserData(this.props.match.params.id)
  }

  render () {
    const { firstName, lastName } = this.props.user
    const { successful, errors } = this.props.resultOfChecking
    console.log(`render`, successful, errors)
    return (
      <React.Fragment>
        <div className='main-wrapper'>
          <div className='left-side-wrapper'>
            <div>
              <div className='left-side-content'>
                <div className='left-side-items'>0</div>
              </div>
            </div>
          </div>
          <div className='content-wrapper'>
            <div className='profile-page'>
              <div className='profile-page-responsive'>
                <div className='profile-page-header'>
                  <div className='profile-header-add-photo' onClick={this.managePhoto}>
                    <div className='add-photo-content'>
                      <button className='add-photo-button'>
                        <img src={Camera} alt='camera' className='add-photo-img' />
                        <span className='add-photo-label'>Add cover photo</span>
                      </button>
                    </div>
                  </div>

                  <ManagePhoto display={this.handleManagePhoto} />

                  <div className='profile-page-center'>
                    <a className='profile-link-All-People'>
                      <span className='profile-link-arrow-img'>
                        <i className='fa fa-arrow-left' aria-hidden='true' />
                      </span>
                      <span>All people</span>
                    </a>
                    <div className='profile-name-avatar'>
                      <div className='profile-avatar-wrapper'>
                        <button className='avatar-btn'>
                          <span className='profile-avatar-cover-btn' >''</span>
                        </button>
                        <div className='profile-avatar-hover'>
                          <i className='fa fa-camera profile-avatar-camera' aria-hidden='true' style={{color: 'white', fontSize: '24px'}} />
                        </div>
                      </div>

                      <div className='profile-name'>
                        <h1>{firstName} {lastName}</h1>
                      </div>
                    </div>
                  </div>
                  <div className='profile-page-center-content'>
                    <div className='profile-about'>
                      <div className='profile-status'>
                        <div className='profile-label-time'>
                          <i className='fa fa-clock-o label-clock' aria-hidden='true' />
                          <span>{this.state.date.toLocaleTimeString().replace(/:\d+ /, ' ')}</span>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className='profile-edit-buttons'>
                      <div className='edit-manage-btn'>
                        <div className='manage-btn'>
                          <button onClick={this.changeTab}>General</button>
                        </div>
                        <div className='manage-btn'>
                          <button onClick={this.changeTab}>Private</button>
                        </div>
                      </div>
                    </div>
                    {
                      !this.state.isShowGeneral &&
                        <PrivateFields
                          handlePassword={this.handlePassword}
                          user={this.props.user}
                          errors={errors}
                          successful={successful}
                          sendPassword={this.sendPassword}
                        />
                    }
                    {
                      this.state.isShowGeneral &&
                      <ProfileFields
                        isEditMode={this.state.isEditMode}
                        editMode={this.editMode}
                        user={this.props.user}
                      />
                    }

                    <div className='recent-work-list-wrapper'>
                      <h2 className='recent-work-list-wrapper-header'><span>Work</span></h2>
                      <ul className='recent-work-list-items'>
                        <RecentWorkListItem
                          src={'https://home-static.us-east-1.prod.public.atl-paas.net/confluence-page-icon.svg'}
                          nameOfItem={'i am checking how it works'}
                          nameOfSpace={'Draft'}
                          contributors={''}
                        />
                        <RecentWorkListItem
                          src={'https://home-static.us-east-1.prod.public.atl-paas.net/confluence-page-icon.svg'}
                          nameOfItem={'Example'}
                          nameOfSpace={'Draft'}
                          contributors={''}
                        />
                        <RecentWorkListItem
                          src={'https://home-static.us-east-1.prod.public.atl-paas.net/confluence-blogpost-icon.svg'}
                          nameOfItem={'Example'}
                          nameOfSpace={'my first blog post'}
                          contributors={''}
                        />
                      </ul>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
User.defaultProps = {
  result: {
    requesting: false,
    successful: false,
    messages: [],
    errors: []
  }
}

User.propTypes = {
  user: PropTypes.object,
  match: PropTypes.object,
  params: PropTypes.array,
  id: PropTypes.string,
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
    user: state.user.userReducer,
    resultOfChecking: state.user.checkingReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ getUserData, updateUser, checkPassword }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
