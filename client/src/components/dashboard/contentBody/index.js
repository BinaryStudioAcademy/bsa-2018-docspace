import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './contentBody.css'
import MenuList from './../menuList'
class ContentBody extends Component {
  constructor (props) {
    super(props)
    this.menuTabs = this.props.menuTabs
  }

  render () {
    return (
      <div className={'dashboard__content__body'} >

        <div className={'headerDashboard'}>
          <h1>{this.props.header}</h1>

          <div>
            <ul className='headerDashboardMenu' id='menu'>
              <MenuList menuTabs={this.props.menuTabs} />

            </ul>
          </div>
        </div>

      </div>
    )
  }
}
ContentBody.propTypes = {
  menuTabs: PropTypes.array,
  header: PropTypes.string
}
export default ContentBody
