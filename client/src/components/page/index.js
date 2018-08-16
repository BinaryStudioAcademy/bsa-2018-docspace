import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageHeader from './pageHeader'
import PageTitle from 'src/components/common/pageTitle'
import PageInfo from 'src/components/common/pageInfo'
import PageContent from 'src/components/common/pageContent'
import Comments from 'src/components/comments/comments'
import { pageByIdFromRoute } from 'src/components/page/logic/pageReducer'
import { spaceById } from 'src/components/space/spaceContainer/logic/spaceReducer'
import { getPageByIdRequest } from 'src/components/page/logic/pageActions'
import { bindActionCreators } from 'redux'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'

import fakeImg from 'src/resources/logo.svg'
import './page.css'

class Page extends Component {
  componentDidMount () {
    this.props.actions.getPageByIdRequest(this.props.match.params.page_id)
  }

  handleEditPageClick = () => {
    const {space, page} = this.props
    this.props.history.push(`/spaces/${space._id}/pages/${page._id}/edit`)
  }

  render () {
    if (!this.props.page) return null
    const { avatar, firstName, lastName } = this.props.user
    const { page, t, space } = this.props
    return (
      <React.Fragment>
        <PageHeader space={space} t={t} handleEditPageClick={this.handleEditPageClick} />
        <div className='page-container'>
          <PageTitle text={page.title} />
          <PageInfo
            avatar={avatar}
            firstName={firstName}
            lastName={lastName}
            date={page.created ? page.created.date : ''}
          />
          <PageContent content={page.content} />
          <Comments t={t} />
        </div>
      </React.Fragment>
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
  t: PropTypes.func,
  actions: PropTypes.object,
  match: PropTypes.object,
  space: PropTypes.object,
  history: PropTypes.object
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
    page: pageByIdFromRoute(state),
    space: spaceById(state)
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

export default translate('translations')(withRouter(connect(mapStateToProps, mapDispatchToProps)(Page)))
