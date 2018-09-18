import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import './pageTitle.css'

class PageTitle extends PureComponent {
  render () {
    return <div className='page-title'>{this.props.text}</div>
  }
}
// const PageTitle = ({ text }) => {
//   return (
//     <div className='page-title'>{text}</div>
//   )
// }

PageTitle.propTypes = {
  text: PropTypes.string
}

PageTitle.defaultProps = {
  text: ''
}

export default PageTitle
