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
import { MoonLoader } from 'react-spinners'

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
    const {t} = this.props
    const groupMembers = this.props.group[0] && this.props.group[0].membersInfo ? this.props.group[0].membersInfo : []
    const table = groupMembers.map((groupMembers, i) =>
      <tr key={i}>
        <td className='group-title'><NavLink to={`/users/${groupMembers.login}`}>{`${groupMembers.firstName} ${groupMembers.lastName}`}</NavLink></td>
        <td className=''><NavLink to={`/users/${groupMembers.login}`}>{groupMembers.email}</NavLink></td>
        <td className=''><NavLink to={`/users/${groupMembers.login}`}>{groupMembers.login}</NavLink></td>
        <td className=''><button className='groups-button' onClick={() => { this.deleteUser(groupMembers._id) }}>{t('remove_user')}</button></td>
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
    const {t} = this.props
    const group = this.props.group[0]
    const forAutoFocus = true
    const description = this.state.editDescription
      ? <div className='group-user-filter'>
        <textarea autoFocus={forAutoFocus} value={this.state.description} onChange={({target}) => this.changeDescription(target)} />
        <div>
          <button className='accept-button' onClick={this.updateGroupDescription}>{t('Save')}</button>
          <button onClick={this.closeEditField}>{t('close')}</button>
        </div>
      </div>
      : <div className='group-content-container'>
        <h2 className='group-description'>{group ? group.description || t('no_description') : ''}</h2>
        <button onClick={this.changeEditState}>{t('edit')}</button>
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
    const {t} = this.props
    const forAutoFocus = true
    return this.state.addUser
      ? <div className='group-user-filter'>
        <Input
          label={t('user_name_contains')}
          value={this.state.filterValue}
          onChange={({target}) => this.onChange(target)}
          name='name'
          id='name'
          inputType='text'
          autoFocus={forAutoFocus}
        />
        <div>
          <button className='accept-button' onClick={() => this.updateGroupMembers()}>{t('add_user')}</button>
          <button onClick={this.changeAddUserState}>{t('cancel')}</button>
        </div>
        <div className='group-users-list'>
          {this.renderUsers()}
        </div>
        <h3>{t('members')}</h3>
      </div>
      : <div className='group-content-container'>
        <h3>{t('members')}</h3>
        <button className='groups-button' onClick={this.changeAddUserState}>{t('add_user')}</button>
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
    const {t, isFetching} = this.props
    return (
      <div className='group-page-container'>
        <NavLink to='/admin/groups'><i className='fas fa-arrow-left' /></NavLink>
        {isFetching || !group
          ? <div className='moon-loader-container'>
            <MoonLoader
              sizeUnit={'px'}
              size={32}
              color={'#123abc'}
            />
          </div>
          : <React.Fragment>
            <h1 className='group-title'>{group ? group.title : ''}</h1>
            {this.renderDescription()}
            {this.renderAddUser()}
            <table>
              <thead>
                <th>{t('full_name')}</th>
                <th>{t('email_address')}</th>
                <th>{t('login')}</th>
                <th />
              </thead>
              <tbody>
                {this.renderTable()}
              </tbody>
            </table>
          </React.Fragment>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    group: state.groups.results,
    matchingUsers: state.matchingUsers,
    user: state.verification.user,
    isFetching: state.groups.isFetching
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
  group: PropTypes.array,
  t: PropTypes.func,
  isFetching: PropTypes.bool
}

export default translate('translations')(withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupPage)))
