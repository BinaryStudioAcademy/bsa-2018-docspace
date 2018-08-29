import React, {Component} from 'react'
import './searchModal.css'
import {getMatchingPagesRequest} from './logic/searchActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class SearchModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      filter: ''
    }
  }

  setFilterValue = (target) => {
    this.setState({
      filter: target.value
    }, this.getPages)
  }

  getPages = () => {
    this.props.actions.getMatchingPagesRequest(this.state.filter)
  }

  render () {
    console.log(this.props)
    return (
      <div className='search-modal'>
        <div className='search-modal-body'>
          <button onClick={this.props.closeModal} className='return-button'><i className='fas fa-arrow-left' /></button>
          <input onChange={({target}) => this.setFilterValue(target)} className='search-field' placeholder='Search' value={this.state.filter} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    groups: state.groups,
    user: state.verification.user,
    matchingUsers: state.matchingUsers
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(
      {
        getMatchingPagesRequest
      }
      , dispatch)
  }
}

SearchModal.propTypes = {
  closeModal: PropTypes.func,
  actions: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchModal)
