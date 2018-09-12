const content = require('./spaceDefaultContent')

const DOCUMENTATION_SPACE = 'DOCUMENTATION_SPACE'
const KNOWLEDGE_BASE = 'KNOWLEDGE_BASE'
const GROUP_SPACE = 'GROUP_SPACE'

module.exports = {
  spaceCreateHelper: (space) => {
    console.log('SPACE----HELPER', space)
    switch (space.type) {
      case DOCUMENTATION_SPACE:
        return {
          name: space.name,
          key: space.key,
          content: content.content.doc,
          pageTitle: 'Documentation page'
        }
      case KNOWLEDGE_BASE:
        return {
          name: space.name,
          key: space.key,
          content: content.content.know,
          pageTitle: 'Knowledge page'
        }
      case GROUP_SPACE:
        return {
          name: space.name,
          key: space.key,
          content: content.content.group,
          pageTitle: 'Groupe page'
        }
      default:
        return {
          name: space.name,
          key: space.key
        }
    }
  }
}
