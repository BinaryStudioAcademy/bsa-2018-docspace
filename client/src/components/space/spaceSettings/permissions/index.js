import React, {Component} from 'react'
import PropTypes from 'prop-types'
import PermissionsTable from './permissionsTable'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { translate } from 'react-i18next'
import { currentSpacePermissions, isFetchingForPermissions } from 'src/components/space/spaceSettings/permissions/logic/permissionsReducer'
import { EntityNamesForPermissionsSettingsArray } from './logic/constants'
import AddPermissionsForm from './addPermissionsForm'
import { MoonLoader } from 'react-spinners'
import { searchRequest } from 'src/commonLogic/search/searchActions'
import {
  getSpacePermissionsRequest, updateSpacePermissionsRequest,
  addUserPermissionsRequest, addGroupPermissionsRequest
} from './logic/permissionsActions'

import './permissionsPage.css'

export class PermissionsPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isEditing: false
    }
  }

  componentDidMount () {
    this.props.space && this.props.actions.getSpacePermissionsRequest(this.props.space._id)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.permissions) {
      this.setState({
        permissionsById: { ...nextProps.permissions.allById }
      })
    }
  }

  permissionsFromState = (permissionsFromProps) => (
    permissionsFromProps.reduce((res, perm) => {
      res[perm._id] = this.state.permissionsById[perm._id]
      return res
    }, {})
  )

  handleSearchGroups = (title) => {
    this.props.actions.searchRequest({ input: title, targetToSearch: 'groups by title part' })
  }

  renderGroupsPermissionsSection = () => {
    const items = this.permissionsFromState(this.props.permissions.groups)
    const { space } = this.props
    return (
      <React.Fragment>
        <h3>{this.props.t('groups_permissions')}</h3>
        <p>{this.props.t('permissions_the_group')}</p>
        {
          this.props.permissions.groups.length > 0 &&
          <PermissionsTable
            isEditing={this.state.isEditing}
            items={this.props.permissions.groups}
            permissionsByItemsId={items}
            handleChangePermission={this.handleChangePermission}
            handleToggleAllCLick={this.setPermissionsForAllEntityTo}
          />
        }
        {
          this.state.isEditing &&
          <AddPermissionsForm
            searchPlaceholder={this.props.t('group_title')}
            renderSearchedEntityLiContent={this.renderGroupLiContent}
            handleSearchEntitiesToAddPermissions={this.handleSearchGroups}
            getEntityName={(group) => group.title}
            handleAddPermissions={(targetGroup) => this.props.actions.addGroupPermissionsRequest(targetGroup, space._id)}
            idsOfEntitiesThatAlreadyHavePermissions={this.props.permissions.groups.map(perm => perm.groupId)}
          />
        }
      </React.Fragment>
    )
  }

  renderGroupLiContent (group) {
    return (
      <div className='user-li-node'>
        <i className='fas fa-users' />
        <span className='group-title'> {group.title}</span>
      </div>
    )
  }

  handleSearchUsers = (login) => {
    this.props.actions.searchRequest({ input: login, targetToSearch: 'users by login part' })
  }

  renderUsersPermissionsSection = () => {
    const { space, permissions, t } = this.props
    return (
      <React.Fragment>
        <h3>{this.props.t('users_permissions')}</h3>
        <p>{this.props.t('permissions_to_individual_users')}</p>
        {
          this.props.permissions.users.length > 0 &&
          <PermissionsTable
            isEditing={this.state.isEditing}
            items={permissions.users}
            restictionsCategory={'users'}
            permissionsByItemsId={this.permissionsFromState(permissions.users)}
            handleChangePermission={this.handleChangePermission}
            handleToggleAllCLick={this.setPermissionsForAllEntityTo}
          />
        }

        {
          this.state.isEditing &&
          <AddPermissionsForm
            searchPlaceholder={t('user_login')}
            renderSearchedEntityLiContent={this.renderUserLiContent}
            handleSearchEntitiesToAddPermissions={this.handleSearchUsers}
            getEntityName={(user) => user.firstName + ' ' + user.lastName + ' @' + user.login}
            handleAddPermissions={(targetUser) => this.props.actions.addUserPermissionsRequest(targetUser, space._id)}
            idsOfEntitiesThatAlreadyHavePermissions={[ ...permissions.users.map(perm => perm.userId), space.ownerId._id ]}
          />
        }
      </React.Fragment>
    )
  }

  renderUserLiContent = (user) => {
    return (
      <div className='user-li-node'>
        <img src={user.avatar} alt='' />
        <span className='userName'> {user.firstName + ' ' + user.lastName}</span>
        <span className='user-login'>{' @' + user.login}</span>
      </div>
    )
  }

  renderAnonymousPermissionsSection = () => {
    const { anonymous } = this.props.permissions
    return (
      <React.Fragment>
        <h3>{this.props.t('anonymous_access')}</h3>
        <p>{this.props.t('permissions_to_anonymous_users')}</p>
        {
          anonymous && this.state.permissionsById[anonymous._id] &&
          <PermissionsTable
            isEditing={this.state.isEditing}
            items={[ anonymous ]}
            permissionsByItemsId={{ [anonymous._id]: this.state.permissionsById[anonymous._id] }}
            handleChangePermission={this.handleChangePermission}
            handleToggleAllCLick={this.setPermissionsForAllEntityTo}
          />
        }
      </React.Fragment>
    )
  }

   handleCancelEditingClick = () => {
     this.setState({
       isEditing: false,
       permissionsById: this.props.permissions.allById
     })
   }

   setPermissionsForAllEntityTo = (permissionsId, boolValue) => {
     this.setState({
       permissionsById: {
         ...this.state.permissionsById,
         [permissionsId]: {
           ...this.state.permissionsById[permissionsId],
           ...EntityNamesForPermissionsSettingsArray.reduce((permissions, entity) => {
             Object.keys(this.state.permissionsById[permissionsId][entity]).forEach(action => {
               !permissions[entity] && (permissions[entity] = {})
               permissions[entity][action] = boolValue
             })
             return permissions
           }, {}),
           isChanged: true
         }
       }
     })
   }

  handleSaveEditingClick = () => {
    const changedPermissions = Object.values(this.state.permissionsById).filter(permissions => permissions.isChanged)
    this.props.actions.updateSpacePermissionsRequest(changedPermissions, this.props.space._id)

    this.setState({
      isEditing: false
    })
  }

  handleChangePermission = (permissionsId, entity, action, value) => {
    console.log(permissionsId, entity, action, value)
    this.setState({
      permissionsById: {
        ...this.state.permissionsById,
        [permissionsId]: {
          ...this.state.permissionsById[permissionsId],
          [entity]: {
            ...this.state.permissionsById[permissionsId][entity],
            [action]: value
          },
          isChanged: true
        }
      }
    })
  }

  toggleEditing = () => {
    this.setState({
      isEditing: true
    })
  }

  render () {
    if (!this.state.permissionsById || !this.props.permissions.anonymous) return null
    if (this.props.isFetching) {
      return (
        <div className='space-settings-moon-loader'>
          <MoonLoader
            sizeUnit={'px'}
            size={32}
            color={'#123abc'}
          />
        </div>
      )
    }
    const {t} = this.props
    return (
      <div className='space-permissions-page'>

        { this.renderGroupsPermissionsSection() }
        { this.renderUsersPermissionsSection() }
        { this.renderAnonymousPermissionsSection() }

        <div className='edit-btns-wrp'>
          {
            !this.state.isEditing
              ? <button onClick={this.toggleEditing}>
                {t('edit_permissions')}
              </button>
              : <React.Fragment>
                <button className='save-btn' onClick={this.handleSaveEditingClick}>
                  {t('save_all')}
                </button>
                <button onClick={this.handleCancelEditingClick}>
                  {t('cancel')}
                </button>
              </React.Fragment>
          }
        </div>

      </div>
    )
  }
}

PermissionsPage.propTypes = {
  groups: PropTypes.array,
  users: PropTypes.array,
  space: PropTypes.object,
  permissions: PropTypes.object,
  actions: PropTypes.object,
  isFetching: PropTypes.bool,
  t: PropTypes.func
}

PermissionsPage.defaultProps = {
}

const mapStateToProps = (state, props) => {
  return {
    permissions: currentSpacePermissions(state),
    isFetching: isFetchingForPermissions(state)
    // seachedEntities: state.searchResults
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(
      {
        getSpacePermissionsRequest,
        updateSpacePermissionsRequest,
        addUserPermissionsRequest,
        addGroupPermissionsRequest,
        searchRequest
      }
      , dispatch)
  }
}

export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(PermissionsPage))
