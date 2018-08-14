import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PageTitle from 'src/components/common/pageTitle'
import PageInfo from 'src/components/common/pageInfo'
import PageContent from 'src/components/common/pageContent'
import Comments from 'src/components/comments/comments'
import { getPageByIdRequest } from 'src/components/page/logic/pageActions'
import { pageByIdFromRoute } from 'src/components/page/logic/pageReducer'

import fakeImg from 'src/resources/logo.svg'
import './page.css'

class Page extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pageToFetch: null
    }
    this.firstMount = true
  }

  componentWillReceiveProps (nextProps) {
    const page = nextProps.page
    if (this.firstMount) {
      this.firstMount = false
      return
    }
    if (!page) {
      this.props.actions.getPageByIdRequest(nextProps.match.params.page_id)
    }
  }

  componentDidMount () {
    const id = this.props.match.params.page_id
    if (!this.props.page) {
      this.props.actions.getPageByIdRequest(id)
    }
  }

  render () {
    if (!this.props.page) return null
    const { avatar, firstName, lastName } = this.props.user
    const { page } = this.props
    return (
      <div className='page-container'>
        <PageTitle text={page.title} />
        <PageInfo
          avatar={avatar}
          firstName={firstName}
          lastName={lastName}
          date={page.created ? page.created.date : ''}
        />
        <PageContent content={page.content} />
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

  user: PropTypes.object,
  match: PropTypes.object,
  actions: PropTypes.object
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
    page: pageByIdFromRoute(state)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(
      {
        getPageByIdRequest
      }
      , dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)
