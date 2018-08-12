import * as templatesNames from './constants/templatesNames'

const pageCreatorsByTemplatesNames = {
  [templatesNames.EMPTY_PAGE]: (spaceId) => (
    // create empty page for space with default title
    {
      title: 'Default title',
      spaceId: spaceId
    }
  )
}

class PageFactory {
  constructor (pageCreatorsByTemplatesNames) {
    this.PageCreators = pageCreatorsByTemplatesNames
  }
  createTemplatePageForSpace (spaceId, templateName) {
    console.log(templateName)
    return this.PageCreators[templateName](spaceId)
  }
}

export default new PageFactory(pageCreatorsByTemplatesNames)
