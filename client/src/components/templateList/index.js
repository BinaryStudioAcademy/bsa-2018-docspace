import React from 'react'
import PropTypes from 'prop-types'
import './templateList.css'

const TemplateList = (props) => {
  const items = props.items
  return (
    <ul className='template-list'>
      {
        items.map((item, index) => {
          return (
            <li className='template' key={index}>
              <img className='template-preview' src={item.img} />
              <div className='template-meta'>
                <div className='template-name'> {item.name} </div>
                <div className='template-description'> {item.description} </div>
              </div>
            </li>
          )
        })
      }
    </ul>
  )
}

TemplateList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    img: PropTypes.string
  }))
}

export default TemplateList
