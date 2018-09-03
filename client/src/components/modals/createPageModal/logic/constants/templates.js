import * as names from './templatesNames'
import emptyPageIcon from 'src/resources/icons/empty-folder-black.png'
import blogPageIcon from 'src/resources/icons/blog3.png'
import {getT} from 'src/config/i18n'

const t = getT()
export const templates = [
  {
    name: names.EMPTY_PAGE,
    previewText: t('start_from_empty_page'),
    img: emptyPageIcon
  },
  {
    name: names.BLOG_PAGE,
    previewText: t('share_news_and_announcements_with_your_team'),
    img: blogPageIcon
  }
]
