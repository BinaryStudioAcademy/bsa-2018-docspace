import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { translate } from 'react-i18next'
import { searchRequest } from './logic/searchActions'
import SearchPageHeader from './searchPageHeader'
// import SearchCongigDashboard from './searchConfigDashboard'
import MatchedContent from './matchedContent'

import './searchPage.css'

class SearchPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      input: this.props.searchInputValue,
      spaceFilter: null,
      userFilter: null,
      dateOfChangeFilter: null,
      contentTypeFilter: null
    }
  }

  componentDidMount () {
    this.props.actions.searchRequest({
      entityToSearch: 'page',
      input: this.state.input
    })

    console.log(this.props)
  }

  handleSearchSubmit = () => {

  }

  handleSearchInput = (input) => {
    this.setState({
      input: input.value
    })
  }

  render () {
    console.log('RENDER')
    console.log(JSON.stringify(this.props.items))
    return (
      <div className='search-page'>
        <SearchPageHeader
          searchInputValue={this.state.searchInputValue}
          handleSearchInput={this.handleSearchInput}
        />
        <div className='search-page-body-wrp'>
          {/* <SearchCongigDashboard /> */}
          <MatchedContent
            items={this.props.items}
          />
        </div>
      </div>
    )
  }
}

SearchPage.defaultProps = {
  searchInputValue: 'Adfsdfsdf'
}

SearchPage.propTypes = {
  searchInputValue: PropTypes.string,
  actions: PropTypes.object,
  items: PropTypes.array
}

const mapStateToProps = (state) => {
  return {
    items: state.search.items
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(
      {
        searchRequest
      }
      , dispatch)
  }
}

export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(SearchPage))
