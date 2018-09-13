import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import Categories from './categories'
import './editSpaceDetailsForm.css'
import IconColorPicker from 'src/components/iconColorPicker'
import {lightColors} from 'src/components/iconColorPicker/defaultColors'
import Select from 'src/components/common/select'
class EditSpaceDetailsForm extends Component {
  constructor (props) {
    super(props)
    const {space} = this.props
    this.state = { ...space,
      isShowColorPicker: false,
      selectedIcon: space.spaceSettings ? space.spaceSettings.icon : '',
      selectedColor: space.spaceSettings ? space.spaceSettings.color : '',
      defaultColor: '',
      defaultIcon: ''
    }
  }

  setSelectedIcon = (icon) => {
    this.setState({ selectedIcon: icon })
  }

  setSelectedColor = (color) => {
    this.setState({ selectedColor: color })
  }

  handleFieldChange = (field) => {
    console.log(field)
    this.setState({
      [field.name]: field.value
    })
  }

  handleShowColorPicker = () => {
    this.setState({
      defaultColor: this.state.selectedColor ? this.state.selectedColor : '#1c80ff',
      defaultIcon: this.state.selectedIcon ? this.state.selectedIcon : 'folder',
      isShowColorPicker: true
    })
  }

  handleChangeSuccess = () => {
    this.setState({
      defaultColor: '',
      defaultIcon: '',
      isShowColorPicker: false
    })
  }

  handleChangeCancel = () => {
    this.setState({
      selectedIcon: this.state.defaultIcon,
      selectedColor: this.state.defaultColor,
      isShowColorPicker: false
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
    const changedSpace = {...this.state,
      categories: this.props.space.categories,
      spaceSettings: { icon: this.state.selectedIcon, color: this.state.selectedColor },
      ownerId: this.props.space.ownerId._id
    }

    this.props.updateSpace(changedSpace)
    this.props.goBackToDetails()
  }
  render () {
    const { name, description, homePage, pages } = this.state
    const { t, createCategory, deleteCategory } = this.props
    const { categories, _id: spaceId } = this.props.space
    const iconName = this.state.selectedIcon ? this.state.selectedIcon : 'folder'
    const color = this.state.selectedColor ? this.state.selectedColor : '#1c80ff'
    const iconColorIsWhite = lightColors.some(bgcolor => bgcolor === color)
    const optionsPages = pages.map(page => {
      return {
        value: page._id,
        showValue: page.title
      }
    })
    return (
      <form className='edit-space-details-form'>
        <div className='field-group avatar-field'>
          <label>{t('space_logo')}</label>
          <div className='space-edit-avatar space-editing-avatar' style={{backgroundColor: color, color: iconColorIsWhite ? 'grey' : 'white'}} onClick={this.handleShowColorPicker}>
            <span className='icon-avatar' >
              <i className={`fa fa-${iconName.toLowerCase()}`} />
            </span>
          </div>
        </div>
        <IconColorPicker
          isShowColorPicker={this.state.isShowColorPicker}
          setSelectedColor={this.setSelectedColor}
          setSelectedIcon={this.setSelectedIcon}
          selectedIcon={this.state.selectedIcon}
          selectedColor={this.state.selectedColor}
          handleChangeCancel={this.handleChangeCancel}
          handleChangeSuccess={this.handleChangeSuccess}
          t={t}
        />

        <div className='field-group'>
          <label>{t('name')}</label>
          <input
            type='text'
            name='name'
            defaultValue={name}
            onChange={({target}) => this.handleFieldChange(target)}
          />
        </div>

        <div className='field-group'>
          <label>{t('description')}</label>
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
          <label>{t('home_page')}</label>
          <input
            type='text'
            name='homePage'
            defaultValue={homePage}
            onChange={({target}) => this.handleHomePageInput(target)}
          />
        </div> */}

        {/* TEMPORALY using select instead of input with  feiltered dropdown as ABOWE */}
        <div className='field-group'>
          <label>{t('home_page')}</label>
          <Select
            selectValue={homePage ? homePage._id : 'none'}
            onChange={(e) => this.handleFieldChange(e.target.value)}
            options={optionsPages}
            noneOption
          />
        </div>

        <div className='btn-group'>
          <label />
          <button className='save-btn' type='submit' onClick={this.handleSave}> {t('save')} </button>
          <button className='delete-btn' onClick={this.props.goBackToDetails}> {t('cancel')} </button>
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
    ownerId: PropTypes.object,
    logo: PropTypes.string,
    homePage: PropTypes.object,
    pages: PropTypes.arrayOf(PropTypes.object)
  })
}

EditSpaceDetailsForm.defaultProps = {
  spaceSettings: {
    icon: '',
    color: ''
  },
  space: {
    name: 'name',
    description: 'lore ipsum',
    categories: [],
    logo: '',
    pages: [{name: 'first page'}, {name: 'my home page'}]
  }
}

export default translate('translations')(EditSpaceDetailsForm)
