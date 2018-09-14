import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createGroupRequest, getAllUserGroupsRequest, deleteGroupRequest } from './logic/groupsAction'
import Button from 'src/components/common/button'
import Input from 'src/components/common/input'
import { NavLink, withRouter } from 'react-router-dom'
import GroupDialog from 'src/components/modals/groupDialog'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { cleanMatchingUser } from 'src/components/modals/groupDialog/logic/matchingUserActions'
import { MoonLoader } from 'react-spinners'

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

  deleteGroup = (group) => {
    this.props.actions.deleteGroupRequest(group)
  }

  renderTable = () => {
    // const { match } = this.props
    const groups = this.state.filterField ? this.props.groups.filter(group => {
      const nameSearch = new RegExp(this.state.filterField)
      return group.title.search(nameSearch) + 1
    })
      : this.props.groups

    const table = groups.map((group, i) =>
      <tr key={i}>
        <td><NavLink to={`/group/${group._id}`}>{group.title}</NavLink></td>
        <td />
        <td>{group.description}</td>
        <td><button className='group-delete' onClick={() => this.deleteGroup(group)}><i className='fas fa-times' /></button></td>
      </tr>
    )
    return table
  }

  openModal = () => {
    this.setState({modalIsOpened: true})
  }

  closeModal = () => {
    this.setState({modalIsOpened: false})
    this.props.actions.cleanMatchingUser()
  }

  handleChange (target) {
    this.setState({filterField: target.value})
  }

  render () {
    const { t, isFetching, groups } = this.props
    return (
      <div className='group-container'>
        {this.state.modalIsOpened && <GroupDialog cancelModal={this.closeModal} />}
        <div className='group-header'>
          <h1>{t('groups')}</h1>
          <Button value={t('create group')} nameClass='groups-button' onClick={this.openModal} />
        </div>
        <div className='group-filter-container'>
          <Input label={t('group_name_contains')}
            onChange={({target}) => this.handleChange(target)}
            value={this.state.filterField}
            inputType='text'
          />
        </div>
        {isFetching || !groups
          ? <div className='moon-loader-container'>
            <MoonLoader
              sizeUnit={'px'}
              size={32}
              color={'#123abc'}
            />
          </div>
          : <div className='group-body-container'>
            <table>
              <thead>
                <tr>
                  <th className='name'>{t('name')}</th>
                  <th className='tags' />
                  <th className='description'>{t('description')}</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {this.renderTable()}
              </tbody>
            </table>
          </div>
        }
      </div>
    )
  }
}

Group.propTypes = {
  user: PropTypes.object,
  actions: PropTypes.object,
  groups: PropTypes.array,
  t: PropTypes.func,
  isFetching: PropTypes.bool

}

const mapStateToProps = (state) => {
  return {
    groups: state.groups.results,
    user: state.verification.user,
    isFetching: state.groups.isFetching
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(
      {
        createGroupRequest,
        getAllUserGroupsRequest,
        deleteGroupRequest,
        cleanMatchingUser
      }
      , dispatch)
  }
}

export default translate('translations')(withRouter(connect(mapStateToProps, mapDispatchToProps)(Group)))
