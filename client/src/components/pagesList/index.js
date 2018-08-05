import React from 'react'
import PropTypes from 'prop-types'

import './pagesList.css'

const PagesList = ({ pages }) => {
  return (
    <div>
      <div className='pages-list__title'>
        Pages
      </div>
      <div>
        {
          pages.map((page, i) => {
            return (
              <div key={i}>{page.name}</div>
            )
          })
        }
      </div>
    </div>
  )
}

PagesList.propTypes = {
  pages: PropTypes.array
}

PagesList.defaultProps = {
  pages: []
}

export default PagesList
