import React, {Component} from 'react'
import PropTypes from 'prop-types'
import PermissionsTable from './permissionsTable'
import { getSpacePermissionsRequest } from './logic/permissionsActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { translate } from 'react-i18next'
import { getSpacePermissionsForCurrentSpace } from 'src/components/space/spaceContainer/logic/spaceReducer'

import './permissionsPage.css'
import _ from 'lodash'

import PermissionsService from 'src/services/permissionsService'

export class PermissionsPage extends Component {
  constructor (props) {
    super(props)
    // const { groups, users, anonymous } = this.props
    this.state = {
      isEditing: false
      // groups: { ...this.splateRestrictions(groups) },
      // users: { ...this.splateRestrictions(users) },
      // anonymous: { ...this.splateRestrictionsForSingleObject(anonymous) }
    }
    // console.log(this.state)
    // console.log('constructor')
    // console.log(this.props)
  }

  componentDidMount () {
    this.props.space && this.props.actions.getSpacePermissionsRequest(this.props.space._id)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.permissions) {
      console.log(' GETTING PERMISSIONS')

      this.setState({
        groups: { ...this.splateRestrictions(nextProps.permissions.groups) },
        users: { ...this.splateRestrictions(nextProps.permissions.users) },
        anonymous: {
          [nextProps.permissions.anonymous._id]: { ...this.splateRestrictionsForSingleObject(nextProps.permissions.anonymous) }
        }
      })
    }

