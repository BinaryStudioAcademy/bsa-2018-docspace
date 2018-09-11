import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {getAlUsersRequest} from './logic/allUsersActions'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import './peopleBody.css'

class PeopleBody extends Component {
  componentDidMount () {
    this.props.actions.getAlUsersRequest()
  }

  render () {
    const usersList = this.props.allUsers.map(user =>
      <tr key={user._id}>
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
              <th>Full name</th>
              <th>Email</th>
              <th>Login</th>
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
  allUsers: PropTypes.array
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleBody)
