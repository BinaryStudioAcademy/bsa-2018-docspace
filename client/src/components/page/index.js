import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import PageTitle from 'src/components/common/pageTitle'
import PageInfo from 'src/components/common/pageInfo'
import PageContent from 'src/components/common/pageContent'
import Comments from 'src/components/comments/comments'

import './page.css'

class Page extends Component {
  render () {
    return (
      <div className='page-container'>
        <div>
          <PageTitle text={this.props.page.title} />
          <PageInfo
            avatar={this.props.page.created.user.avatar}
            firstName={this.props.page.created.user.firstName}
            lastName={this.props.page.created.user.lastName}
            date={this.props.page.created.date}
          />
          <PageContent content={this.props.page.content} />
        </div>
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
  })
}

Page.defaultProps = {
  page: {
    title: '',
    created: {},
    content: ''
  }
}

const mapStateToProps = (state) => {
  return {
    page: state.pages.byId['5b6bf22eaf609328f4264ceb']
  }
}

export default connect(mapStateToProps)(Page)
