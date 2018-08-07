import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './contentBody.css'

class MenuList extends Component {
  state = {
    active: ''
  }
  handleClick = (menuTab) => {
    this.setState({active: menuTab})
  }

  render () {
    const menuTabs = this.props.menuTabs
    const listItems = menuTabs.map((menuTab) => {
      const className = menuTab === this.state.active ? 'active' : ''
      return <li className={'menuTab'} onClick={() => this.handleClick(menuTab)} key={menuTab}>
        <a className={className} >{menuTab}</a>
      </li>
    }
    )

    return (
      listItems
    )
  }
}
MenuList.propTypes = {
  menuTabs: PropTypes.string
}

class ContentBody extends Component {
  constructor (props) {
    super(props)
    this.menuTabs = this.props.menuTabs
  }

  render () {
    return (
      <div className={'dashboard__content__body'} >

        <div className={'header'}>
          <h1>{this.props.header}</h1>

          <div>
            <ul id='menu'>
              <MenuList menuTabs={this.props.menuTabs} />

            </ul>
          </div>
        </div>

      </div>
    )
  }
}
ContentBody.propTypes = {
  menuTabs: PropTypes.string,
  header: PropTypes.string
}
export default ContentBody
