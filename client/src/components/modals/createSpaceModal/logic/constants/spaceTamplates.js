
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
    previewText: t('start_from_empty_list'),
    description: t('start_with_an_empty_space'),
    img: emptyFolderImg
  },
  {
    name: templatesNames.GROUP_SPACE,
    previewText: t('cooperation_and_exchange_of_resources_with_your_team'),
    description: t('share_knowledge_work_together'),
    img: teamImg
  },
  {
    name: templatesNames.KNOWLEDGE_BASE,
    previewText: t('exchange_of_successful_experience_in_solving_typical_problems'),
    description: t('share_the_knowledge_and_methods'),
    img: knowledgeImg
  },
  {
    name: templatesNames.DOCUMENTATION_SPACE,
    previewText: t('create_and_manage_technical_documentation_for_your_products'),
    description: t('creation_management_and_joint_work'),
    img: documentsImg
  }
]

export default SPACE_TEMPLATE
