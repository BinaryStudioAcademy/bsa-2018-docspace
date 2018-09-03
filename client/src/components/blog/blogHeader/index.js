import React from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'

import './blogHeader.css'

const BlogHeader = ({ t }) => (
  <div className='blog-header'>
    <div className='blog-header-title'> { t('blog') } </div>
  </div>
)

BlogHeader.propTypes = {
  t: PropTypes.func.isRequired
}

export default translate('translations')(BlogHeader)
