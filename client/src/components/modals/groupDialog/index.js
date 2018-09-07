import React, {Component} from 'react'
import Modal from 'src/components/common/modal'
import Input from 'src/components/common/input'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createGroupRequest, updateGroupRequest } from '../../group/logic/groupsAction'
import { getAllUserGroupsRequest, cleanMatchingUser, sendInvitation } from './logic/matchingUserActions'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { translate } from 'react-i18next'
import _ from 'lodash'

import './groupModal.css'

class GroupDialog extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      user: '',
      usersInGroup: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.createGroup = this.createGroup.bind(this)
  }
  renderHeader = () => {
    const {t} = this.props
    return <h2 className='modal-header-group'>{t('Create group')}</h2>
  }
  search = _.debounce(target => {
    this.state.user ? this.props.actions.getAllUserGroupsRequest(this.state.user) : this.props.actions.cleanMatchingUser()
  }, 1000);

  onChange (target) {
    this.handleChange(target)
    this.search(target)
  }

  renderUserList = () => {
    const noUsers = this.props.t('no_user')
    let userList = ''
    if (this.state.usersInGroup.length) {
      this.state.usersInGroup.forEach((user, i) => {
        userList += user.name
        userList += i !== this.state.usersInGroup.length - 1 ? ', ' : ''
      })
    } else {
      userList = noUsers
    }
    return userList
  }

  renderContent = () => {
    const {t} = this.props
    const forAutoFocus = true
    return <React.Fragment>
      <div className='group'>
        <div className='group-dialog-row'>
          <div className='group-modal-label'><label htmlFor='name'>{t('name')}<span>*</span></label></div>
          <div className='group-modal-input'><Input label={t('name')}
            value={this.state.name}
            onChange={({target}) => this.handleChange(target)}
            name='name'
            id='name'
            inputType='text'
            autoFocus={forAutoFocus}
          /></div>
        </div>
        <div className='group-dialog-row'>
          <div className='group-modal-label'><label htmlFor='description'>{t('description')}</label></div>
          <div className='group-modal-input'><Input label={t('description')}
            value={this.state.description}
            onChange={({target}) => this.handleChange(target)}
            name='description'
            id='description'
            inputType='text'
          /></div>
        </div>
        <div className='group-dialog-row'>
          <div className='group-modal-label'><label htmlFor='user'>{t('added_users')}</label></div>
          <div className='group-modal-input group-added-users'>
            <p>{this.renderUserList()}</p>
          </div>
        </div>
        <div className='group-dialog-row'>
          <div className='group-modal-label'><label htmlFor='user'>{t('user_search')}</label></div>
          <div className='group-modal-input'>
            <Input label={t('user_name_contains')}
              value={this.state.user}
              onChange={({target}) => this.onChange(target)}
              name='user'
              id='user'
              inputType='text'
            />
          </div>
        </div>
        <div className='group-dialog-row'>
          <div className='group-modal-label' />
          <div className='group-modal-input'>
            <div>
              {this.renderUsers()}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  }

  renderUsers = () => {
    let usersTable
    this.props.matchingUsers !== []
      ? usersTable = this.props.matchingUsers.map((user, i) => {
        const {_id, name, email} = user
        return user._id !== this.props.user._id &&
          <button onClick={() => { this.manageUser(_id, name, email) }} key={i}>{user.name + '  '}
            <i className='fas fa-plus' />
          </button>
      }) : usersTable = ''
    return usersTable
  }

  manageUser = (id, name, email) => {
    const { usersInGroup } = this.state
    const index = usersInGroup.findIndex(user => user.id === id)
    if (index === -1) {
      this.addUsersInGroup(id, name, email)
    } else {
      this.deleteUserFromGroup(id, name, email)
    }
  }

  addUsersInGroup = (id, name, email) => {
    this.setState(prevState => ({
      usersInGroup: [...prevState.usersInGroup, {id, name, email}]
    }))
  }

  deleteUserFromGroup = (memberId) => {
    this.setState(prevState => ({
      usersInGroup: prevState.usersInGroup.filter(user => user.id !== memberId)
    }))
  }

  handleChange = (target) => {
    this.setState({[target.name]: target.value})
  }

  createGroup = () => {
    let inviteNewUser = false
    const { actions, cancelModal, user } = this.props
    const { name, description, usersInGroup } = this.state
    const members = this.state.usersInGroup.map(member => member.id)
    members.push(this.props.user._id)
    const group = {
      members: members,
      title: name,
      description: description
    }
    actions.createGroupRequest(group)
    actions.sendInvitation(usersInGroup, inviteNewUser, `${user.firstName} ${user.lastName}`, group.title)
    this.state.user = ''
    this.state.usersInGroup = []
    this.props.cancelModal()
    cancelModal()
  }

  renderFooter = () => {
    const {t} = this.props
    const idDisabled = !this.state.name
    return <div className='modal-footer-group'>
      <button
        className='accept-button'
        onClick={this.createGroup}
        disabled={idDisabled}
      >{t('create')}</button>
      <button onClick={this.props.cancelModal}>{t('close')}</button>
    </div>
  }

  render () {
    return (
      <React.Fragment>
        <Modal
          renderHeader={this.renderHeader}
          renderContent={this.renderContent}
          renderFooter={this.renderFooter}
          closeModal={this.props.cancelModal}
        />
      </React.Fragment>
    )
  }
}

GroupDialog.propTypes = {
  user: PropTypes.object,
  actions: PropTypes.object,
  cancelModal: PropTypes.func,
  t: PropTypes.func,
  matchingUsers: PropTypes.array
}

const mapStateToProps = (state) => {
  return {
    groups: state.groups,
    user: state.verification.user,
    matchingUsers: state.matchingUsers
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(
      {
        createGroupRequest,
        getAllUserGroupsRequest,
        cleanMatchingUser,
        updateGroupRequest,
        sendInvitation
      }
      , dispatch)
  }
}

export default translate('translations')(withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupDialog)))
