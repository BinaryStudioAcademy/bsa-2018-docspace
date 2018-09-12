import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { translate } from 'react-i18next'
import { advancedSearchRequest } from 'src/commonLogic/search/searchActions'
import { advancedSearchResults } from 'src/commonLogic/search/selectors'
import SearchPageHeader from './searchPageHeader'
import SearchCongigDashboard from './searchConfigDashboard'
import MatchedContent from './matchedContent'

import './searchPage.css'

class SearchPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      input: this.props.searchInputValue,
      spaceIdFilter: null,
      userIdFilter: null,
      updatedAtFilter: null,
      targetToSearch: 'all'
    }
    this.header = React.createRef()
  }

  handleSearchInput = (input) => {
    this.setState({
      input: input.value
    })
  }

  componentWillReceiveProps (nextProps) {
    // Pass value from search page
    if (nextProps.searchInputValue && !this.header.current.searchInput.current.value) {
      this.header.current.searchInput.current.value = nextProps.searchInputValue
    }
  }

  handleSetFilter = (filterName, filterValue, shouldSearch) => {
    // after we get filter, then we must search.
    this.setState({
      [filterName]: filterValue
    }, () => shouldSearch ? this.handleSearchSubmit() : false)
  }

  handleSearchSubmit = () => {
    this.props.actions.advancedSearchRequest({
      ...this.state,
      targetToSearch: this.state.targetToSearch + '_advanced'
    }, true)
  }

  render () {
    return (
      <div className='search-page'>
        <SearchPageHeader
          ref={this.header}
          searchInputValue={this.state.searchInputValue}
          handleSearchInput={this.handleSearchInput}
          handleSearchInputFormSubmit={this.handleSearchSubmit}
          t={this.props.t}
        />
        <div className='search-page-body-wrp'>
          <SearchCongigDashboard
            setFilter={this.handleSetFilter}
            targetToSearch={this.state.targetToSearch}
          />
          <MatchedContent
            searchResults={this.props.searchResults}
            isAdvancedSearching={this.props.isAdvancedSearching}
          />
        </div>
      </div>
    )
  }
}

SearchPage.defaultProps = {
  searchInputValue: '',
  contentTypeFilter: 'all'
}

SearchPage.propTypes = {
  searchInputValue: PropTypes.string,
  actions: PropTypes.object,
  searchResults: PropTypes.object,
  isAdvancedSearching: PropTypes.bool,
  t: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    searchResults: advancedSearchResults(state),
    isAdvancedSearching: state.search.isAdvancedSearching,
    searchInputValue: state.search.searchString
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(
      {
        advancedSearchRequest
      }
      , dispatch)
  }
}

export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(SearchPage))
