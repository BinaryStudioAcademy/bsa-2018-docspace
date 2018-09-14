import React from 'react'
import PropTypes from 'prop-types'

import './selectTargetToSearchList.css'

const SelectTargetToSearchList = ({searchTargetsNames, handleSelect, activeName}) => {
  return (
    <ul className='select-target-to-search-list'>
      {
        searchTargetsNames.map((name, index) => (
          <li
            key={index}
            className={name === activeName ? 'active' : ''}
            onClick={() => handleSelect(name)}
          >
            {name}
          </li>
        ))
      }
    </ul>
  )
}

SelectTargetToSearchList.propTypes = {
  searchTargetsNames: PropTypes.arrayOf(PropTypes.string),
  handleSelect: PropTypes.func,
  activeName: PropTypes.string
}

export default SelectTargetToSearchList
