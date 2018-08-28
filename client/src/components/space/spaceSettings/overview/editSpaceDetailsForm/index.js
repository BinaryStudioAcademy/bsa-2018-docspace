import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import Categories from './categories'
import './editSpaceDetailsForm.css'
import logo from 'src/resources/logo.png'

class EditSpaceDetailsForm extends Component {
  constructor (props) {
    super(props)
    const {space} = this.props
    this.state = {
      name: space.name,
      description: space.description,
      logo: space.logo,
      homePage: space.homePage,
      pages: space.pages
    }
    this.state = { ...space }
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

  handleSave = () => {
    // const space = {
    //   _id: this.props.space._id,
    //   name: this.state.name,
    //   description: this.state.description
    // }
    const changedSpace = { ...this.state, categories: this.props.space.categories }

    this.props.updateSpace(changedSpace)
    this.props.goBackToDetails()
  }

  render () {
    const { name, description, homePage, pages } = this.state
    const { t, createCategory, deleteCategory } = this.props
    const { categories, _id: spaceId } = this.props.space

    return (
      <form className='edit-space-details-form'>
        <div className='field-group avatar-field'>
          <label>{t('Space_logo')}</label>
          <img id='space-logo' className='field-value space-avatar' src={logo} alt='space-logo' />
           [<span className='link'>{t('change')}</span>]
        </div>

        <div className='field-group'>
          <label>{t('Name')}</label>
          <input
            type='text'
            name='name'
            defaultValue={name}
            onChange={({target}) => this.handleFieldChange(target)}
          />
        </div>

        <div className='field-group'>
          <label>{t('Description')}</label>
          <textarea
            type='text'
            name='description'
            defaultValue={description}
            onChange={({target}) => this.handleFieldChange(target)}
          />
        </div>
        <Categories
          categories={categories}
          createCategory={createCategory}
          deleteCategory={deleteCategory}
          spaceId={spaceId}
        />
        {/*
        <div className='field-group'>
          <label>{t('Home_page')}</label>
          <input
            type='text'
            name='homePage'
            defaultValue={homePage}
            onChange={({target}) => this.handleHomePageInput(target)}
          />
        </div> */}

        {/* TEMPORALY using select instead of input with  feiltered dropdown as ABOWE */}
        <div className='field-group'>
          <label>Home page</label>
          <select name='homePageId'
            onChange={({target}) => this.handleFieldChange(target)}
            defaultValue={homePage ? homePage._id : 'none'}
          >
            <option value='none' disabled hidden> None </option>
            {
              pages.map((page, index) => (
                <option value={page._id} key={index}>
                  {page.title}
                </option>
              ))
            }
          </select>
        </div>

        <div className='btn-group'>
          <label />
          <button className='save-btn' type='submit' onClick={this.handleSave}> {t('Save')} </button>
          <button className='delete-btn' onClick={this.props.goBackToDetails}> {t('Cancel')} </button>
        </div>
      </form>

    )
  }
}

EditSpaceDetailsForm.propTypes = {
  t: PropTypes.func.isRequired,
  goBackToDetails: PropTypes.func.isRequired,
  updateSpace: PropTypes.func.isRequired,
  createCategory: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  space: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    categories: PropTypes.array,
    logo: PropTypes.string,
    homePage: PropTypes.object,
    pages: PropTypes.arrayOf(PropTypes.object)
  })
}

EditSpaceDetailsForm.defaultProps = {
  space: {
    name: 'name',
    description: 'lore ipsum',
    categories: [],
    logo: '',
    pages: [{name: 'first page'}, {name: 'my home page'}]
  }
}

export default translate('translations')(EditSpaceDetailsForm)
