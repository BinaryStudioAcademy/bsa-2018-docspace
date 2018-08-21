import React, {Component} from 'react'
import Modal from 'src/components/common/modal'
import Input from 'src/components/common/input'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createGroupRequest } from './logic/groupsAction'
import PropTypes from 'prop-types'

import './groupModal.css'

class GroupDialog extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      description: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.createGroup = this.createGroup.bind(this)
  }
  renderHeader = () => {
    return <h2 className='modal-header'>Create group</h2>
  }

  renderContent = () => {
    return <table className='group'>
      <tbody>
        <tr>
          <td className='group-modal-label'><label htmlFor='name'>Name<span>*</span></label></td>
          <td><Input label='Name'
            value={this.state.name}
            onChange={({target}) => this.handleChange(target)}
            name='name'
            id='name'
          /></td>
        </tr>
        <tr>
          <td className='group-modal-label'><label htmlFor='description'>Description</label></td>
          <td><Input label='Description'
            value={this.state.description}
            onChange={({target}) => this.handleChange(target)}
            name='description'
            id='description'
          /></td>
        </tr>
      </tbody>
    </table>
  }

  handleChange = (target) => {
    console.log('AAAAAAA')
    this.setState({[target.name]: target.value})
  }

  createGroup = () => {
    const group = {
      members: [this.props.user._id],
      title: this.state.name,
      description: this.state.description
    }
    console.log(group)
    console.log(this)
    this.props.actions.createGroupRequest(group)
  }

  renderFooter = () => {
    const idDisabled = !this.state.name
    return <div className='modal-footer group'>
      <button
        className='accept-button'
        onClick={this.createGroup}
        disabled={idDisabled}
      >Create</button>
      <button>Close</button>
    </div>
  }

  render () {
    console.log(this.state)
    return (
      <React.Fragment>
        <Modal renderHeader={this.renderHeader} renderContent={this.renderContent} renderFooter={this.renderFooter} />
      </React.Fragment>
    )
  }
}

GroupDialog.propTypes = {
  user: PropTypes.object,
  actions: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    groups: state.groups,
    user: state.verification.user
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(
      {
        createGroupRequest
      }
      , dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupDialog)
