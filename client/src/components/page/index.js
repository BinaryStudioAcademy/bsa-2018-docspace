import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageTitle from 'src/components/common/pageTitle'
import PageInfo from 'src/components/common/pageInfo'
import PageContent from 'src/components/common/pageContent'
import { pageByIdFromRoute } from 'src/components/page/logic/pageReducer'
import { getPageByIdRequest } from 'src/components/page/logic/pageActions'
import { bindActionCreators } from 'redux'
import CommentsList from 'src/components/commentsList'
import { AddComment } from 'src/components/comments/addComment'

import * as commentsActions from './commentsLogic/commentsActions'

import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'

import fakeImg from 'src/resources/logo.svg'
import './page.css'

class Page extends Component {
  constructor (props) {
    super(props)
    this.addNewComment = this.addNewComment.bind(this)
  }
  componentDidMount () {
    this.props.actions.getPageByIdRequest(this.props.match.params.page_id)
  }

  addNewComment (obj) {
    this.props.addComment(obj, this.props.page)
  }

  deleteComment () {
    console.log('delete comment')
    // console.log(e)
  }

  render () {
    if (!this.props.page) return null
    const { firstName, lastName, _id } = this.props.user
    const {page, t} = this.props
    console.log(this.props.page.commentsArr)
    // const comments = this.props.comments!==[] ? this.props.comments : this.props.page.commentsArr
    return (
      <div className='page-container'>
        <PageTitle text={page.title} />
        <PageInfo
          avatar={fakeImg}
          firstName={firstName}
          lastName={lastName}
          date={page.created ? page.created.date : ''}
        />
        <PageContent content={page.content} />
        <CommentsList comments={this.props.page.commentsArr} deleteComment={this.props.deleteComment} />
        <AddComment
          firstName={firstName}
          lastName={lastName}
          addNewComment={this.addNewComment}
          userId={_id}
          t={t}
        />
      </div>
    )
  }
}

Page.propTypes = {
  page: PropTypes.shape({
    title: PropTypes.string,
    created: PropTypes.object,
    content: PropTypes.string,
    commentsArr: PropTypes.array
  }),

  user: PropTypes.object,
  t: PropTypes.func,
  actions: PropTypes.object,
  match: PropTypes.object,
  addComment: PropTypes.func,
  deleteComment: PropTypes.func
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
  console.log(state.comments)
  return {
    page: pageByIdFromRoute(state),
    user: state.verification.user,
    comments: state.comments
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(
      {
        getPageByIdRequest
      }
      , dispatch),
    addComment: bindActionCreators(commentsActions.addCommentRequest, dispatch),
    deleteComment: bindActionCreators(commentsActions.deleteCommentRequest, dispatch)

  }
}

export default translate('translations')(withRouter(connect(mapStateToProps, mapDispatchToProps)(Page)))
