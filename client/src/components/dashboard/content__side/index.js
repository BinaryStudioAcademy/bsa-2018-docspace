import React, { Component } from 'react'
import Button from '../button'
import './content__side.css'
import welcome from './welcome.png';
class ContentSide extends Component {
  

  render () {
    return (
      <div className={'dashboard__content__side'} >
        <div className={'header'}>
        <Button
        content = {this.props.buttonName}/></div>
        <div className={'welcome'}>
        <h2>Welcome to Docspace</h2>
        <img src={welcome} alt=""/>
        <span>Docspace is where your team collaborates and shares knowledge — create, share and discuss your files, ideas, minutes, specs, mockups, diagrams, and projects.

Делитесь полезными ссылками, объявлениями и информацией здесь</span>
        </div>
      </div>
      
    )
  }
}


export default ContentSide;
