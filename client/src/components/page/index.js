import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import PageTitle from 'src/components/common/pageTitle'
import PageInfo from 'src/components/common/pageInfo'
import PageContent from 'src/components/common/pageContent'
import LikesAndLabelsContainer from 'src/components/common/likesAndLabelsContainer'
import Comments from 'src/components/common/comments'

import './page.css'

import fakeImg from 'src/resources/logo.svg'

class Page extends Component {
  render () {
    return (
      <div className='page-container'>
        <div>
          <PageTitle text={this.props.page.title} />
          <PageInfo
            avatar={this.props.user.avatar}
            firstName={this.props.user.firstName}
            lastName={this.props.user.lastName}
            date={this.props.page.created.date}
          />
          <PageContent content={this.props.page.content} />
        </div>
        <LikesAndLabelsContainer />
        <Comments />
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

  user: PropTypes.object
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

export default connect(mapStateToProps)(Page)
