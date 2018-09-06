import * as templatesNames from './constants/templatesNames'
import { createPageRequest, createBlogPageRequest } from 'src/components/page/logic/pageActions'

import { store } from 'src/commonLogic/store'

const pageCreatorsByTemplatesNames = {
  [templatesNames.EMPTY_PAGE]: (space, userId) => {
    let page = {
      title: 'Default title',
      spaceId: space._id,
      userId: userId
    }
    // directly dispatch action for change store
    store.dispatch(createPageRequest(page))
  },

  [templatesNames.BLOG_PAGE]: (space, userId) => {
    let blogPage = {
      title: 'Default title',
      blogId: space.blogId,
      userId: userId
    }
    store.dispatch(createBlogPageRequest(blogPage, space._id))
  }
}

class PageFactory {
  constructor (pageCreatorsByTemplatesNames) {
    this.PageCreators = pageCreatorsByTemplatesNames
  }
  createTemplatePage (space, templateName, userId) {
    return this.PageCreators[templateName](space, userId)
  }
}

export default new PageFactory(pageCreatorsByTemplatesNames)
