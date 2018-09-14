import React from 'react'
import PropTypes from 'prop-types'
import './templateList.css'

class TemplateList extends React.Component {
  handleDoubleClick (item) {
    this.props.handleDoubleClickOnItem && this.props.handleDoubleClickOnItem(item)
  }

  render () {
    const items = this.props.items
    return (
      <ul className='template-list'>
        {
          items.map((item, index) => {
            const isSelected = this.props.selectedItem === item
            return (
              <li
                className={`template${isSelected ? ' selected' : ''}`}
                key={index}
                onClick={() => this.props.handleSelectItem(item)}
                onDoubleClick={() => this.handleDoubleClick(item)}
              >
                <img className='template-preview' src={item.img} alt='template-preview' />
                <div className='template-meta'>
                  <div className='template-name'>
                    {item.label[0].toUpperCase() + item.label.slice(1)}
                  </div>
                  <div className='template-description'> {item.previewText} </div>
                </div>
              </li>
            )
          })
        }
      </ul>
    )
  }
}

TemplateList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    img: PropTypes.string
  })),

  selectedItem: PropTypes.object,
  handleSelectItem: PropTypes.func.isRequired,
  handleDoubleClickOnItem: PropTypes.func
}

export default TemplateList
