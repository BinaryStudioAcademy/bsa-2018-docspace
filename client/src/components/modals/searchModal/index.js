import React, {Component} from 'react'
import './searchModal.css'
import {searchRequest, cleanSearchResults} from 'src/commonLogic/search/searchActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { NavLink } from 'react-router-dom'

class SearchModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      filter: ''
    }
  }

  setFilterValue = (target) => {
    this.setState({
      filter: target.value
    }, this.search)
  }

  search = _.debounce(target => {
    if (this.state.filter !== '') {
      this.props.actions.searchRequest({ input: this.state.filter, targetToSearch: 'all by name' })
    } else {
      this.props.actions.cleanSearchResults()
    }
  }, 200);

  renderResults = () => {
    let blogsList = []
    let spacesList = []
    let postList = []
    this.props.searchResults.forEach(result => {
      if (result.key) {
        spacesList.push(result)
      } else if (result.blogId) {
        blogsList.push(result)
      } else {
        postList.push(result)
      }
    })
    console.log(blogsList)
    console.log(spacesList)
    console.log(postList)
    const blogRender = blogsList.map(blog =>
      <div className='search-result-wrapper'>
        {blog.spaceId
          ? <NavLink onClick={this.props.closeModal}
            to={`/spaces/${blog.spaceId && blog.spaceId._id}/blogs/${blog._id}`}>
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
    console.log(postList)
    const result = <React.Fragment>
      {postList.length ? <div className='search-title-wrapper'>
        <p>PAGES</p>
      </div> : null
      }
      {PageRender}
      {blogsList.length ? <div className='search-title-wrapper'>
        <p>BLOGS</p>
      </div> : null
      }
      {blogRender}
      {spacesList.length ? <div className='search-title-wrapper'>
        <p>SPACES</p>
      </div> : null
      }
      {SpaceRender}
      {this.state.filter !== '' && <div className='search-link'>
        <NavLink to='#'>
          <i className='fas fa-search' />
          {`Search '${this.state.filter}'`}
        </NavLink>
      </div>}
    </React.Fragment>

    return result

    // return blogRender.concat(PageRender).concat(SpaceRender)
  }

  closeModal = () => {
    this.props.closeModal()
    this.setState({
      filter: ''
    })
    this.props.actions.cleanSearchResults()
  }

  render () {
    console.log(this.props)
    console.log(this.props.searchResults)

    return (
      <div className='search-modal'>
        <div className='search-modal-body'>
          <div className='search-sidebar'>
            <button onClick={this.closeModal} className='return-button'><i className='fas fa-arrow-left' /></button>
          </div>
          <div className='search-content'>
            <input autoFocus='true' onChange={({target}) => this.setFilterValue(target)} className='search-field' placeholder='Search' value={this.state.filter} />
            {this.renderResults()}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    searchResults: state.search.results
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(
      {
        searchRequest,
        cleanSearchResults
      }
      , dispatch)
  }
}

SearchModal.propTypes = {
  closeModal: PropTypes.func,
  actions: PropTypes.object,
  searchResults: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchModal)
