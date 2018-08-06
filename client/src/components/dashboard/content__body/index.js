import React, { Component } from 'react'


import './content__body.css'


class MenuList extends Component {
  state = {
    active: ""
  }
  handleClick = (number) => {
    this.setState({active:number})
  }

  render(){
 
  const menuTabs = this.props.menuTabs;
  
  const listItems = menuTabs.map((number) => {
    const className = number === this.state.active ? "active": "";
    return <li className = {"menuTab"} onClick={() => this.handleClick(number)} key={number}>
      <a className = {className} >{number}</a>
    </li>
  }
  );

  return (
    listItems
  );
}
}  
  
class ContentBody extends Component {
  
  constructor(props) {
    super(props);
    this.menuTabs = this.props.menuTabs

  }
  
  
  render () {
    return (
      <div className={'dashboard__content__body'} >
      
        <div className={'header'}>
          <h1>{this.props.header}</h1>
        
        <div>
          <ul id="menu">
            <MenuList menuTabs={this.props.menuTabs} />
            
          </ul>
        </div>
        </div>
        
      </div>
    )
  }

}






export default ContentBody;
