import React, {Component} from 'react'
import PropTypes from 'prop-types'
import PermissionsTable from './permissionsTable'
import { getSpacePermissionsRequest, updateSpacePermissionsRequest } from './logic/permissionsActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { translate } from 'react-i18next'
import { currentSpacePermissions, isFetchingForPermissions } from 'src/components/space/spaceSettings/permissions/logic/permissionsReducer'
import { EntityNamesForPermissionsSettingsArray } from './logic/constants'
import AddPermissionsForm from './addPermissionsForm'

// TODO: RENEMA SEARCH ACTIONS, RENEMA REDUCE, MOVE INTO SERACH LOGIN IN COMMON FOLDER
import {getMatchingPagesRequest, cleanMatchingPages} from 'src/components/modals/searchModal/logic/searchActions'
import { MoonLoader } from 'react-spinners'

import './permissionsPage.css'
// import _ from 'lodash'

// import PermissionsService from 'src/services/permissionsService'

export class PermissionsPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isEditing: true
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

  renderGroupsPermissionsSection = () => {
    const items = this.permissionsFromState(this.props.permissions.groups)

    return (
      <React.Fragment>
        <h3>Groups permissions</h3>
        <p>Permissions for this space for all members of the group.</p>
        {
          this.props.permissions.groups.length > 0 &&
          <PermissionsTable
            isEditing={this.state.isEditing}
            items={this.props.permissions.groups}
            restictionsCategory={'groups'}
            restrictionsByItemsId={items}
            handleChangePermission={this.handleChangePermission}
            handleToggleAllCLick={this.setPermissionsForAllEntityTo}
          />
        }
        {
          this.state.isEditing &&
          <AddPermissionsForm
            searchPlaceholder='Group name'
            renderSearchedEntityLiContent={this.renderUserLiContent}
          />
        }

      </React.Fragment>
    )
  }

  renderUsersPermissionsSection = () => (
    <React.Fragment>
      <h3>Users permissions</h3>
      <p>Grant permissions to individual users, regardless of which group they are members of.</p>
      {
        this.props.permissions.users.length > 0 &&
        <PermissionsTable
          isEditing={this.state.isEditing}
          items={this.props.permissions.users}
          restictionsCategory={'users'}
          restrictionsByItemsId={this.permissionsFromState(this.props.permissions.users)}
          handleChangePermission={this.handleChangePermission}
          handleToggleAllCLick={this.setPermissionsForAllEntityTo}
        />
      }

      {
        this.state.isEditing &&
        <AddPermissionsForm
          searchPlaceholder='User name'
          renderSearchedEntityLiContent={this.renderUserLiContent}

        />
      }

      {/* <button onClick={() => {
            PermissionsService.getSpacePermissions(this.props.space._id)
          }}
          >get permission</button> */}
    </React.Fragment>
  )

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
        <h3>Anonymous access</h3>
        <p>If your Confluence is public, you can grant permissions to people who are not authorized on the site.</p>
        {
          anonymous && this.state.permissionsById[anonymous._id] &&
          <PermissionsTable
            isEditing={this.state.isEditing}
            items={[ anonymous ]}
            restictionsCategory={'anonymous'}
            restrictionsByItemsId={{ [anonymous._id]: this.state.permissionsById[anonymous._id] }}
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
    this.props.actions.updateSpacePermissionsRequest(changedPermissions)

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

    return (
      <div className='space-permissions-page'>

        { this.renderGroupsPermissionsSection() }
        { this.renderUsersPermissionsSection() }
        { this.renderAnonymousPermissionsSection() }

        <div className='edit-btns-wrp'>
          {
            !this.state.isEditing
              ? <button onClick={this.toggleEditing}>
                  Edit permissions
              </button>
              : <React.Fragment>
                <button className='save-btn' onClick={this.handleSaveEditingClick}>
                  Save all
                </button>
                <button onClick={this.handleCancelEditingClick}>
                  Cancel
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
  // anonymous: PropTypes.object,
  space: PropTypes.object,
  permissions: PropTypes.object,
  actions: PropTypes.object,
  isFetching: PropTypes.bool
}

PermissionsPage.defaultProps = {
}

const mapStateToProps = (state, props) => {
  return {
    permissions: currentSpacePermissions(state),
    isFetching: isFetchingForPermissions(state),
    seachedEntities: state.searchResults
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(
      {
        getSpacePermissionsRequest,
        updateSpacePermissionsRequest,

        // TODO : Dont forget renema this
        getMatchingPagesRequest,
        cleanMatchingPages
      }
      , dispatch)
  }
}

export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(PermissionsPage))

// users
// _id(pin): "5b6c572ab0e94b20bb1847ee"
// name(pin): "qweasd SDF"
// _id(pin): "5b6c619236a36c31da037912"
// name(pin): "qwe qwe"
// _id(pin): "5b6d4f3a4b3be73ec4835776"
// name(pin): "qwe qwe"
// _id(pin): "5b76a20f0d0b4e39c873dcf6"
// name(pin): "qwe qwe"
// _id(pin): "5b76a3d50d0b4e39c873dcfb"
// name(pin): "qwe qwe"

// group
// _id(pin): "5b847444535f1f1d42b5e825"
