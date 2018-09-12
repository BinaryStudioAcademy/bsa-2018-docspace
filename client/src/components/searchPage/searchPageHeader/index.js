import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import './searchPageHeader.css'

class SearchPageHeader extends Component {
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
          ref={(input) => { this.searchInput = input }}
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

export default translate('translations')(SearchPageHeader)
