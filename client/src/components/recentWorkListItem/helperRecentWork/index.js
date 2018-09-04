import {timeDifference} from 'src/helpers/timeDifference'
export default (content) => {
  switch (content._id.action) {
    case 'CREATE_PAGE_SUCCESS':
      return {
        name: content.title[0],
        title: content.name[0],
        time: timeDifference(new Date(), new Date(content.date)),
        path: `/spaces/${content.spaceId[0]}/pages/${content._id.pageId}`,
        icon: 'fas fa-file-alt',
        isDeleted: content.isDeleted[0]
      }
    case 'UPDATE_PAGE_SUCCESS':
      return {
        name: content.title[0],
        title: content.name[0],
        time: timeDifference(new Date(), new Date(content.date)),
        path: `/spaces/${content.spaceId[0]}/pages/${content._id.pageId}`,
        icon: 'fas fa-file-alt',
        isDeleted: content.isDeleted[0]
      }
    case 'CREATE_BLOG_PAGE_SUCCESS':
      return {
        name: content.title[0],
        title: content.name[0],
        time: timeDifference(new Date(), new Date(content.date)),
        path: `/spaces/${content.spaceId[0]}/blog/${content._id.pageId}`,
        icon: 'fas fa-rss-square',
        isDeleted: content.isDeleted[0]
      }
    case 'UPDATE_BLOG_PAGE_SUCCESS':
      return {
        name: content.title[0],
        title: content.name[0],
        time: timeDifference(new Date(), new Date(content.date)),
        path: `/spaces/${content.spaceId[0]}/blog/${content._id.pageId}`,
        icon: 'fas fa-rss-square',
        isDeleted: content.isDeleted[0]
      }
    default:
      return null
  }
}
