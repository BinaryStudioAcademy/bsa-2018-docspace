import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageTitle from 'src/components/common/pageTitle'
import PageInfo from 'src/components/common/pageInfo'
import PageContent from 'src/components/common/pageContent'
import { Comments } from 'src/components/comments/comments'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'

import './page.css'

import fakeImg from 'src/resources/logo.svg'

class Page extends Component {
  render () {
    const { avatar, firstName, lastName } = this.props.user
    const { page, t } = this.props
    return (
      <div className='page-container'>
        <div>
          <PageTitle text={page.title} />
          <PageInfo
            avatar={avatar}
            firstName={firstName}
            lastName={lastName}
            date={page.created.date}
          />
          <PageContent content={page.content} />
        </div>
        <Comments t={t} />
      </div>
    )
  }
}
Page.propTypes = {
  page: PropTypes.shape({
    title: PropTypes.string,
    created: PropTypes.object,
    content: PropTypes.string
  }),

  user: PropTypes.object,
  t: PropTypes.func
}

Page.defaultProps = {
  page: {
    title: '',
    created: {
      date: 'it is a date! TRUST ME'
    },
    content: ''
  },

  user: {
    avatar: fakeImg,
    firstName: 'Fake',
    lastName: 'User'
  }
}

const mapStateToProps = (state) => {
  return {
    page: state.pages.byId[state.router.location.pathname.split('/')[2]]
  }
}

export default translate('translations')(withRouter(connect(mapStateToProps)(Page)))
