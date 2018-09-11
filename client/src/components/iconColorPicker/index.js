import React, {Component} from 'react'
import Icon from './icon'
import defaultIcons from './defaultIcons'
import defaultColors from './defaultColors'
import PropTypes from 'prop-types'

import './iconColorPicker.css'

class IconColorPicker extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dropdownOpen: false,
      selectedIcon: '',
      selectedColor: ''
    }
    this.setWrapperRef = this.setWrapperRef.bind(this)
    this.toggleDropdown = this.toggleDropdown.bind(this)
    this.setSelectedIcon = this.setSelectedIcon.bind(this)
    this.setSelectedColour = this.setSelectedColour.bind(this)
    this.defaultState = this.state
  }
  setWrapperRef (node) {
    this.wrapperRef = node
  }

  toggleDropdown () {
    this.setState({ dropdownOpen: !this.state.dropdownOpen })
  }

  setSelectedIcon (icon) {
    this.setState({ selectedIcon: icon })
  }

  setSelectedColour (color) {
    this.setState({ selectedColor: color })
  }

  storeIconAndColour () {
    this.toggleDropdown()
  }

  LightenDarkenColor = (col, amt) => {
    var usePound = false
    if (col[0] === '#') {
      col = col.slice(1)
      usePound = true
    }
    var num = parseInt(col, 16)
    var r = (num >> 16) + amt
    if (r > 255) r = 255
    else if (r < 0) r = 0
    var b = ((num >> 8) & 0x00FF) + amt
    if (b > 255) b = 255
    else if (b < 0) b = 0
    var g = (num & 0x0000FF) + amt
    if (g > 255) g = 255
    else if (g < 0) g = 0
    return (usePound ? '#' : '') + String('000000' + (g | (b << 8) | (r << 16)).toString(16)).slice(-6)
  }

  render () {
    const componentIcons = defaultIcons
    const componentColors = defaultColors
    return (

      <div className={`dropdown icon-picker ${this.props.isShowColorPicker ? 'open' : ''}`} ref={this.setWrapperRef}>
        <ul className='dropdown-menu' id='dropdownUL' aria-labelledby='dropdownMenu1'>
          <ul className='icons pick-color'>
            {componentColors.map((color, index) => {
              return (
                <li key={index} onClick={() => this.props.setSelectedColor(color)}>
                  <span
                    className={`color border-radius ${this.props.selectedColor === color ? 'selected' : ''}`}
                    style={{
                      backgroundColor: color,
                      borderColor: this.LightenDarkenColor(color, -20),
                      borderWidth: '2px',
                      borderStyle: 'solid'
                    }}
                  />
                </li>
              )
            })}
          </ul>
          <div className='icons-btns'>
            <ul className='icons pick-icon'>
              {componentIcons.map((icon, index) => {
                return (
                  <li key={index} onClick={() => this.props.setSelectedIcon(icon)}>
                    <span className={`icon-wrapper ${this.props.selectedIcon === icon ? 'selected' : ''}`}>
                      <span className='icon'>
                        <Icon name={icon} />
                      </span>
                    </span>
                  </li>
                )
              })}
            </ul>
            <hr />
            <div className='btns-cancel-success'>
              <button type='button' className='btns btn-success' onClick={() => this.props.handleChangeSuccess()}>Save</button>
              <button type='button' className='btns btn-danger' onClick={() => this.props.handleChangeCancel()}>Cancel</button>
            </div>
          </div>
        </ul>
      </div>
    )
  }
}
IconColorPicker.propTypes = {
  isShowColorPicker: PropTypes.bool,
  setSelectedColor: PropTypes.func,
  setSelectedIcon: PropTypes.func,
  selectedIcon: PropTypes.string,
  selectedColor: PropTypes.string,
  handleChangeSuccess: PropTypes.func,
  handleChangeCancel: PropTypes.func
}
export default IconColorPicker
