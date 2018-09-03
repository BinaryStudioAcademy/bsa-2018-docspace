import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { translate } from 'react-i18next'
import { cleanSearchResults } from 'src/commonLogic/search/searchActions'
import { MoonLoader } from 'react-spinners'
import _ from 'lodash'

import './addPermissionsForm.css'

class AddPermissionsForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedEntity: null,
      showSelectEntityList: false
    }
    this.searchInputRef = React.createRef()
  }

  handleSelectEntity = (entity) => {
    this.setState({
      selectedEntity: entity
    })

    this.searchInputRef.current.value = this.props.getEntityName(entity)
  }

  handleSearch = _.debounce((input) => {
    this.isDebounced = false
    if (input.length) {
      this.props.handleSearchEntitiesToAddPermissions(input)
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
    }

    if (!toSearch.length) {
      this.setState({
        showSelectEntityList: false
      })
    }
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
        selectedEntity: null,
        showSelectEntityList: false
      })

      // this.isDebounced = false
    }
  }

  clearsearcList = () => {
    this.props.actions.cleanSearchResults()
  }

  handleAddBtnClick = () => {
    console.log('CLICK')
    this.props.handleAddPermissions(this.state.selectedEntity)
  }

  render () {
    const { searchPlaceholder, renderSearchedEntityLiContent, searchedEntities, isSearching } = this.props
    const { selectedEntity, showSelectEntityList } = this.state
    return (
      <form
        ref={this.setWrapperRef}
        className='add-permissions-form'
      >
        <div className='field-group'>
          <input
            type='text'
            onInput={({target}) => this.handleInput(target)}
            placeholder={searchPlaceholder}
            onFocus={this.clearsearcList}
            ref={this.searchInputRef}
          />
          <span onClick={(this.handleAddBtnClick)} className='add-permissions-btn'>
              Add
          </span>
        </div>

        {
          showSelectEntityList &&
          <ul className='select-searched-entities-list'>
            {
              searchedEntities.length
                ? searchedEntities.map((entity) => (
                  <li
                    onClick={() => this.handleSelectEntity(entity)}
                    className={entity === selectedEntity ? 'selected' : ''}
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
                          Nothing found
                    </span>
                  </li>
            }
          </ul>
        }
      </form>
    )
  }
}

AddPermissionsForm.propTypes = {
  actions: PropTypes.object,
  isSearching: PropTypes.bool,
  getEntityName: PropTypes.func,
  searchedEntities: PropTypes.array,
  searchPlaceholder: PropTypes.string,
  handleAddPermissions: PropTypes.func,
  renderSearchedEntityLiContent: PropTypes.func,
  handleSearchEntitiesToAddPermissions: PropTypes.func
}

const mapStateToProps = (state, props) => {
  return {
    searchedEntities: state.search.results.filter((entity) => !props.idsOfEntitiesThatAlreadyHavePermissions.includes(entity._id)),
    isSearching: state.search.isSearching
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(
      {
        cleanSearchResults
      }
      , dispatch)
  }
}

export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(AddPermissionsForm))
