import React, { Component } from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'
import Input from 'src/components/common/input'

import './categories.css'

class Categories extends Component {
  state = {
    categoryName: '',
    hasCategory: false
  }

  handleChangeName = ({ target }) => {
    this.setState({categoryName: target.value})
  }

  hasCategory = (categoryName) => !this.props.categories.every((category) => category.name !== categoryName)

  handleCreateCategory = () => {
    const { categoryName } = this.state
    const categoryNameLowerCase = categoryName.toLocaleLowerCase()
    if (this.hasCategory(categoryNameLowerCase)) {
      return
    }
    this.props.createCategory({spaceId: this.props.spaceId, categoryName: categoryNameLowerCase})
    this.setState({categoryName: ''})
  }

  handleDeleteCategory = ({ target }) => {
    const categoryToDelete = this.props.categories[Number(target.id)]
    this.props.deleteCategory(categoryToDelete._id, this.props.spaceId)
  }

  isAllowedSubmit = () => !this.state.categoryName.length

  render () {
    const { categories, t } = this.props
    return (
      <React.Fragment>
        <div className='categories-labels-editor'>
          <div className='categories-labels'>
            <ul>
              {categories
                ? categories.map((category, index) =>
                  <li key={index} className='category-label'>
                    <a href=''>{category.name}</a>
                    <span className='category-delete-btn' onClick={this.handleDeleteCategory}>
                      <i id={index} className='fas fa-times' />
                    </span>
                  </li>)
                : null
              }
            </ul>
          </div>
        </div>
        <div className='field-group'>
          <label>Categories</label>
          <Input placeholder={this.props.t('Enter_category')} inputType='text' name='category-input' onChange={this.handleChangeName} value={this.state.categoryName} />
          <button type='submit' className='add-btn' disabled={this.isAllowedSubmit()} onClick={this.handleCreateCategory}>{t('Add')}</button>
        </div>
      </React.Fragment>
    )
  }
}

Categories.propTypes = {
  t: PropTypes.func.isRequired,
  createCategory: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  categories: PropTypes.array,
  spaceId: PropTypes.string
}

Categories.defaultProps = {
  space: {
    categories: []
  }
}

export default translate('translations')(Categories)
