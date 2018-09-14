import * as names from './templatesNames'
// import getTemplatesName from './templatesNames'
import emptyPageIcon from 'src/resources/icons/empty-folder-black.png'
import blogPageIcon from 'src/resources/icons/blog3.png'
import {getT} from 'src/config/i18n'

const t = getT()
export function getTemplates () {
  // console.log(getTemplatesName('EMPTY_PAGE'))
  return [
    {
      name: names.EMPTY_PAGE,
      label: t('empty_page'),
      previewText: t('start_from_empty_page'),
      img: emptyPageIcon
    },
    {
      name: names.BLOG_PAGE,
      label: t('blog_page'),
      previewText: t('share_news_and_announcements_with_your_team'),
      img: blogPageIcon
    }
  ]
}
