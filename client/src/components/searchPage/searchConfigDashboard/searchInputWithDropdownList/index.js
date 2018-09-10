import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { MoonLoader } from 'react-spinners'
import { translate } from 'react-i18next'
import _ from 'lodash'
import './searchInputWithDropdownList.css'

class SearchInputWithDropdownList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showSelectEntityList: false
    }
    this.searchInputRef = React.createRef()
  }

  componentDidMount () {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        showSelectEntityList: false
      })
    }
  }

  clearSearcList = () => {
    this.props.actions.cleanSearchResults()
  }

  selectEntity = (entity) => {
    this.searchInputRef.current.value = this.props.getEntityName(entity)
    this.props.handleSelectEntity(entity)
    this.setState({
      showSelectEntityList: false
    })
  }

  handleSearch = _.debounce((input) => {
    this.isDebounced = false
    if (input.length) {
      this.props.handleSearchEntities(input)
    } else {
      this.props.actions.cleanSearchResults()
    }
  }, 200);

  handleInput = (input) => {
    const toSearch = this.searchInputRef.current.value.trim()

    this.handleSearch(toSearch)

    if (toSearch.length) {
      this.setState({
        showSelectEntityList: true
      })
      this.isDebounced = true
    } else {
      this.setState({
        showSelectEntityList: false
      })
    }

    this.props.additionalHookForInputHandler && this.props.additionalHookForInputHandler(this.searchInputRef.current)
  }

  render () {
    const { showSelectEntityList } = this.state
    const { searchPlaceholder, renderSearchedEntityLiContent, searchedEntities, isSearching, t } = this.props
    return (
      <div className='search-input-with-dropdown-list' ref={this.setWrapperRef}>
        <input
          type='text'
          onInput={({target}) => this.handleInput(target)}
          placeholder={searchPlaceholder}
          onFocus={this.clearSearcList}
          ref={this.searchInputRef}
        />
        {
          showSelectEntityList &&
          <ul className='select-searched-entities-list'>
            {
              searchedEntities.length
                ? searchedEntities.map((entity) => (
                  <li
                    onClick={() => this.selectEntity(entity)}
                    key={entity._id}
                  >
                    { renderSearchedEntityLiContent(entity) }
                  </li>
                ))

                : isSearching || this.isDebounced

                  ? <li>
                    <div className='sweet-loading'>
                      <MoonLoader
                        sizeUnit={'px'}
                        size={15}
                        color={'#123abc'}
                      />
                    </div>
                  </li>

                  : <li className='nothing-found-message'>
                    <i className='fas fa-exclamation-triangle' />
                    <span>
                      {t('nothing_found')}
                    </span>
                  </li>
            }
          </ul>
        }
      </div>
    )
  }
}

SearchInputWithDropdownList.propTypes = {
  actions: PropTypes.object,
  getEntityName: PropTypes.func,
  additionalHookForInputHandler: PropTypes.func,
  handleSearchEntities: PropTypes.func,
  handleSelectEntity: PropTypes.func,
  searchedEntities: PropTypes.array,
  searchPlaceholder: PropTypes.string,
  renderSearchedEntityLiContent: PropTypes.func,
  isSearching: PropTypes.bool,
  t: PropTypes.func
}

export default translate('translations')(SearchInputWithDropdownList)
