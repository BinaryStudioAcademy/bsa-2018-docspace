
import emptyFolderImg from 'src/resources/icons/empty-folder-alt.png'
import teamImg from 'src/resources/icons/theteam.png'
import documentsImg from 'src/resources/icons/documents2.png'
import knowledgeImg from 'src/resources/icons/brain.png'
import templatesNames from './templatesNames'

export default [
  {
    name: templatesNames.EMPTY_SPACE,
    previewText: 'Start from empty list',
    description: 'Start with an empty space and configure it for your project, team, department or company. You can add content                    using the pages and store them arranged in a hierarchy.',
    img: emptyFolderImg
  },
  {
    name: templatesNames.GROUP_SPACE,
    previewText: 'Cooperation and exchange of resources with your team',
    description: 'Share knowledge, work together on projects, processes and procedures with your team. They will be notified of this               space and all its updates. Members of the team will be granted access and will be added as observers of the                      space.',
    img: teamImg
  },
  {
    name: templatesNames.KNOWLEDGE_BASE,
    previewText: 'Exchange of successful experience in solving typical problems',
    description: 'Share the knowledge and methods of successful problem solving with your team or organization. Use it as a guide to methods for solving typical problems.',
    img: knowledgeImg
  },
  {
    name: templatesNames.DOCUMENTATION_SPACE,
    previewText: 'Create and manage technical documentation for your products',
    description: 'Creation, management and joint work on technical documentation. The documentation space has a structured tree of pages, which makes navigating the content easy.',
    img: documentsImg
  }
]
