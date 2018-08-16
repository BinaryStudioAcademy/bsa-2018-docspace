import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPageByIdRequest } from 'src/components/page/logic/pageActions'
import SpaceOverviewHeader from './spaceOverviewHeader'

import PageContent from 'src/components/common/pageContent'

class SpaceOverview extends Component {
  render () {
    const {homePage, space} = this.props
    return (
      <React.Fragment>
        <SpaceOverviewHeader space={space} />
        {
          homePage &&
          <div className='page-container'>
            <PageContent content={homePage.content} />
          </div>
        }
      </React.Fragment>
    )
  }
}
SpaceOverview.propTypes = {
  homePage: PropTypes.shape({
    title: PropTypes.string,
    created: PropTypes.object,
    content: PropTypes.string
  }),
  space: PropTypes.object
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

export default connect(null, mapDispatchToProps)(SpaceOverview)
