import React, {Component} from 'react'
import Camera from '../../assets/add-photo-img.png'
import PropTypes from 'prop-types'
import { getUserData, updateUser } from './logic/userActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ManagePhoto } from '../../components/managePhotos/managePhotos'

import './user.css'

class User extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isEditMode: false,
      email: '',
      login: '',
      firstName: '',
      lastName: '',
      date: new Date(),
      isShowManagePhoto: false
    }

    this.editMode = this.editMode.bind(this)
    this.renderEmail = this.renderEmail.bind(this)
    this.renderLogin = this.renderLogin.bind(this)
    this.renderFirstName = this.renderFirstName.bind(this)
    this.renderLastName = this.renderLastName.bind(this)
    this.handleEmail = this.handleEmail.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleFirstName = this.handleFirstName.bind(this)
    this.handleLastName = this.handleLastName.bind(this)
    this.managePhoto = this.managePhoto.bind(this)
    this.handleManagePhoto = this.handleManagePhoto.bind(this)
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

  managePhoto (e) {
    this.state.isShowManagePhoto ? this.setState({isShowManagePhoto: false}) : this.setState({isShowManagePhoto: true})
  }

  handleManagePhoto () {
    return this.state.isShowManagePhoto
  }

  editMode (e) {
    const user = this.props.user

    if (e.target.innerText === 'Edit profile') {
      this.setState({
        isEditMode: true,
        email: user.email,
        login: user.login,
        firstName: user.firstName,
        lastName: user.lastName
      })
    } else {
      this.setState({
        isEditMode: false
      })
      this.props.actions.updateUser({
        id: this.props.match.params.id,
        avatar: user.avatar,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        spaces: user.spaces,
        email: this.state.email,
        login: this.state.login,
        password: user.password
      })
    }

    e.target.innerText = e.target.innerText === 'Edit profile' ? 'Save Changes' : 'Edit profile'
  }

  renderEmail (email) {
    return this.state.isEditMode ? <input type='text' value={this.state.email} onChange={this.handleEmail} /> : <a href='#'>{!this.state.email ? email : this.state.email}</a>
  }

  renderLogin (login) {
    return this.state.isEditMode ? <input type='text' value={this.state.login} onChange={this.handleLogin} /> : <span className='profile-field-nickname' href='#'>@{!this.state.login ? login : this.state.login}</span>
  }

  renderFirstName (firstName) {
    return this.state.isEditMode ? <input type='text' value={this.state.firstName} onChange={this.handleFirstName} /> : <span>{!this.state.firstName ? firstName : this.state.firstName}</span>
  }

  renderLastName (lastName) {
    return this.state.isEditMode ? <input type='text' value={this.state.lastName} onChange={this.handleLastName} /> : <span>{!this.state.lastName ? lastName : this.state.lastName}</span>
  }

  componentWillMount () {
    this.props.actions.getUserData(this.props.match.params.id)
  }

  render () {
    const { email, login, firstName, lastName } = this.props.user
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
                        <div className='profile-edit-buttons'>
                          <div className='edit-manage-btn'>
                            <div className='edit-btn'>
                              <button onClick={this.editMode}>Edit profile</button>
                            </div>
                            <div className='manage-btn'>
                              <a href='#'>
                                <button>Manage Account</button>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='profile-fields-wrapper'>
                      <ul className='profile-fields-items'>
                        <li className='profile-fields-item'>
                          <div>
                            <label htmlFor='email' className='profile-fields-item-labels'>Email</label>
                            <div id='email' className='profile-fields-item-contents'>
                              {this.renderEmail.call(null, email)}
                            </div>
                          </div>
                        </li>
                        <li className='profile-fields-item'>
                          <div>
                            <label htmlFor='nickname' className='profile-fields-item-labels'>Nickname</label>
                            <div id='nickname' className='profile-fields-item-contents'>
                              {this.renderLogin.call(null, login)}
                            </div>
                          </div>
                        </li>
                        <li className='profile-fields-item'>
                          <div>
                            <label htmlFor='firstName' className='profile-fields-item-labels'>First Name</label>
                            <div id='firstName' className='profile-fields-item-contents'>
                              {this.renderFirstName.call(null, firstName)}
                            </div>
                          </div>
                        </li>
                        <li className='profile-fields-item'>
                          <div>
                            <label htmlFor='lastName' className='profile-fields-item-labels'>Last Name</label>
                            <div id='lastName' className='profile-fields-item-contents'>
                              {this.renderLastName.call(null, lastName)}
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className='recent-work-list-wrapper'>
                      <h2 className='recent-work-list-wrapper-header'><span>Work</span></h2>
                      <ul className='recent-work-list-items'>
                        <div className='recent-work-list-item'>
                          <a className='recent-work-link' href='#'>
                            <img className='recent-work-icon' src='https://home-static.us-east-1.prod.public.atl-paas.net/confluence-page-icon.svg' />
                            <span className='recent-work-name'>i am checking how it works</span>
                            <span className='recent-work-name-of-container'>Draft</span>
                            <span className='recent-work-contributors'>''</span>
                          </a>
                        </div>
                        <div className='recent-work-list-item'>
                          <a className='recent-work-link' href='#'>
                            <img className='recent-work-icon' src='https://home-static.us-east-1.prod.public.atl-paas.net/confluence-page-icon.svg' />
                            <span className='recent-work-name'>Example</span>
                            <span className='recent-work-name-of-container'>Draft</span>
                            <span className='recent-work-contributors'>''</span>
                          </a>
                        </div>
                        <div className='recent-work-list-item'>
                          <a className='recent-work-link' href='#'>
                            <img className='recent-work-icon' src='https://home-static.us-east-1.prod.public.atl-paas.net/confluence-blogpost-icon.svg' />
                            <span className='recent-work-name'>my first blog post</span>
                            <span className='recent-work-name-of-container'>Draft</span>
                            <span className='recent-work-contributors'>''</span>
                          </a>
                        </div>
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

User.propTypes = {
  user: PropTypes.object,
  match: PropTypes.object,
  params: PropTypes.array,
  id: PropTypes.string,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ getUserData, updateUser }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
