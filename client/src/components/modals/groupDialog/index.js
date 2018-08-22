import React, {Component} from 'react'
import Modal from 'src/components/common/modal'
import Input from 'src/components/common/input'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createGroupRequest } from '../../group/logic/groupsAction'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { translate } from 'react-i18next'

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
    const {t} = this.props
    return <h2 className='modal-header'>{t('Create group')}</h2>
  }

  renderContent = () => {
    const {t} = this.props
    return <table className='group'>
      <tbody>
        <tr>
          <td className='group-modal-label'><label htmlFor='name'>{t('Name')}<span>*</span></label></td>
          <td><Input label={t('Name')}
            value={this.state.name}
            onChange={({target}) => this.handleChange(target)}
            name='name'
            id='name'
          /></td>
        </tr>
        <tr>
          <td className='group-modal-label'><label htmlFor='description'>{t('Description')}</label></td>
          <td><Input label={t('Description')}
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
    this.setState({[target.name]: target.value})
  }

  createGroup = () => {
    const group = {
      members: [this.props.user._id],
      title: this.state.name,
      description: this.state.description
    }
    this.props.actions.createGroupRequest(group)
    this.props.cancelModal()
  }

  renderFooter = () => {
    const {t} = this.props
    const idDisabled = !this.state.name
    return <div className='modal-footer-group'>
      <button
        className='accept-button'
        onClick={this.createGroup}
        disabled={idDisabled}
      >{t('Create')}</button>
      <button onClick={this.props.cancelModal}>{t('Close')}</button>
    </div>
  }

  render () {
    return (
      <React.Fragment>
        <Modal renderHeader={this.renderHeader} renderContent={this.renderContent} renderFooter={this.renderFooter} />
      </React.Fragment>
    )
  }
}

GroupDialog.propTypes = {
  user: PropTypes.object,
  actions: PropTypes.func,
  cancelModal: PropTypes.func,
  t: PropTypes.func
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

export default translate('translations')(withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupDialog)))
