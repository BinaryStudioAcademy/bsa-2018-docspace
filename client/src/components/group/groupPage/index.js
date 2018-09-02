import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getGroupRequest, updateGroupRequest } from '../logic/groupsAction'
import { getAllUserGroupsRequest, cleanMatchingUser } from '../../modals/groupDialog/logic/matchingUserActions'
import { translate } from 'react-i18next'
import { NavLink, withRouter } from 'react-router-dom'
import Input from 'src/components/common/input'
import _ from 'lodash'
import PropTypes from 'prop-types'

import './groupPage.css'

class GroupPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editDescription: false,
      addUser: false,
      filterValue: '',
      usersInGroup: []
    }
    this.onChange = this.onChange.bind(this)
  }
  componentWillMount () {
    this.props.actions.getGroupRequest(this.props.match.params.id)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps !== this.props && nextProps.group[0]) {
      this.setState({
        description: nextProps.group[0].description,
        usersInGroup: nextProps.group[0].members
      })
    }
  }

  deleteUser = (memberId) => {
    this.props.group[0].members = this.props.group[0].members.filter(id => id !== memberId)
    this.props.actions.updateGroupRequest(this.props.group[0])
  }

  updateGroupDescription = () => {
    this.props.group[0].description = this.state.description
    this.props.actions.updateGroupRequest(this.props.group[0])
    this.changeEditState()
  }

  renderTable = () => {
    const groupMembers = this.props.group[0] && this.props.group[0].membersInfo ? this.props.group[0].membersInfo : []
    const table = groupMembers.map((groupMembers, i) =>
      <tr key={i}>
        <td className='group-title'><NavLink to={`/users/${groupMembers.login}`}>{`${groupMembers.firstName} ${groupMembers.lastName}`}</NavLink></td>
        <td className=''><NavLink to={`/users/${groupMembers.login}`}>{groupMembers.email}</NavLink></td>
        <td className=''><NavLink to={`/users/${groupMembers.login}`}>{groupMembers.login}</NavLink></td>
        <td className=''><button className='groups-button' onClick={() => { this.deleteUser(groupMembers._id) }}>Remove user</button></td>
      </tr>
    )
    return table
  }

  changeEditState = () => {
    this.setState(prevState => ({
      editDescription: !prevState.editDescription
    }))
  }

  changeDescription = (target) => {
    this.setState({
      description: target.value
    })
  }

  closeEditField = () => {
    this.setState(prevState => ({
      editDescription: !prevState.editDescription,
      description: this.props.group[0].description
    }))
  }

  changeAddUserState = () => {
    this.setState(prevState => ({
      addUser: !prevState.addUser
    }))
  }

  changeFilter = (target) => {
    this.setState({
      filterValue: target.value
    })
  }

  search = _.debounce(target => {
    this.state.filterValue ? this.props.actions.getAllUserGroupsRequest(this.state.filterValue) : this.props.actions.cleanMatchingUser()
  }, 1000);

  onChange (target) {
    this.changeFilter(target)
    this.search(target)
  }

  renderDescription = () => {
    const group = this.props.group[0]
    const forAutoFocus = true
    const description = this.state.editDescription
      ? <div className='group-user-filter'>
        <textarea autoFocus={forAutoFocus} value={this.state.description} onChange={({target}) => this.changeDescription(target)} />
        <div>
          <button className='accept-button' onClick={this.updateGroupDescription}>Save</button>
          <button onClick={this.closeEditField}>Close</button>
        </div>
      </div>
      : <div className='group-content-container'>
        <h2 className='group-description'>{group ? group.description || 'No description' : ''}</h2>
        <button onClick={this.changeEditState}>Edit</button>
      </div>
    return description
  }

  updateGroupMembers = () => {
    const group = this.props.group[0]
    group.members = this.state.usersInGroup
    this.props.actions.updateGroupRequest(group)
    this.changeAddUserState()
  }

  renderAddUser = () => {
    const forAutoFocus = true
    return this.state.addUser
      ? <div className='group-user-filter'>
        <Input
          label='User name contains'
          value={this.state.filterValue}
          onChange={({target}) => this.onChange(target)}
          name='name'
          id='name'
          inputType='text'
          autoFocus={forAutoFocus}
        />
        <div>
          <button className='accept-button' onClick={() => this.updateGroupMembers()}>Add users</button>
          <button onClick={this.changeAddUserState}>Cancel</button>
        </div>
        <div className='group-users-list'>
          {this.renderUsers()}
        </div>
        <h3>Members</h3>
      </div>
      : <div className='group-content-container'>
        <h3>Members</h3>
        <button className='groups-button' onClick={this.changeAddUserState}>Add user</button>
      </div>
  }

  renderUsers = () => {
    let usersTable
    this.props.matchingUsers !== []
      ? usersTable = this.props.matchingUsers.map((user, i) =>
        user._id !== this.props.user._id &&
        <button onClick={() => { this.addUsersInGroup(user._id) }} key={i}>{user.name + '  '}<i className='fas fa-plus' /></button>
      ) : usersTable = ''
    return usersTable
  }

  addUsersInGroup = (id) => {
    this.setState(prevState => ({
      usersInGroup: [...prevState.usersInGroup, id]
    }))
  }

  render () {
    const group = this.props.group[0]
    return (
      <div className='group-page-container'>
        <NavLink to='/admin/groups'><i className='fas fa-arrow-left' /></NavLink>
        <h1 className='group-title'>{group ? group.title : ''}</h1>
        {this.renderDescription()}
        {this.renderAddUser()}
        <table>
          <thead>
            <th>Full name</th>
            <th>Email address</th>
            <th>Login</th>
            <th />
          </thead>
          <tbody>
            {this.renderTable()}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    group: state.groups,
    matchingUsers: state.matchingUsers,
    user: state.verification.user
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(
      {
        getGroupRequest,
        updateGroupRequest,
        getAllUserGroupsRequest,
        cleanMatchingUser
      }
      , dispatch)
  }
}

GroupPage.propTypes = {
  matchingUsers: PropTypes.array,
  user: PropTypes.object,
  actions: PropTypes.object,
  match: PropTypes.object,
  group: PropTypes.array
}

export default translate('translations')(withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupPage)))
