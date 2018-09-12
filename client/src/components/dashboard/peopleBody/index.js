import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {getAlUsersRequest} from './logic/allUsersActions'
import PropTypes from 'prop-types'
import { NavLink, withRouter } from 'react-router-dom'
import { translate } from 'react-i18next'
import './peopleBody.css'
import { MoonLoader } from 'react-spinners'

class PeopleBody extends Component {
  componentDidMount () {
    this.props.actions.getAlUsersRequest()
  }

  render () {
    const {t, isFetching, allUsers} = this.props
    const usersList = this.props.allUsers.map(user =>
      <tr key={user._id}>
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
            <tbody>
              <tr>
                <th>{t('full_name')}</th>
                <th>{t('email')}</th>
                <th>{t('login')}</th>
              </tr>
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
  t: PropTypes.func,
  isFetching: PropTypes.bool
}

export default translate('translations')(withRouter(connect(mapStateToProps, mapDispatchToProps)(PeopleBody)))
