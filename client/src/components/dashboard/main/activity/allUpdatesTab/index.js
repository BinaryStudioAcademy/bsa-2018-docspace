import React from 'react'
import PropTypes from 'prop-types'
import getRightProps from '../chooseContentHelper'
import ContentCard from '../contentCard'

const AllUpdatesTab = (props) => (
  <div className='update-items-list'>
    <div className='update-items'>
      {props.allUpdates.map((item, index) => {
        let content = getRightProps(item)
        if (content) {
          return <ContentCard key={index} showUser content={content} />
        }
        return null
      }
      )}
    </div>
  </div>
)

AllUpdatesTab.propTypes = {
  allUpdates: PropTypes.array.isRequired
}

export default AllUpdatesTab
