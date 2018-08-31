import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './searchPageHeader.css'

export default class SearchPageHeader extends Component {
  render () {
    const { searchInputVaule, handleSearchInput, handleSearchInputFormSubmit } = this.props
    return (
      <div className='search-page-header'>
        <span className='search-page-header-text'>
           Search
        </span>

        <input
          type='text'
          defaultValue={searchInputVaule}
          placeholder='Serach Dockspace'
          onInput={({target}) => handleSearchInput(target)}
        />
        <button onClic={handleSearchInputFormSubmit}>
          <i className='fa fa-search' />
        </button>

      </div>
    )
  }
}

SearchPageHeader.propTypes = {
  searchInputVaule: PropTypes.func,
  handleSearchInput: PropTypes.func,
  handleSearchInputFormSubmit: PropTypes.func
}
