import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {getAlUsersRequest} from './logic/allUsersActions'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import './peopleBody.css'
import { MoonLoader } from 'react-spinners'

class PeopleBody extends Component {
  componentDidMount () {
    this.props.actions.getAlUsersRequest()
  }

  render () {
    const { isFetching, allUsers } = this.props
    const usersList = this.props.allUsers.map(user =>
      <tr className='people-item' key={user._id}>
        <td><NavLink to={`/users/${user.login}`}>{`${user.firstName} ${user.lastName}`}</NavLink></td>
        <td><NavLink to={`/users/${user.login}`}>{user.email}</NavLink></td>
        <td><NavLink to={`/users/${user.login}`}>{user.login}</NavLink></td>
      </tr>
    )
    return (
      <React.Fragment>
        { isFetching || !allUsers
          ? <div className='moon-loader-container'>
            <MoonLoader
              sizeUnit={'px'}
              size={32}
              color={'#123abc'}
            />
          </div>
          : <table>
            <thead>
              <tr>
                <th>Full name</th>
                <th>Email</th>
                <th>Login</th>
              </tr>
            </thead>
            <tbody>
              {usersList}
            </tbody>
          </table>
        }
      </React.Fragment>

    )
  }
}
const mapStateToProps = state => ({
  allUsers: state.allUsers.results,
  isFetching: state.allUsers.isFetching
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getAlUsersRequest }, dispatch)
})

PeopleBody.propTypes = {
  actions: PropTypes.object,
  allUsers: PropTypes.array,
  isFetching: PropTypes.bool
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleBody)
