import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPageByIdRequest } from 'src/components/page/logic/pageActions'

import PageContent from 'src/components/common/pageContent'

class SpaceOverview extends Component {
  render () {
    const homePage = this.props.homePage
    if (!homePage) return null
    return (
      <div className='page-container'>
        <PageContent content={homePage.content} />
      </div>
    )
  }
}
SpaceOverview.propTypes = {
  homePage: PropTypes.shape({
    title: PropTypes.string,
    created: PropTypes.object,
    content: PropTypes.string
  })
}

// SpaceOverview.defaultProps = {
//   page: {
//     title: '',
//     created: {
//       date: 'it is a date! TRUST ME'
//     },
//     content: ''
//   },

//   user: {
//     avatar: fakeImg,
//     firstName: 'Fake',
//     lastName: 'User'
//   }
// }

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
