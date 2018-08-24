import * as templatesNames from './constants/templatesNames'
import { createPageRequest, createBlogPageRequest } from 'src/components/page/logic/pageActions'

import { store } from 'src/commonLogic/store'

const pageCreatorsByTemplatesNames = {
  [templatesNames.EMPTY_PAGE]: (space) => {
    let page = {
      title: 'Default title',
      spaceId: space._id
    }
    // directly dispatch action for change store
    store.dispatch(createPageRequest(page))
  },

  [templatesNames.BLOG_PAGE]: (space) => {
    let blogPage = {
      title: 'Default title',
      blogId: space.blogId
    }
    store.dispatch(createBlogPageRequest(blogPage, space._id))
  }
}

class PageFactory {
  constructor (pageCreatorsByTemplatesNames) {
    this.PageCreators = pageCreatorsByTemplatesNames
  }
  createTemplatePage (space, templateName) {
    return this.PageCreators[templateName](space)
  }
}

export default new PageFactory(pageCreatorsByTemplatesNames)
