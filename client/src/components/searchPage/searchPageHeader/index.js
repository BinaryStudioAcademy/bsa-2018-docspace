import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './searchPageHeader.css'

class SearchPageHeader extends Component {
  constructor (props) {
    super(props)
    this.searchInput = React.createRef()
  }
  render () {
    const { searchInputVaule, handleSearchInput, handleSearchInputFormSubmit, t } = this.props
    return (
      <div className='search-page-header'>
        <span className='search-page-header-text'>
          {t('search')}
        </span>

        <input
          type='text'
          defaultValue={searchInputVaule}
          placeholder={t('search_docspace')}
          onInput={({target}) => handleSearchInput(target)}
          ref={this.searchInput}
        />

        <button onClick={handleSearchInputFormSubmit}>
          <i className='fa fa-search' />
        </button>

      </div>
    )
  }
}

SearchPageHeader.propTypes = {
  searchInputVaule: PropTypes.func,
  handleSearchInput: PropTypes.func,
  handleSearchInputFormSubmit: PropTypes.func,
  t: PropTypes.func
}

export default SearchPageHeader
