import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, withRouter } from 'react-router-dom'
import { translate } from 'react-i18next'
import { getPageByIdRequest } from 'src/components/page/logic/pageActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './spacePagesList.css'

const SpacePagesList = (props) => {
  const { pages, spaceId, t, actions } = props
  return (
    <div className='pages-list'>
      <div className='pages-list-title'>
        {t('pages')}
      </div>
      <div>
        {
          pages.map((page) => {
            return (
              <NavLink
                className='pages-list-item'
                activeClassName='current'
                key={page._id}
                to={`/spaces/${spaceId}/pages/${page._id}`}
                onClick={() => actions.getPageByIdRequest(page._id)}
              >
                <div className='pages-list-item-icon'>•</div>
                <div className='pages-list-item-name'>{page.title}</div>
              </NavLink>
            )
          })
        }
      </div>
    </div>
  )
}

SpacePagesList.propTypes = {
  t: PropTypes.func.isRequired,
  actions: PropTypes.object,
  pages: PropTypes.array,
  spaceId: PropTypes.string
}

SpacePagesList.defaultProps = {
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

export default translate('translations')(withRouter(connect(null, mapDispatchToProps)(SpacePagesList)))
