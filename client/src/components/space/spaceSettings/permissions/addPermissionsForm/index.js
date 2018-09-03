import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './addPermissionsForm.css'

export default class AddPermissionsForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      input: '',
      searchedEntities: [ { name: 'lol' }, {name: 'ha-ha'} ],
      selectedEntity: null,
      showSelectEntityList: false
    }
  }

  handleSelectEntity = (entity) => {
    this.setState({
      selectedEntity: entity
    })
  }

  handleInput = (input) => {
    const toSearch = input.value.trim()
    this.setState({
      input: toSearch
    })

    if (toSearch.length > 1) {
      this.setState({
        showSelectEntityList: true
      })
    }

    if (!toSearch.length) {
      this.setState({
        showSelectEntityList: false
      })
    }
  }

  render () {
    const { searchPlaceholder, renderSearchedEntityLiContent } = this.props
    const { searchedEntities, selectedEntity, showSelectEntityList } = this.state
    return (
      <form
        className='add-permissions-form'
      >
        <div className='field-group'>
          <input
            type='text'
            onInput={({target}) => this.handleInput(target)}
            placeholder={searchPlaceholder}
          />
          <button>
              Add
          </button>
        </div>

        {
          showSelectEntityList && !!searchedEntities.length &&
          <ul className='select-searched-entities-list'>
            {
              searchedEntities.map((entity) => (
                <li onClick={() => this.handleSelectEntity(entity)} className={entity === selectedEntity ? 'selected' : ''}>
                  { renderSearchedEntityLiContent(entity) }
                </li>
              ))
            }
          </ul>
        }

      </form>
    )
  }
}

AddPermissionsForm.propTypes = {
  renderSearchedEntityLiContent: PropTypes.func,
  searchPlaceholder: PropTypes.string
}
