import React, {Component, Fragment} from 'react'
import PinguinImg from 'src/resources/icons/error404_3.png'
import { NavLink, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { bindActionCreators } from 'redux'
import { redirectToHelpfulLink } from 'src/components/common/app/logic/errorActions'

import './page404.css'
class Page404 extends Component {
  handleError = () => {
    this.props.actions.redirectToHelpfulLink()
  }
  render () {
    const { response, t } = this.props
    return (
      <Fragment>
        <div className='page404-main-wrapper'>
          <div className='page404-part-label'>
            <div className='page404-header-oops'>
              {t('ooops')}
            </div>
            <div className='page404-label-error'>
              {t('we_cant_seem')}
            </div>
            <div className='page404-helpful-links'>
              <p>{t('some_helpful_links')}</p>
              <ul>
                <li className='page404-helpful-link'>
                  <NavLink onClick={this.handleError} to={`/activity/allupdates`}>{t('activity')}</NavLink>
                </li>
                <li className='page404-helpful-link'>
                  <NavLink onClick={this.handleError} to={`/spacedirectory`}>{t('spaces')}</NavLink>
                </li>
                <li className='page404-helpful-link'>
                  <NavLink onClick={this.handleError} to={`/users/${response.user.login}`}>{t('home_page')}</NavLink>
                </li>
              </ul>
            </div>
          </div>
          <img className='page404-img' src={PinguinImg} alt='pinguin-error-404' />
        </div>
      </Fragment>
    )
  }
}

Page404.propTypes = {
  actions: PropTypes.object.isRequired,
  response: PropTypes.object,
  t: PropTypes.func
}
const mapStateToProps = (state) => {
  return {
    response: state.user.userReducer.messages.length
      ? state.user.userReducer
      : state.verification
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ redirectToHelpfulLink }, dispatch)
  }
}
export default translate('translations')(withRouter(connect(mapStateToProps, mapDispatchToProps)(Page404)))
