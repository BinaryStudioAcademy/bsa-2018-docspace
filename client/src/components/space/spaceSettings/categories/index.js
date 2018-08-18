import React, { Component } from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'
import Input from 'src/components/common/input'
import { Link } from 'react-router-dom'

import './categoriesAddTab.css'

class CategoriesAddTab extends Component {
  state = {
    categoryName: '',
    hasCategory: false
  }

  handleChangeName = ({ target }) => {
    this.setState({categoryName: target.value})
  }

  hasCategory = (categoryName) => !this.props.space.categories.every((category) => category.name !== categoryName)

  handleCreateCategory = () => {
    const { categoryName } = this.state
    if (this.hasCategory(categoryName)) {
      return
    }
    this.props.createCategory({spaceId: this.props.space._id, categoryName})
  }

  handleDeleteCategory = ({ target }) => {
    const categoryToDelete = this.props.space.categories[Number(target.id)]
    console.log(categoryToDelete._id, this.props.space._id)
    this.props.deleteCategory(categoryToDelete._id, this.props.space._id)
  }

  isAllowedSubmit = () => !this.state.categoryName.length

  render () {
    const { categories } = this.props.space
    return (
      <div className='space-categories-edit'>
        <h2>{this.props.t('Categories')}</h2>
        <p className='categories-description'>
          {this.props.t('Categories_description')}
        </p>
        <div className='categories-labels-editor'>
          <span>Labels</span>
          <div className='categories-labels'>
            <ul>
              {categories
                ? categories.map((category, index) =>
                  <li key={index} className='category-label'>
                    <a href=''>{category.name}</a>
                    <span id={index} className='category-delete-btn' onClick={this.handleDeleteCategory}>
                      x
                    </span>
                  </li>)
                : null
              }
            </ul>
          </div>
        </div>
        <div className='categories-input'>
          <Input placeholder={this.props.t('Enter_category')} inputType='text' name='category-input' onChange={this.handleChangeName} value={this.state.categoryName} />
          <Input
            inputType='submit'
            disabled={this.isAllowedSubmit()}
            name='category-submit'
            onClick={this.handleCreateCategory}
            value='Add'
          />
          <Link to='' className='category-done-btn'>{this.props.t('Done')}</Link>
        </div>
      </div>
    )
  }
}

CategoriesAddTab.propTypes = {
  t: PropTypes.func.isRequired,
  createCategory: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func,
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

CategoriesAddTab.defaultProps = {
  space: {
    categories: []
  }
}

export default translate('translations')(CategoriesAddTab)
