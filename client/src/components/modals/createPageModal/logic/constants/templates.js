import * as names from './templatesNames'
import emptyPageIcon from 'src/resources/icons/empty-folder-black.png'
import blogPageIcon from 'src/resources/icons/blog3.png'

export const templates = [
  {
    name: names.EMPTY_PAGE,
    previewText: 'Start from empty list',
    img: emptyPageIcon
  },
  {
    name: names.BLOG_PAGE,
    previewText: 'Share news and announcements with your team',
    img: blogPageIcon
  }
]
