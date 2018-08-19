import React from 'react'
import PropTypes from 'prop-types'
import './templateList.css'

class TemplateList extends React.Component {
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
                onDoubleClick={() => this.props.handleSelectAndSendItem()}
              >
                <img className='template-preview' src={item.img} alt='template-preview' />
                <div className='template-meta'>
                  <div className='template-name'>
                    {item.name[0].toUpperCase() + item.name.slice(1)}
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
  handleSelectAndSendItem: PropTypes.func
}

export default TemplateList
