import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPageByIdRequest } from 'src/components/page/logic/pageActions'
import { deleteSpaceRequest } from 'src/components/space/spaceContainer/logic/spaceActions'
import SpaceOverviewHeader from './spaceOverviewHeader'

import PageContent from 'src/components/common/pageContent'

class SpaceOverview extends Component {
  handleEditBtnClick = () => {
    const { space, history } = this.props
    history.push(`/spaces/${space._id}/pages/${space.homePage._id}/edit`)
  }

  handleDeleteSpace = () => {
    this.props.actions.deleteSpaceRequest(this.props.space._id)
  }

  render () {
    const {homePage, space} = this.props
    return (
      <React.Fragment>
        <SpaceOverviewHeader 
          space={space} 
          handleEditBtnClick={this.handleEditBtnClick} 
          handleDeleteSpace={this.handleDeleteSpace}
        />
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
  space: PropTypes.object,
  history: PropTypes.object
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(
      {
        getPageByIdRequest, deleteSpaceRequest
      }
      , dispatch)
  }
}

export default connect(null, mapDispatchToProps)(SpaceOverview)
