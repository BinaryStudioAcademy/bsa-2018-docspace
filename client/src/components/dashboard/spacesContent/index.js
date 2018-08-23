import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DashboardInput from '../input'
import PropTypes from 'prop-types'
import { allSpaces, isSpacesFetching } from '../../space/spaceContainer/logic/spaceReducer'
import { getSpacesRequest } from '../../space/spaceContainer/logic/spaceActions'
import './spacesContent.css'
import logo from './space-logo.png'
import { Link } from 'react-router-dom'
import { MoonLoader } from 'react-spinners'

class SpacesContent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      filterField: ''
    }
  }
  componentDidMount () {
    this.props.actions.getSpacesRequest()
  }
  handleFilterField = (e) => {
    this.setState({filterField: e.target.value})
  }
  renderSortedSpaces = () => {
    const filteredValue = this.state.filterField.toLocaleLowerCase()
    const filteredSpaces = this.props.spaces.filter(space => {
      console.log(space)
      if (!space.categories.length) {
        if (~space.name.toLocaleLowerCase().indexOf(filteredValue)) { // ~ means if found
          return true
        } else {
          return false
        }
      }
      return space.categories.some(categorie => {
        if (!categorie.name) {
          return true
        }
        if (!categorie.name.length) {
          return true
        }
        if (~categorie.name.toLocaleLowerCase().indexOf(filteredValue)) { // ~ means if found
          return true
        } else {
          return false
        }
      })
    })
    const spaces = filteredSpaces.map((item, index) => {
      const spaceItem = (
        <tr key={index} className='space-item'>
          <td className='space-image'>
            <Link className='link_view' to={`/spaces/${item._id}/overview`}>
              <img src={logo} alt='' />
            </Link>
          </td>
          <td>
            <Link className='space-item-link' to={`/spaces/${item._id}/overview`}>{item.name}</Link>
          </td>
          <td className='space-description'>{item.description}</td>
          <td>
            {
              item.categories.map((category, index) => <a href='' key={index} className='space-label'>{category.name}</a>)
            }
          </td>
          <td>
            <Link to={`/spaces/${item._id}/settings`}><i title='Space Info' className={'fas fa-info-circle'} /></Link>
          </td>
        </tr>
      )
      if (this.props.activeTab === 'All Spaces') {
        // Checking permission ?
        // if ((item.rights !== undefined) && (((item.rights).users) !== undefined)) {
        //   if ((userId === item.ownerId) || ((((item.rights).users).indexOf(userId)) !== -1)) {
        //     return spaceItem
        //   }
        // }
        return spaceItem
      }
      if (this.props.activeTab === 'Site Spaces') {
        return spaceItem
      } if (this.props.activeTab === 'Personal Spaces') {
        return spaceItem
      } if (this.props.activeTab === 'My Spaces') {
        return spaceItem
      } if (this.props.activeTab === 'Archived Spaces') {
        return spaceItem
      }
      return null
    })
    return spaces
  }

  render () {
    const { isFetching } = this.props
    return (
      <div className={'spaces-content-body'}>
        <div className={'header-spaces-content'}>
          <h2>{this.props.activeTab}</h2>
          <DashboardInput placeholder='Filter' onChange={this.handleFilterField} />
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
                  <td className='column-heading name-heading' colSpan='2'>Space</td>
                  <td className='column-heading desc-heading'>Description</td>
                  <td className='column-heading labels-heading'>Categories</td>
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

const mapStateToProps = state => ({
  spaces: allSpaces(state),
  isFetching: isSpacesFetching(state),
  state: state
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({getSpacesRequest}, dispatch)
})

SpacesContent.propTypes = {
  spaces: PropTypes.array,
  actions: PropTypes.object,
  activeTab: PropTypes.string,
  isFetching: PropTypes.bool
}

export default connect(mapStateToProps, mapDispatchToProps)(SpacesContent)
