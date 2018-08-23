import React, {Component} from 'react'
import PermissionsTableHead from './permissionsTableHead'
import PermissionsTableBody from './permissionsTableBody'
import PropTypes from 'prop-types'
import './permissionsPage.css'

export default class PermissionsPage extends Component {
  constructor (props) {
    super(props)
    const { groups, users, anonymous } = this.props
    this.state = {
      isEditing: false,
      groups: { ...this.splateRestrictions(groups) },
      users: { ...this.splateRestrictions(users) },
      anonymous: anonymous
    }
  }

   handleCancelEditingClick = () => {
     this.setState({
       isEditing: false,
       groups: { ...this.splateRestrictions(this.props.groups) }
     })
   }

   handleSaveEditingClick = () => {

   }

   splateRestrictions = (items) => (
     items.reduce((rightsByItemId, item) => {
       rightsByItemId[item._id] = Object.keys(item.permissions).reduce((rights, entity) => {
         Object.keys(item.permissions[entity]).forEach(action => {
           rights[ action + ' ' + entity ] = item.permissions[entity][action]
         })
         return rights
       }, {})

       return rightsByItemId
     }, {})
   )

  handleChangePermission = (category, entityId, restriction, value) => {
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
      isEditing: !this.state.isEditing
    })
  }

  render () {
    return (
      <div className='space-permissions-page'>

        <table className='permissions-table'>
          <PermissionsTableHead />
          <PermissionsTableBody
            isEditing={this.state.isEditing}
            items={this.props.groups}
            restictionsCategory={'groups'}
            restrictionsByItemsId={this.state.groups}
            handleChangePermission={this.handleChangePermission}
          />
        </table>

        {
          !this.state.isEditing
            ? <button onClick={this.toggleEditing}>
                edit
            </button>
            : <React.Fragment>
              <button onClick={this.handleSaveEditingClick}>
                Save
              </button>
              <button onClick={this.handleCancelEditingClick}>
                Cancel
              </button>
            </React.Fragment>
        }

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
  ]
}
