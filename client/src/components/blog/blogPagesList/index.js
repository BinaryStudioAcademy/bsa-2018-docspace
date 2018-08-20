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
  return (
    <div className='blog-pages-list'>
      <div>
        {
          pages.map((page) => {
            return (
              <NavLink
                className='blog-pages-list-item'
                activeClassName='current'
                key={page._id}
                to={`/spaces/${spaceId}/pages/${page._id}`}
                onClick={() => actions.getPageByIdRequest(page._id)}
              >
                <div className='blog-pages-list-item-icon'>•</div>
                <div className='blog-pages-list-item-name'>{page.title}</div>
              </NavLink>
            )
          })
        }
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
