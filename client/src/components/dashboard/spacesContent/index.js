import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DashboardInput from '../input'
import PropTypes from 'prop-types'
import { allSpaces } from '../../space/spaceContainer/logic/spaceReducer'
import { getSpacesRequest } from '../../space/spaceContainer/logic/spaceActions'
import './spacesContent.css'
import logo from './space-logo.png'
import { Link } from 'react-router-dom'
class SpacesContent extends Component {
  componentDidMount () {
    this.props.actions.getSpacesRequest()
  }
  render () {
    const userId = '5b6c5d79860b443cd512d7d7'
    const list = this.props.spaces.map((item, index) => {
      const categories = item.categories.map(category => category.name).join(', ')
      let spaceItem = <tr key={index} className={'space__item'}>
        <td className='space__image'>
          <Link className='link_view' to={`/spaces/${item._id}/overview`}>
            <img src={logo} alt='' />
          </Link></td>
        <td><Link to={`/spaces/${item._id}/overview`}>{item.name}</Link></td>
        <td>{item.description}</td><td>{categories}</td>
        <td><Link to={`/spaces/${item._id}/settings`}><i title='Space Info' className={'fas fa-info-circle'} /></Link></td></tr>
      if (this.props.activeTab === 'All Spaces') {
        if ((item.rights !== undefined) && (((item.rights).users) !== undefined)) {
          if ((userId === item.ownerId._id) || ((((item.rights).users).indexOf(userId)) !== -1)) {
            return spaceItem
          }
        }
      } if (this.props.activeTab === 'Site Spaces') {
        return spaceItem
      } if (this.props.activeTab === 'Personal Spaces') {
        return spaceItem
      } if (this.props.activeTab === 'My Spaces') {
        return spaceItem
      } if (this.props.activeTab === 'Archived Spaces') {
        return spaceItem
      }
    })
    return (<div className={'spaces__content__body'}>
      <div className={'header__spaces__content'}><h2>{this.props.activeTab}</h2><DashboardInput placeholder='Filter' /></div>
      <div className={'body__spaces__content'}><table className='table_spaces'>
        <thead className='list__header'>
          <tr>
            <td className='column-heading name-heading' colSpan='2'>Space</td>
            <td className='column-heading desc-heading'>Description</td>
            <td className='column-heading labels-heading'>Categories</td>
            <td className='column-heading icon-column-heading' />
          </tr>
        </thead>
        <tbody>
          {list}
        </tbody>
      </table></div>
    </div>)
  }
}
const mapStateToProps = state => {
  const props = {spaces: allSpaces(state)}
  return props
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({getSpacesRequest}, dispatch)
})
SpacesContent.propTypes = {
  spaces: PropTypes.array,
  actions: PropTypes.object,
  activeTab: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(SpacesContent)
