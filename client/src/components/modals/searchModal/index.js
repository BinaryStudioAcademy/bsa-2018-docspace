import React, {Component} from 'react'
import './searchModal.css'
import {searchRequest, cleanSearchResults, advancedSearchRequest} from 'src/commonLogic/search/searchActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { NavLink, Link, withRouter } from 'react-router-dom'
import { translate } from 'react-i18next'
import { MoonLoader } from 'react-spinners'

class SearchModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      filter: ''
    }
    this.isDebounced = false
    // this.animation()
    this.animation()
  }

  componentDidMount () {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  setFilterValue = (target) => {
    this.setState({
      filter: target.value
    }, this.search)
  }

  search = _.debounce(target => {
    if (this.state.filter !== '') {
      this.isDebounced = true
      this.props.actions.searchRequest({ input: this.state.filter, targetToSearch: 'all by name' })
    } else {
      this.isDebounced = false
      this.props.actions.cleanSearchResults()
    }
  }, 500);

  handleAdvancedSearch = () => {
    this.props.closeModal()
    this.props.actions.advancedSearchRequest({ input: this.state.filter, targetToSearch: 'all_advanced' })
  }

  // Redirect to advanced search by enter press
  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.props.history.push('/advanced_search_page')
      this.handleAdvancedSearch()
    }
  }

  renderResults = () => {
    let blogsList = []
    let spacesList = []
    let postList = []
    const {t} = this.props
    let result
    if (this.props.searchResults.length && this.state.filter !== '') {
      this.props.searchResults.forEach(result => {
        if (result.key) {
          spacesList.push(result)
        } else if (result.blogId) {
          blogsList.push(result)
        } else {
          postList.push(result)
        }
      })
      const blogRender = blogsList.map(blog =>
        <div className='search-result-wrapper'>
          {blog.spaceId
            ? <NavLink onClick={this.props.closeModal}
              to={`/spaces/${blog.spaceId && blog.spaceId._id}/blog/${blog._id}`}>
              <i className='fas fa-rss-square result-big-icon' />
              {blog.title}
            </NavLink>
            : null}
        </div>

      )
      const PageRender = postList.map(page =>
        <div className='search-result-wrapper'>
          {page.spaceId
            ? <NavLink onClick={this.props.closeModal}
              to={`/spaces/${page.spaceId._id}/pages/${page._id}`}>
              <i className='fas fa-file-alt result-big-icon' />
              {page.title}
            </NavLink>
            : null
          }
        </div>
      )

      const SpaceRender = spacesList.map(space =>
        <div className='search-result-wrapper'>
          <NavLink onClick={this.props.closeModal}
            to={`/spaces/${space._id}`}>
            <i className='fa fa-folder result-big-icon' />
            {space.name}
          </NavLink>
        </div>
      )
      result = <React.Fragment>
        {
          this.state.filter !== '' &&
          <div className='search-link'>
            <Link to='/advanced_search_page' onClick={this.handleAdvancedSearch}>
              <i className='fas fa-search' />
              {t('search_0', {filter: this.state.filter})}
            </Link >
          </div>
        }

        {postList.length ? <div className='search-title-wrapper'>
          <p>{t('pages_uppercase')}</p>
        </div> : null
        }
        {PageRender}
        {blogsList.length ? <div className='search-title-wrapper'>
          <p>{t('blogs_uppercase')}</p>
        </div> : null
        }
        {blogRender}
        {spacesList.length ? <div className='search-title-wrapper'>
          <p>{t('spaces_uppercase')}</p>
        </div> : null
        }
        {SpaceRender}
      </React.Fragment>
    } else if (this.state.filter !== '' && !this.props.isFetching && this.isDebounced) {
      result = <p>Sorry, no results were found</p>
    } else {
      result = ''
    }
    this.isDebounced = false
    return result
  }

  closeModal = () => {
    const that = this
    this.modal.className = 'search-modal-body'
    that.modalParent.className = 'search-modal'
    this.setState({
      filter: ''
    })
    this.props.actions.cleanSearchResults()
    setTimeout(function () {
      that.props.closeModal()
    }, 1000)
  }

  animation () {
    var that = this
    setTimeout(function () {
      console.log(that)
      that.modal.className += ' active'
      that.modalParent.className += ' active'
    }, 100)
  }

  setRef = (elem) => {
    this.modal = elem
  }

  setModalRef = (elem) => {
    this.modalParent = elem
  }

  handleClickOutside = (event) => {
    if (this.modal && !this.modal.contains(event.target)) {
      this.closeModal()
    }
  }
  render () {
    const {t, searchResults, isFetching} = this.props
    console.log(this.modal)
    return (
      <div className='search-modal' ref={elem => this.setModalRef(elem)}>
        <div ref={elem => this.setRef(elem)} className={`search-modal-body`}>
          <div className='search-sidebar'>
            <button onClick={this.closeModal} className='return-button'><i className='fas fa-arrow-left' /></button>
          </div>
          <div className='search-content'>
            <input
              autoFocus='true'
              onChange={({target}) => this.setFilterValue(target)}
              className='search-field'
              placeholder={t('search')}
              value={this.state.filter}
              onKeyPress={this._handleKeyPress}
            />
            {isFetching || !searchResults
              ? <div className='moon-loader-container'>
                <MoonLoader
                  sizeUnit={'px'}
                  size={32}
                  color={'#123abc'}
                />
              </div>
              : this.renderResults()
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    searchResults: state.search.results,
    isFetching: state.search.isSearching
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(
      {
        searchRequest,
        cleanSearchResults,
        advancedSearchRequest
      }
      , dispatch)
  }
}

SearchModal.propTypes = {
  closeModal: PropTypes.func,
  actions: PropTypes.object,
  searchResults: PropTypes.object,
  history: PropTypes.object,
  t: PropTypes.func,
  isFetching: PropTypes.bool
}

export default translate('translations')(withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchModal)))
