import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContentListItem from './contentListItem'
import { MoonLoader } from 'react-spinners'

import pinguin from 'src/resources/search_pinguin.png'

import './matchedContent.css'

const propsByEntityType = (entity, type, t) => {
  switch (type) {
    case ('page'):
      return {
        icon: 'far fa-file-alt',
        path: `spaces/${entity._source.spaceId}/pages/${entity._id}`,
        title: entity.highlight && entity.highlight.title ? entity.highlight.title[0] : entity._source.title,
        time: entity._source.updatedAt,
        content: entity.highlight && entity.highlight.content ? entity.highlight.content[0] : entity._source.content
      }

    case ('blog'):
      return {
        icon: 'fas fa-rss-square',
        path: `spaces/${entity._source.spaceId}/blog/${entity._id}`,
        title: entity.highlight && entity.highlight.title ? entity.highlight.title[0] : entity._source.title,
        time: entity._source.updatedAt,
        content: entity.highlight && entity.highlight.content ? entity.highlight.content[0] : entity._source.content
      }

    case ('space'):
      return {
        icon: `fa fa-${entity.spaceSettings.icon}`,
        path: `spaces/${entity._id}`,
        title: entity.name,
        time: entity.updatedAt,
        iconColor: entity.spaceSettings.color
      }
  }
}

export default class MatchedContent extends Component {
  renderPageLoader = () => (
    <div className='search-page-loader'>
      <MoonLoader
        sizeUnit={'px'}
        size={32}
        color={'#123abc'}
      />
    </div>
  )

  renderSearchResults = () => {
    const { pages, blogs, spaces } = this.props.searchResults
    if (pages && !pages.length && blogs && !blogs.length && spaces && !spaces.length) {
      return (
        <div className='no-adavnced-search-results-msg'>
          <img src={pinguin} alt='' />
          <p>{ this.props.t('no_advanced_search_results_msg') }</p>
        </div>
      )
    }
    return (
      <ul className='matched-content-list'>
        {
          pages && pages.map(page => <ContentListItem {...propsByEntityType(page, 'page')} key={page._id} />)
        }
        {
          blogs && blogs.map(blog => <ContentListItem {...propsByEntityType(blog, 'blog')} key={blog._id} />)
        }
        {
          spaces && spaces.map(space => <ContentListItem {...propsByEntityType(space, 'space')} key={space._id} />)
        }
      </ul>
    )
  }

  render () {
    return (
      <div className='matched-content-wrp'>
        {
          this.props.isAdvancedSearching
            ? this.renderPageLoader()
            : this.renderSearchResults()
        }
      </div>
    )
  }
}

MatchedContent.propTypes = {
  items: PropTypes.array
}
