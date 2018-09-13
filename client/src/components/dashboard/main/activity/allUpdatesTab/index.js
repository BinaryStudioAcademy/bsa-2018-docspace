import React from 'react'
import PropTypes from 'prop-types'
import getRightProps from '../chooseContentHelper'
import ContentCard from '../contentCard'
import { MoonLoader } from 'react-spinners'

const AllUpdatesTab = (props) => (
  <div className='update-items-list'>
    {props.isFetching
      ? <div className='moon-loader-container'>
        <MoonLoader
          sizeUnit={'px'}
          size={32}
          color={'#123abc'}
        />
      </div>
      : <div className='update-items'>
        {props.allUpdates.map((item, index) => {
          let content = getRightProps(item)
          return !!content && <ContentCard key={index} showUser content={content} />
        }
        )}
      </div>}
  </div>
)

AllUpdatesTab.propTypes = {
  allUpdates: PropTypes.array.isRequired,
  isFetching: PropTypes.func
}

export default AllUpdatesTab
