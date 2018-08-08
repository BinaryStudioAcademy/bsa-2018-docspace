import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './editSpaceDetailsForm.css'

import img from 'src/resources/logo.svg'

export default class EditSpaceDetailsForm extends Component {
  constructor (props) {
    super(props)
    const {space} = this.props
    this.state = {
      name: space.name,
      description: space.description,
      categories: space.categories.join(' '),
      logo: space.logo,
      status: 'current',
      homePage: space.homePage
    }
  }

  handleFieldChange = (field) => {
    this.setState({
      [field.name]: field.value
    })
  }

  handleHomePageInput = (input) => {
    const pattern = new RegExp(input.value, 'i')
    const pages = this.props.space.pages
    const filtered = pages.filter((page) => pattern.test(page.name))
    console.log(filtered)
    // TODO : dropdown list with matched pages or warning, choosing page and set page.id to state
    // OR   : we can use select with all pages instead of input, it's gonna be better maybe
  }

  render () {
    const {name, description, categories, logo, status, homePage} = this.state

    return (
      <form className='edit-space-details-form'>
        <div className='field-group avatar-field'>
          <label>Space logo</label>
          <img id='space-logo' className='field-value space-avatar' src={logo} />
           [<span className='link'>change</span>]
        </div>

        <div className='field-group'>
          <label>Name</label>
          <input
            type='text'
            name='name'
            defaultValue={name}
            onChange={({target}) => this.handleFieldChange(target)}
          />
        </div>

        <div className='field-group'>
          <label>Description</label>
          <textarea
            type='text'
            name='description'
            defaultValue={description}
            onChange={({target}) => this.handleFieldChange(target)}
          />
        </div>

        <div className='field-group'>
          <label>Status</label>
          <select
            name='status'
            defaultValue={status}
            onChange={({target}) => this.handleFieldChange(target)}
          >
            <option value='current'>current</option>
            <option value='archived'>archived</option>
          </select>
        </div>

        <div className='field-group'>
          <label>Categories</label>
          <input
            type='text'
            name='categories'
            defaultValue={categories}
            onChange={({target}) => this.handleFieldChange(target)}
          />
        </div>

        <div className='field-group'>
          <label>Home page</label>
          <input
            type='text'
            name='homePage'
            defaultValue={homePage}
            onChange={({target}) => this.handleHomePageInput(target)}
          />
        </div>

        <div className='btn-group'>
          <label />
          <button type='submit'> Save </button>
          <button onClick={this.props.goBackToDetails}> Cancel </button>
        </div>
      </form>

    )
  }
}

EditSpaceDetailsForm.defaultProps = {
  space: {
    name: 'name',
    description: 'lore ipsum',
    categories: ['one', 'two', 'label'],
    logo: img,
    status: 'current',
    homePage: 'my home page',
    pages: [{name: 'first page'}, {name: 'my home page'}]
  }
}

EditSpaceDetailsForm.propTypes = {
  goBackToDetails: PropTypes.func.isRequired,
  space: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    categories: ['one', 'two', 'label'],
    logo: img,
    status: PropTypes.string,
    homePage: PropTypes.string,
    pages: PropTypes.arrayOf(PropTypes.object)
  })
}
