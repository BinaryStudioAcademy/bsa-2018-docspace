import React from 'react'
import DashboardSpacesBody from '../../spacesBody'
import CreateSpaceButton from 'src/components/common/createSpaceButton'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'

import './spaces.css'

const Spaces = (props) => (
  <div className={'dashboard-spaces'}>
    <div className={'spaces-header'}>
      <h2>{props.t('space_directory')}</h2>
      <CreateSpaceButton />
    </div>
    <DashboardSpacesBody t={props.t} />
  </div>
)

Spaces.propTypes = {
  t: PropTypes.func
}

export default translate('translations')(Spaces)
