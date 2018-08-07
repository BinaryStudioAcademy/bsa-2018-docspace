import React from 'react'
import PropTypes from 'prop-types'

import 'src/components/space/spacePagesList/spacePagesList.css'

const SpacePagesList = ({ pages }) => {
  return (
    <div className='pages-list'>
      <div className='pages-list-title'>
        Pages
      </div>
      <div>
        {
          pages.map((page, i) => {
            return (
              <div className='pages-list-item' key={i}>
                <div className='pages-list-item-icon'>•</div>
                <div className='pages-list-item-name'>{page.name}</div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

SpacePagesList.propTypes = {
  pages: PropTypes.array
}

SpacePagesList.defaultProps = {
  pages: []
}

export default SpacePagesList
