import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './editSpaceDetailsForm.css'

export default class EditSpaceDetailsForm extends Component {
  render () {
    return (

      <form className='edit-space-details-form'>
        <h2>Edit space details</h2>
        <div className='field-group'>
          <label>Name</label>
          <input type='text' />
        </div>
        <div className='field-group'>
          <label htmlFor='description'>Description</label>
          <textarea type='text' id='description' />
        </div>
        <div className='field-group'>
          <label>Status</label>
          <select name='' id=''>
            <option value='current'>current</option>
            <option value='archived'>archived</option>
          </select>
        </div>
        <div className='field-group'>
          <label>Home page</label>
          <input type='text' />
        </div>
        <div className='btn-group'>
          <label />
          <button type='submit'> Save </button>
          <button onClick={this.props.goBackToDetails}> Back </button>
        </div>
      </form>

    )
  }
}

EditSpaceDetailsForm.propTypes = {
  goBackToDetails: PropTypes.func.isRequired
}
