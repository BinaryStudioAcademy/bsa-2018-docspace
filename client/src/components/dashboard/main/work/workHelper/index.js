import {timeDifference} from '../timeDifference'
export function workHelper (content) {
  switch (content.action) {
    case 'UPDATE_PAGE_SUCCESS':
      return {
        name: content.pageId.title,
        time: timeDifference(new Date(), new Date(content.date)),
        path: `/spaces/${content.spaceId}/pages/${content.pageId._id}`,
        icon: 'fas fa-file-alt',
        isDeleted: content.pageId.isDeleted
      }
    case 'UPDATE_BLOG_PAGE_SUCCESS':
      return {
        name: content.pageId.title,
        time: timeDifference(new Date(), new Date(content.date)),
        path: `/spaces/${content.spaceId}/blog/${content.pageId._id}`,
        icon: 'fas fa-rss-square',
        isDeleted: content.pageId.isDeleted
      }
    default:
      return null
  }
}
