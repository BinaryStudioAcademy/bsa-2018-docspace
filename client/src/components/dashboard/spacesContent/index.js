import React, { Component } from 'react'
import DashboardInput from '../input'
import PropTypes from 'prop-types'
import './spacesContent.css'
import { NavLink } from 'react-router-dom'
import { MoonLoader } from 'react-spinners'

class SpacesContent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      filterField: ''
    }
  }
  handleFilterField = (e) => {
    this.setState({filterField: e.target.value})
  }
  handleFilterFieldByClick = (e) => {
    e.preventDefault()
    this.setState({filterField: e.target.innerText})
  }
  renderSortedSpaces = () => {
    const filteredValue = this.state.filterField.toLocaleLowerCase()
    const filteredSpaces = this.props.spaces.filter(space => {
      if (!space.categories.length) {
        if (~space.name.toLocaleLowerCase().indexOf(filteredValue)) { // ~ means if found
          return true
        } else {
          return false
        }
      }
      return space.categories && space.categories.some(categorie => {
        if (~categorie.name.toLocaleLowerCase().indexOf(filteredValue)) { // ~ means if found
          return true
        } else {
          return false
        }
      })
    })
    const spaces = filteredSpaces.map((space, index) => {
      const {icon, color} = space.spaceSettings ? space.spaceSettings : {icon: 'folder', color: '#1c80ff'}
      return (
        <tr key={index} className='space-item'>
          <td className='space-image'>
            <NavLink className='link_view' to={`/spaces/${space._id}/overview`}>
              <div className='space-edit-avatar' style={{backgroundColor: color}} onClick={this.handleShowColorPicker}>
                <span className='icon-avatar' >
                  <i className={`fa fa-${icon.toLowerCase()}`} />
                </span>
              </div>
            </NavLink>
          </td>
          <td>
            <NavLink className='space-item-link' to={`/spaces/${space._id}/overview`}>
              {space.name}
            </NavLink>
          </td>
          <td className='space-description'>{space.description}</td>
          <td>
            {
              space.categories.map((category, index) => <a onClick={this.handleFilterFieldByClick} href='' key={index} className='space-label'>{category.name}</a>)
            }
          </td>
          <td>
            <NavLink className='space-item-link' to={`/spaces/${space._id}/overview`}>
              <i title='Space Info' className={'fas fa-info-circle'} />
            </NavLink>
          </td>
        </tr>
      )
    }
    )
    return spaces
  }

  render () {
    const { isFetching, t } = this.props
    return (
      <div className={'spaces-content-body'}>
        <div className={'header-spaces-content'}>
          <h2>{this.props.activeTab}</h2>
          <DashboardInput dashboardValue={this.state.filterField} ref='filterInput' placeholder={t('filter')} onChange={this.handleFilterField} />
        </div>
        { isFetching
          ? <div className='body-spaces-loader'>
            <div className='sweet-loading'>
              <MoonLoader
                sizeUnit={'px'}
                size={32}
                color={'#123abc'}
              />
            </div>
          </div>
          : <div className={'body-spaces-content'}>
            <table className='table-paces'>
              <thead className='list-header'>
                <tr>
                  <td className='column-heading name-heading' colSpan='2'>{t('space')}</td>
                  <td className='column-heading desc-heading'>{t('description')}</td>
                  <td className='column-heading labels-heading'>{t('categories')}</td>
                  <td className='column-heading icon-column-heading' />
                </tr>
              </thead>
              <tbody>
                {this.renderSortedSpaces()}
              </tbody>
            </table>
          </div>
        }
      </div>
    )
  }
}
SpacesContent.propTypes = {
  spaces: PropTypes.array,
  isFetching: PropTypes.bool,
  activeTab: PropTypes.string,
  t: PropTypes.func
}
export default SpacesContent
