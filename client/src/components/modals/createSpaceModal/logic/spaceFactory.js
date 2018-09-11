import templatesNames from './constants/templatesNames'

// SpaceFactory will create space by template name :
// standart home page for template, permissions and other

// dummy
const spaceCreatorsByTemplatesNames = {
  [templatesNames.EMPTY_SPACE]: (fields) => {
    // TODO: check if flag isPrivate is true. If so, add appropriate permissions to re return feilds
    return {...fields, type: 'EMPTY_SPACE'}
  },

  [templatesNames.GROUP_SPACE]: (fields) => {
    return {...fields, type: 'GROUP_SPACE'}
  },
  [templatesNames.KNOWLEDGE_BASE]: (fields) => {
    return {...fields, type: 'KNOWLEDGE_BASE'}
  },
  [templatesNames.DOCUMENTATION_SPACE]: (fields) => {
    return {...fields, type: 'DOCUMENTATION_SPACE'}
  }
}

class SpaceFatcory {
  constructor (spaceCreatorsByTemplatesNames) {
    this.spaceCreators = spaceCreatorsByTemplatesNames
  }
  createByFieldsAndTemplateName (fields, templateName) {
    return this.spaceCreators[templateName](fields)
  }
}

export default new SpaceFatcory(spaceCreatorsByTemplatesNames)
