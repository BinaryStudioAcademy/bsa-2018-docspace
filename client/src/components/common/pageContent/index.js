import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

import './pageContent.css'

class PageContent extends PureComponent {
  render () {
    const { content } = this.props
    return <div className='page-content' dangerouslySetInnerHTML={{ __html: content }} />
  }
}
// const PageContent = ({ content }) => {
//   return (
//     <div className='page-content' dangerouslySetInnerHTML={{ __html: content }} />
//   )
// }

PageContent.propTypes = {
  content: PropTypes.string
}

PageContent.defaultProps = {
  content: ''
}

export default PageContent
