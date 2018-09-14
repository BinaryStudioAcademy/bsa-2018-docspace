
import emptyFolderImg from 'src/resources/icons/empty-folder-alt.png'
import teamImg from 'src/resources/icons/theteam.png'
import documentsImg from 'src/resources/icons/documents2.png'
import knowledgeImg from 'src/resources/icons/brain.png'
import templatesNames from './templatesNames'
import {getT} from 'src/config/i18n'

const t = getT()

export function getSpaceTemplates () {
  return [
    {
      name: templatesNames.EMPTY_SPACE,
      label: t('documentation_space'),
      previewText: t('start_from_empty_list'),
      description: t('start_with_an_empty_space'),
      img: emptyFolderImg
    },
    {
      name: templatesNames.GROUP_SPACE,
      label: t('knowledge_base'),
      previewText: t('cooperation_and_exchange_of_resources_with_your_team'),
      description: t('share_knowledge_work_together'),
      img: teamImg
    },
    {
      name: templatesNames.KNOWLEDGE_BASE,
      label: t('empty_space'),
      previewText: t('exchange_of_successful_experience_in_solving_typical_problems'),
      description: t('share_the_knowledge_and_methods'),
      img: knowledgeImg
    },
    {
      name: templatesNames.DOCUMENTATION_SPACE,
      label: t('group_space'),
      previewText: t('create_and_manage_technical_documentation_for_your_products'),
      description: t('creation_management_and_joint_work'),
      img: documentsImg
    }
  ]
}
