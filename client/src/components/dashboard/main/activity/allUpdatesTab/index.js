import React from 'react'
import PropTypes from 'prop-types'
import getRightProps from '../chooseContentHelper'
import ContentCard from '../contentCard'

const AllUpdatesTab = (props) => (
  <div className='update-items-list'>
    <div className='update-items'>
      {props.allUpdates.map((item, index) => {
        let content = getRightProps(item)
        return !!content && <ContentCard key={index} showUser content={content} />
      }
      )}
    </div>
  </div>
)

AllUpdatesTab.propTypes = {
  allUpdates: PropTypes.array.isRequired
}

export default AllUpdatesTab
