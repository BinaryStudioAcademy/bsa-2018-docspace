import React, {Component} from 'react'
import PropTypes from 'prop-types'
import PermissionsTable from './permissionsTable'
import './permissionsPage.css'

export default class PermissionsPage extends Component {
  constructor (props) {
    super(props)
    const { groups, users, anonymous } = this.props
    this.state = {
      isEditing: false,
      groups: { ...this.splateRestrictions(groups) },
      users: { ...this.splateRestrictions(users) },
      anonymous: { ...this.splateRestrictionsForSingleObject(anonymous) }
    }
    console.log(this.state)
  }

  renderGroupsPermissionsSection= () => (
    <React.Fragment>
      <h3>Groups permissions</h3>
      <p>Permissions for this space for all members of the group.</p>
      <PermissionsTable
        isEditing={this.state.isEditing}
        items={this.props.groups}
        restictionsCategory={'groups'}
        restrictionsByItemsId={this.state.groups}
        handleChangePermission={this.handleChangePermission}
        handleToggleAllCLick={this.setAllpermissionForTargetEntityTo}
      />
    </React.Fragment>
  )

  renderUsersPermissionsSection = () => (
    <React.Fragment>
      <h3>Users permissions</h3>
      <p>Grant permissions to individual users, regardless of which group they are members of.</p>
      <PermissionsTable
        isEditing={this.state.isEditing}
        items={this.props.users}
        restictionsCategory={'users'}
        restrictionsByItemsId={this.state.users}
        handleChangePermission={this.handleChangePermission}
        handleToggleAllCLick={this.setAllpermissionForTargetEntityTo}
      />
    </React.Fragment>
  )

  renderAnonymousPermissionsSection = () => (
    <React.Fragment>
      <h3>Anonymous access</h3>
      <p>If your Confluence is public, you can grant permissions to people who are not authorized on the site.</p>
      <PermissionsTable
        isEditing={this.state.isEditing}
        items={[{_id: 'anonymous', name: 'anonymous users', permissions: this.props.anonymous.permissions}]}
        restictionsCategory={'anonymous'}
        restrictionsByItemsId={{ anonymous: {...this.state.anonymous} }}
        handleChangePermission={this.handleChangePermission}
        handleToggleAllCLick={this.setAllpermissionForTargetEntityTo}
      />
    </React.Fragment>
  )

   handleCancelEditingClick = () => {
     this.setState({
       isEditing: false,
       groups: { ...this.splateRestrictions(this.props.groups) }
     })
   }

   setAllpermissionForTargetEntityTo = (category, entityId, boolValue) => {
     if (category === 'anonymous') {
       return this.setState({
         anonymous:
           Object.keys(this.state.anonymous).reduce((permissions, permissionName) => {
             permissions[permissionName] = boolValue
             return permissions
           }, {})
       })
     }

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

   handleSaveEditingClick = () => {

   }

   // Transform permissions from { blog: {edit: true, delete: true}, ... } to { 'edit blog': true, 'delete blog': true}
   // Need for more comfortable woek with state
   // Before request on server should transform back
   splateRestrictionsForSingleObject = (item) => (
     Object.keys(item.permissions).reduce((rights, entity) => {
       Object.keys(item.permissions[entity]).forEach(action => {
         rights[ action + ' ' + entity ] = item.permissions[entity][action]
       })
       return rights
     }, {})
   )

   splateRestrictions = (items) => (
     items.reduce((rightsByItemId, item) => {
       rightsByItemId[item._id] = this.splateRestrictionsForSingleObject(item)
       return rightsByItemId
     }, {})
   )

  handleChangePermission = (category, entityId, restriction, value) => {
    if (category === 'anonymous') {
      return this.setState({
        anonymous: {
          ...this.state.anonymous,
          [restriction]: value
        }
      })
    }

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
  anonymous: PropTypes.object
}

PermissionsPage.defaultProps = {
  groups: [
    {
      name: 'My Group',
      _id: 'groupId',
      permissions: {
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
        attachments: {
          add: false,
          delete: true
        },
        space: {
          export: true,
          administate: true
        },
        restrictions: {
          edit: true
        },
        mail: {
          delete: true
        }
      }
    },
    {
      name: 'My Second Group',
      _id: 'groupIdasdfasdfasdf',
      permissions: {
        all: {
          view: true
        },
        pages: {
          add: true,
          delete: true
        },
        blog: {
          add: true,
          delete: true
        },
        comments: {
          add: true,
          delete: true
        },
        attachments: {
          add: true,
          delete: true
        },
        space: {
          export: true,
          administate: true
        },
        restrictions: {
          edit: true
        },
        mail: {
          delete: true
        }
      }
    }
  ],
  users: [
    {
      name: 'Fake User',
      _id: 'some user id',
      permissions: {
        all: {
          view: true
        },
        pages: {
          add: false,
          delete: true
        },
        blog: {
          add: true,
          delete: false
        },
        comments: {
          add: true,
          delete: true
        },
        attachments: {
          add: true,
          delete: true
        },
        space: {
          export: true,
          administate: false
        },
        restrictions: {
          edit: true
        },
        mail: {
          delete: false
        }
      }
    }
  ],
  anonymous: {

    permissions: {
      all: {
        view: true
      },
      pages: {
        add: false,
        delete: true
      },
      blog: {
        add: true,
        delete: false
      },
      comments: {
        add: true,
        delete: true
      },
      attachments: {
        add: true,
        delete: true
      },
      space: {
        export: true,
        administate: false
      },
      restrictions: {
        edit: true
      },
      mail: {
        delete: false
      }
    }

  }
}
