import React from 'react'
import PropTypes from 'prop-types'

import './pageContent.css'

const PageContent = ({ content }) => {
  return (
    <div className='page-content' dangerouslySetInnerHTML={{ __html: content }} />
  )
}

PageContent.propTypes = {
  content: PropTypes.string
}

PageContent.defaultProps = {
  content: ''
}

export default PageContent
