import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, withRouter } from 'react-router-dom'
import { translate } from 'react-i18next'
import { getPageByIdRequest } from 'src/components/page/logic/pageActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './blogPagesList.css'

const BlogPagesList = (props) => {
  const { pages, spaceId, actions } = props

  let pagesList = []
  const years = {}

  pages.sort((page1, page2) => new Date(page2.createdAt) - new Date(page1.createdAt))
    .forEach(page => {
      let year = (new Date(page.createdAt)).getFullYear()
      if (!years[year]) {
        years[year] = true
        pagesList.push(
          <div className='blog-pages-list-year' key={year}> {year} </div>
        )
      }
      pagesList.push(
        <NavLink
          className='blog-pages-list-item'
          activeClassName='current'
          key={page._id}
          to={`/spaces/${spaceId}/blog/${page._id}`}
          onClick={() => actions.getPageByIdRequest(page._id)}
        >
          <div className='blog-pages-list-item-name'>{page.title}</div>
        </NavLink>
      )
    })

  return (
    <div className='blog-pages-list'>
      <div>
        { pagesList }
      </div>
    </div>
  )
}

BlogPagesList.propTypes = {
  actions: PropTypes.object,
  pages: PropTypes.array,
  spaceId: PropTypes.string
}

BlogPagesList.defaultProps = {
  pages: [],
  spaceId: ''
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

export default translate('translations')(withRouter(connect(null, mapDispatchToProps)(BlogPagesList)))
