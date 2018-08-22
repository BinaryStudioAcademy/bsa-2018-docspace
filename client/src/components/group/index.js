import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createGroupRequest, getAllUserGroupsRequest } from './logic/groupsAction'
import Button from 'src/components/common/button'
import Input from 'src/components/common/input'
import { NavLink, withRouter } from 'react-router-dom'
import GroupDialog from 'src/components/modals/groupDialog'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import './groups.css'

class Group extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalIsOpened: false,
      filterField: ''
    }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    this.props.actions.getAllUserGroupsRequest(this.props.user._id)
  }

  renderTable = () => {
    const groups = this.state.filterField ? this.props.groups.filter(group => {
      const nameSearch = new RegExp(this.state.filterField)
      return group.title.search(nameSearch) + 1
    })
      : this.props.groups

    const table = groups.map(group =>
      <tr>
        <td><NavLink to='#'>{group.title}</NavLink></td>
        <td />
        <td>{group.description}</td>
      </tr>
    )
    return table
  }

  openModal = () => {
    this.setState({modalIsOpened: true})
  }

  closeModal = () => {
    this.setState({modalIsOpened: false})
  }

  handleChange (target) {
    this.setState({filterField: target.value})
  }

  render () {
    const { t } = this.props
    console.log(this.props)
    return (
      <div className='group-container'>
        {this.state.modalIsOpened && <GroupDialog cancelModal={this.closeModal} />}
        <div className='group-header'>
          <h1>{t('Groups')}</h1>
          <Button value={t('Create group')} nameClass='groups-button' onClick={this.openModal} />
        </div>
        <div className='group-filter-container'>
          <Input label={t('Group name contains')}
            onChange={({target}) => this.handleChange(target)}
            value={this.state.filterField}
          />
        </div>
        <div className='group-body-container'>
          <table>
            <thead>
              <tr>
                <th className='name'>{t('Name')}</th>
                <th className='tags' />
                <th className='description'>{t('Description')}</th>
              </tr>
            </thead>
            <tbody>
              {this.renderTable()}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

Group.propTypes = {
  user: PropTypes.object,
  actions: PropTypes.obj,
  groups: PropTypes.array,
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
        createGroupRequest,
        getAllUserGroupsRequest
      }
      , dispatch)
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(Group)
export default translate('translations')(withRouter(connect(mapStateToProps, mapDispatchToProps)(Group)))
