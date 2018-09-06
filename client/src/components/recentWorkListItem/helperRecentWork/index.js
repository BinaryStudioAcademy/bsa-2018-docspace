import {timeDifference} from 'src/helpers/timeDifference'
export default (content) => {
  console.log(content)
  switch (content._id.action) {
    case 'CREATE_PAGE_SUCCESS':
      return {
        name: content.title,
        title: content.name,
        time: timeDifference(new Date(), new Date(content.date)),
        path: `/spaces/${content.spaceId}/pages/${content._id.pageId}`,
        icon: 'fas fa-file-alt',
        isDeleted: content.isDeleted
      }
    case 'UPDATE_PAGE_SUCCESS':
      return {
        name: content.title,
        title: content.name,
        time: timeDifference(new Date(), new Date(content.date)),
        path: `/spaces/${content.spaceId}/pages/${content._id.pageId}`,
        icon: 'fas fa-file-alt',
        isDeleted: content.isDeleted
      }
    case 'CREATE_BLOG_PAGE_SUCCESS':
      return {
        name: content.title,
        title: content.name,
        time: timeDifference(new Date(), new Date(content.date)),
        path: `/spaces/${content.spaceId}/blog/${content._id.pageId}`,
        icon: 'fas fa-rss-square',
        isDeleted: content.isDeleted
      }
    case 'UPDATE_BLOG_PAGE_SUCCESS':
      return {
        name: content.title,
        title: content.name,
        time: timeDifference(new Date(), new Date(content.date)),
        path: `/spaces/${content.spaceId}/blog/${content._id.pageId}`,
        icon: 'fas fa-rss-square',
        isDeleted: content.isDeleted
      }
    default:
      return null
  }
}
