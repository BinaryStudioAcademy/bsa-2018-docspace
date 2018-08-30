export default (content) => {
  switch (content.action) {
    case 'CREATE_SPACE_SUCCESS':
      return {
        user: {...content.userId},
        name: content.spaceId.name,
        time: new Date(content.date).toLocaleString(),
        path: `/spaces/${content.spaceId._id}/overview`,
        icon: 'fas fa-folder',
        action: 'New space created',
        isDeleted: content.spaceId.isDeleted
      }
    case 'UPDATE_SPACE_SUCCESS':
      return {
        user: {...content.userId},
        name: content.spaceId.name,
        time: new Date(content.date).toLocaleString(),
        path: `/spaces/${content.spaceId._id}/overview`,
        icon: 'fas fa-folder',
        action: 'Update space',
        isDeleted: content.spaceId.isDeleted
      }
    case 'CREATE_PAGE_SUCCESS':
      return {
        user: {...content.userId},
        name: content.pageId.title,
        title: content.spaceId.name,
        time: new Date(content.date).toLocaleString(),
        path: `/spaces/${content.spaceId._id}/pages/${content.pageId._id}`,
        icon: 'fas fa-file-alt',
        action: 'New page created',
        isDeleted: content.pageId.isDeleted
      }
    case 'UPDATE_PAGE_SUCCESS':
      return {
        user: {...content.userId},
        name: content.pageId.title,
        title: content.spaceId.name,
        time: new Date(content.date).toLocaleString(),
        path: `/spaces/${content.spaceId._id}/pages/${content.pageId._id}/${content.modifiedVersion}`,
        icon: 'fas fa-file-alt',
        action: 'Update page',
        isDeleted: content.pageId.isDeleted
      }
    case 'CREATE_BLOG_PAGE_SUCCESS':
      return {
        user: {...content.userId},
        name: content.pageId.title,
        title: content.spaceId.name,
        time: new Date(content.date).toLocaleString(),
        path: `/spaces/${content.spaceId._id}/blog/${content.pageId._id}`,
        icon: 'fas fa-rss-square',
        action: 'Create blog',
        isDeleted: content.pageId.isDeleted
      }
    case 'UPDATE_BLOG_PAGE_SUCCESS':
      return {
        user: {...content.userId},
        name: content.pageId.title,
        title: content.spaceId.name,
        time: new Date(content.date).toLocaleString(),
        path: `/spaces/${content.spaceId._id}/blog/${content.pageId._id}`,
        icon: 'fas fa-rss-square',
        action: 'Update blog',
        isDeleted: content.pageId.isDeleted
      }
    case 'CREATE_COMMENT_SUCCESS':
      return {
        user: {...content.userId},
        name: content.pageId.title,
        time: new Date(content.date).toLocaleString(),
        path: `/spaces/${content.spaceId._id}/pages/${content.pageId._id}`,
        icon: 'fas fa-comment',
        action: `New comment ${content.commentId.text}`,
        isDeleted: content.commentId.isDeleted
      }
    case 'EDIT_COMMENT_SUCCESS':
      return {
        user: {...content.userId},
        name: content.pageId.title,
        time: new Date(content.date).toLocaleString(),
        path: '#',
        icon: 'fas fa-comment',
        action: `Comment edited ${content.commentId.text}`,
        isDeleted: content.commentId.isDeleted
      }
    default:
      return null
  }
}
