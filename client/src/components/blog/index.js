import React, { Component } from 'react'

import './blog.css'

class Blog extends Component {
  render () {
    return (
      <div className='blog-container'>
        <div className='empty-blog-message'>
          <div className='empty-blog-message__title'>Got something to share?</div>
          <div className='empty-blog-message__text'>Blog posts are a great way to share announcements, status reports or other important news with your team.</div>
          <button className='empty-blog-message__button'>Create Blog Post</button>
        </div>
      </div>
    )
  }
}

export default Blog
