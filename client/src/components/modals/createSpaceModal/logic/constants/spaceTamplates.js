
import emptyFolderImg from 'src/resources/icons/empty-folder-alt.png'
import teamImg from 'src/resources/icons/theteam.png'
import documentsImg from 'src/resources/icons/documents2.png'
import knowledgeImg from 'src/resources/icons/brain.png'
import templatesNames from './templatesNames'
import {getT} from 'src/config/i18n'

const t = getT()

const SPACE_TEMPLATE = [
  {
    name: templatesNames.EMPTY_SPACE,
    previewText: t('Start from empty list'),
    description: t('Start with an empty space'),
    img: emptyFolderImg
  },
  {
    name: templatesNames.GROUP_SPACE,
    previewText: t('Cooperation and exchange of resources with your team'),
    description: t('Share knowledge, work together'),
    img: teamImg
  },
  {
    name: templatesNames.KNOWLEDGE_BASE,
    previewText: t('Exchange of successful experience in solving typical problems'),
    description: t('Share the knowledge and methods'),
    img: knowledgeImg
  },
  {
    name: templatesNames.DOCUMENTATION_SPACE,
    previewText: t('Create and manage technical documentation for your products'),
    description: t('Creation, management and joint work'),
    img: documentsImg
  }
]

export default SPACE_TEMPLATE