    console.log(this.state)
  }

  renderGroupsPermissionsSection= () => (
    <React.Fragment>
      <h3>Groups permissions</h3>
      <p>Permissions for this space for all members of the group.</p>
      {
        this.splatArrayWithEmptyObjects(this.props.permissions.groups).length > 0 &&
        <PermissionsTable
          isEditing={this.state.isEditing}
          items={this.splatArrayWithEmptyObjects(this.props.permissions.groups)}
          restictionsCategory={'groups'}
          restrictionsByItemsId={this.state.groups}
          handleChangePermission={this.handleChangePermission}
          handleToggleAllCLick={this.setAllpermissionForTargetEntityTo}
        />
      }
      {
        this.state.isEditing &&
        <button onClick={() => {
          PermissionsService.createAnonymousPermissions(this.props.space._id)
        }}
        >anon</button>
      }

    </React.Fragment>
  )

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
          restrictionsByItemsId={this.state.users}
          handleChangePermission={this.handleChangePermission}
          handleToggleAllCLick={this.setAllpermissionForTargetEntityTo}
        />
      }

      {
        this.state.isEditing &&
          <button onClick={() => {
            PermissionsService.getSpacePermissions(this.props.space._id)
          }}
          >get permission</button>
      }
    </React.Fragment>
  )

  renderAnonymousPermissionsSection = () => (
    <React.Fragment>
      <h3>Anonymous access</h3>
      <p>If your Confluence is public, you can grant permissions to people who are not authorized on the site.</p>
      {
        this.props.permissions.anonymous &&
        <PermissionsTable
          isEditing={this.state.isEditing}
          items={[ this.props.permissions.anonymous ]}
          restictionsCategory={'anonymous'}
          restrictionsByItemsId={this.state.anonymous}
          handleChangePermission={this.handleChangePermission}
          handleToggleAllCLick={this.setAllpermissionForTargetEntityTo}
        />
      }
    </React.Fragment>
  )

  splatArrayWithEmptyObjects = (arr) => (
    arr.reduce((arr, item) => {
      if (item && !_.isEmpty(item)) {
        arr.push(item)
      }
      return arr
    }, [])
  )

   handleCancelEditingClick = () => {
     this.setState({
       isEditing: false,
       groups: { ...this.splateRestrictions(this.props.permissions.groups) },
       users: { ...this.splateRestrictions(this.props.permissions.users) },
       anonymous: {
         [this.props.permissions.anonymous._id]: { ...this.splateRestrictionsForSingleObject(this.props.permissions.anonymous) }
       }
     })
   }

   setAllpermissionForTargetEntityTo = (category, entityId, boolValue) => {
     //  if (category === 'anonymous') {
     //    return this.setState({
     //      anonymous:
     //        Object.keys(this.state.anonymous).reduce((permissions, permissionName) => {
     //          permissions[permissionName] = boolValue
     //          return permissions
     //        }, {})
     //    })
     //  }

     this.setState({
       [category]: {
         ...this.state[category],
         [entityId]: {
           ...Object.keys(this.state[category][entityId]).reduce((permissions, permissionName) => {
             permissions[permissionName] = boolValue
             return permissions
           }, {})
         }
       }
     })
   }

   //  normalizePermissionsFromState = (permissionsById) => {
   //    Object.keys(permissionsById).map(id => {
   //      let rights = { _id: id }
   //      const rights = Object.keys(permissionsById[id]).reduce()
   //    })
   //  }

   //  handleSaveEditingClick = () => {
   //    let res = []
   //    let anonymous = this.state.anon
   //    //  PermissionsService.updateManyPermissionsObjects()
   //  }

   // Transform permissions from { blog: {edit: true, delete: true}, ... } to { 'edit blog': true, 'delete blog': true}
   // Need for more comfortable woek with state
   // Before request on server should transform back
   splateRestrictionsForSingleObject = (item) => (
     Object.keys(item).reduce((rights, key) => {
       Object.keys(item[key]).forEach(action => {
         if (key !== '_id' && key !== 'user' && key !== 'userId' && key !== 'group' && key !== 'groupId') {
           rights[ action + ' ' + key ] = item[key][action]
         }
       })
       return rights
     }, {})
   )

   splateRestrictions = (items) => (
     items.reduce((rightsByItemId, item) => {
       item._id && (rightsByItemId[item._id] = this.splateRestrictionsForSingleObject(item))
       return rightsByItemId
     }, {})
   )

  handleChangePermission = (category, entityId, restriction, value) => {
    // if (category === 'anonymous') {
    //   return this.setState({
    //     anonymous: {
    //       ...this.state.anonymous,
    //       [restriction]: value
    //     }
    //   })
    // }

    this.setState({
      [category]: {
        ...this.state[category],
        [entityId]: {
          ...this.state[category][entityId],
          [restriction]: value
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
    console.log('RENDER')
    console.log(this.props)
    if (!this.state.groups || !this.state.users) return null
    console.log(this.state)
    return (
      <div className='space-permissions-page'>

        { this.props.permissions && this.renderGroupsPermissionsSection() }
        { this.props.permissions && this.renderUsersPermissionsSection() }
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
  actions: PropTypes.object
}

PermissionsPage.defaultProps = {
  users: [
    {
      user: {
        name: 'name',
        surname: 'surname'
      },
      _id: 'permissions id',
      userId: 'lol',

      all: {
        view: true
      },
      pages: {
        add: true,
        delete: true
      },
      blog: {
        add: false,
        delete: true
      },
      comments: {
        add: true,
        delete: true
      },
      space: {
        export: true,
        administate: true
      }
    }
  ],

  groups: [
    {}, {}
  ]
  // groups: [
  //   {
  //     name: 'My Group',
  //     _id: 'groupId',
  //     permissions: {
  //       all: {
  //         view: true
  //       },
  //       pages: {
  //         add: true,
  //         delete: true
  //       },
  //       blog: {
  //         add: false,
  //         delete: true
  //       },
  //       comments: {
  //         add: true,
  //         delete: true
  //       },
  //       space: {
  //         export: true,
  //         administate: true
  //       }
  //     }
  //   },
  //   {
  //     name: 'My Second Group',
  //     _id: 'groupIdasdfasdfasdf',
  //     permissions: {
  //       all: {
  //         view: true
  //       },
  //       pages: {
  //         add: true,
  //         delete: true
  //       },
  //       blog: {
  //         add: true,
  //         delete: true
  //       },
  //       comments: {
  //         add: true,
  //         delete: true
  //       },
  //       space: {
  //         export: true,
  //         administate: true
  //       }
  //     }
  //   }
  // ],
  // users: [
  //   {
  //     name: 'Fake User',
  //     _id: 'some user id',
  //     permissions: {
  //       all: {
  //         view: true
  //       },
  //       pages: {
  //         add: false,
  //         delete: true
  //       },
  //       blog: {
  //         add: true,
  //         delete: false
  //       },
  //       comments: {
  //         add: true,
  //         delete: true
  //       },
  //       space: {
  //         export: true,
  //         administate: false
  //       }
  //     }
  //   }
  // ],
  // anonymous: {

  //   permissions: {
  //     all: {
  //       view: true
  //     },
  //     pages: {
  //       add: false,
  //       delete: true
  //     },
  //     blog: {
  //       add: true,
  //       delete: false
  //     },
  //     comments: {
  //       add: true,
  //       delete: true
  //     },
  //     space: {
  //       export: true,
  //       administate: false
  //     }
  //   }

  // }
}

const mapStateToProps = (state, props) => {
  return {
    permissions: getSpacePermissionsForCurrentSpace(state, props.match.params.space_id)
  }
}
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(
      {
        getSpacePermissionsRequest
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
