import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {getAlUsersRequest} from './logic/allUsersActions'
import PropTypes from 'prop-types'
import { NavLink, withRouter } from 'react-router-dom'
import { translate } from 'react-i18next'
import './peopleBody.css'

class PeopleBody extends Component {
  componentDidMount () {
    this.props.actions.getAlUsersRequest()
  }

  render () {
    const {t} = this.props
    const usersList = this.props.allUsers.map(user =>
      <tr>
        <td><NavLink to={`/users/${user.login}`}>{`${user.firstName} ${user.lastName}`}</NavLink></td>
        <td><NavLink to={`/users/${user.login}`}>{user.email}</NavLink></td>
        <td><NavLink to={`/users/${user.login}`}>{user.login}</NavLink></td>
      </tr>
    )
    return (
      <React.Fragment>
        <table>
          <tbody>
            <tr>
              <th>{t('full_name')}</th>
              <th>{t('email')}</th>
              <th>{t('login')}</th>
            </tr>
            {usersList}
          </tbody>
        </table>
      </React.Fragment>

    )
  }
}
const mapStateToProps = state => ({
  allUsers: state.allUsers
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getAlUsersRequest }, dispatch)
})

PeopleBody.propTypes = {
  actions: PropTypes.object,
  allUsers: PropTypes.array,
  t: PropTypes.func
}

export default translate('translations')(withRouter(connect(mapStateToProps, mapDispatchToProps)(PeopleBody)))
