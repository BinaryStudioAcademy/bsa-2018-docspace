export default (content) => {
  switch (content._id.action) {
    case 'CREATE_PAGE_SUCCESS':
      return {
        name: content.title[0],
        title: content.name[0],
        path: `/spaces/${content.spaceId[0]}/pages/${content.pageId[0]}`,
        icon: 'fas fa-file-alt',
        isDeleted: content.isDeleted[0]
      }
    case 'UPDATE_PAGE_SUCCESS':
      return {
        name: content.title[0],
        title: content.name[0],
        path: `/spaces/${content.spaceId[0]}/pages/${content.pageId[0]}`,
        icon: 'fas fa-file-alt',
        isDeleted: content.isDeleted[0]
      }
    case 'CREATE_BLOG_PAGE_SUCCESS':
      return {
        name: content.title[0],
        title: content.name[0],
        path: `/spaces/${content.spaceId[0]}/blog/${content.pageId[0]}`,
        icon: 'fas fa-rss-square',
        isDeleted: content.isDeleted[0]
      }
    case 'UPDATE_BLOG_PAGE_SUCCESS':
      return {
        name: content.title[0],
        title: content.name[0],
        path: `/spaces/${content.spaceId[0]}/blog/${content.pageId[0]}`,
        icon: 'fas fa-rss-square',
        isDeleted: content.isDeleted[0]
      }
    default:
      return null
  }
}
