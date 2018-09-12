import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SearchInputWithDropdownList from './searchInputWithDropdownList'
import SelectTargetToSearchList from './selectTargetToSearchList'
import { searchRequest, cleanSearchResults } from 'src/commonLogic/search/searchActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { translate } from 'react-i18next'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import './searchConfigDashboard.css'

class SearchConfigDashboard extends Component {
  constructor (props) {
    super(props)
    this.targetsToSearch = [ 'all', 'pages', 'spaces', 'blogs' ]
    this.state = {
      from: null,
      to: null
    }
  }

  handleSelectDate = () => {
    if (this.state.to && this.state.from) {
      this.props.setFilter('updatedAtFilter', {
        from: this.state.from._d.toISOString(),
        to: this.state.to._d.toISOString()
      }, true)
    } else {
      this.props.setFilter('updatedAtFilter', null)
    }
  }

  handleFromChange = (date) => {
    if (date && !date._isValid) {
      date = null
    }

    this.setState({
      from: date
    }, this.handleSelectDate)
  }

  handleToChange = (date) => {
    if (date && !date._isValid) {
      date = null
    }
    this.setState({
      to: date
    }, this.handleSelectDate)
  }

  handleSetTargetToSearchFilter (targetName) {
    this.props.setFilter('targetToSearch', targetName, true)
  }

  searchSpaceByName = (spaceName) => {
    this.props.actions.searchRequest({ input: spaceName, targetToSearch: 'spaces_by_name' })
  }

  searchUserByLogin = (login) => {
    this.props.actions.searchRequest({ input: login, targetToSearch: 'users by login part' })
  }

  setSpaceFilter = (value, searchImmidiatly) => {
    this.props.setFilter('spaceIdFilter', value, searchImmidiatly)
  }

  setUserFilter = (value, searchImmidiatly) => {
    this.props.setFilter('userIdFilter', value, searchImmidiatly)
  }

  // for the feature: mabe play with input value. Когда юзер ввел точное соответсвие, поставить фильтр
  inputUserHook = (inputRef) => this.setUserFilter(null, false)

  inputSpaceHook = (inputRef) => this.setSpaceFilter(null, false)

  renderSpaceLiContent = (space) => {
    return (
      <div className='space-li-node'>
        <div className='space-edit-avatar-small' style={{backgroundColor: space.spaceSettings.color}}>
          <i className={`fa fa-${space.spaceSettings.icon}`} />
        </div>
        <span className='space-name'> {space.name} </span>
      </div>
    )
  }

 renderUserLiContent = (user) => {
   return (
     <div className='user-li-node'>
       <img src={user.avatar} alt='' />
       <span className='user-login'>{ user.login }</span>
     </div>
   )
 }

 render () {
   const {t} = this.props
   return (
     <div className='search-config-dashboard' >
       <p className='config-label member-filter'> {t('member_uppercase')}</p>
       <SearchInputWithDropdownList
         searchPlaceholder={this.props.t('user_login')}
         handleSearchEntities={this.searchUserByLogin}
         searchedEntities={this.props.searchedEntities}
         handleSelectEntity={(user) => this.setUserFilter(user._id, true)}
         renderSearchedEntityLiContent={this.renderUserLiContent}
         getEntityName={(user) => user.login}
         additionalHookForInputHandler={this.inputUserHook}
         actions={this.props.actions}
         isSearching={this.props.isSearching}
       />
       <hr className='config-separator' />
       <p className='config-label space-filter'> {t('in_space_uppercase')} </p>

       <SearchInputWithDropdownList
         handleSearchEntities={this.searchSpaceByName}
         searchedEntities={this.props.searchedEntities}
         handleSelectEntity={(space) => this.setSpaceFilter(space._id, true)}
         renderSearchedEntityLiContent={this.renderSpaceLiContent}
         searchPlaceholder={this.props.t('space_name')}
         additionalHookForInputHandler={this.inputSpaceHook}
         getEntityName={(space) => space.name}
         actions={this.props.actions}
         isSearching={this.props.isSearching}
       />

       <hr className='config-separator' />
       <p className='config-label date-filter'> {t('date_of_change_uppercase')} </p>
       <DatePicker
         placeholderText='from'
         selected={this.state.from}
         selectsStart
         startDate={this.state.from}
         endDate={this.state.to}
         onChange={this.handleFromChange}
       />
       <p className='date-separator'> –</p>
       <DatePicker
         placeholderText='to'
         selected={this.state.to}
         selectsEnd
         startDate={this.state.from}
         endDate={this.state.to}
         onChange={this.handleToChange}
       />

       <hr className='config-separator' />

       <p className='config-label '> {t('relaving_to_type_uppercase')} </p>

       <SelectTargetToSearchList
         searchTargetsNames={this.targetsToSearch}
         activeName={this.props.targetToSearch}
         handleSelect={(name) => this.handleSetTargetToSearchFilter(name)}
       />
     </div>
   )
 }
}

const mapStateToProps = (state, props) => {
  return {
    searchedEntities: state.search.results,
    isSearching: state.search.isSearching
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(
      {
        cleanSearchResults,
        searchRequest
      }
      , dispatch)
  }
}

SearchConfigDashboard.propTypes = {
  actions: PropTypes.object,
  t: PropTypes.func,
  setFilter: PropTypes.func,
  searchedEntities: PropTypes.array,
  targetToSearch: PropTypes.string,
  isSearching: PropTypes.bool
}

export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(SearchConfigDashboard))
