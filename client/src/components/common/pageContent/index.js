import React from 'react'
import PropTypes from 'prop-types'

import 'src/components/common/pageContent/pageContent.css'

const PageContent = ({ content }) => {
  return (
    <div className='page-content'>{content}</div>
  )
}

PageContent.propTypes = {
  content: PropTypes.string
}

PageContent.defaultProps = {
  content: ''
}

export default PageContent
