import React, { Component } from 'react'
import InviteUsers from './inviteUsers'
import Input from 'src/components/common/input'
import PeopleBody from 'src/components/dashboard/peopleBody'

export default class AdministrationUsers extends Component {
  constructor (props) {
    super(props)
    this.state = {
      nameField1: '',
      nameField2: '',
      nameField3: '',
      emailField1: '',
      emailField2: '',
      emailField3: '',
      filterValue: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }
  // renderTable = () => {
  //   return ''
  // }
  handleChange (target) {
    this.setState({
      [target.name]: target.value
    })
  }
  render () {
    return (
      <React.Fragment>
        <div>
          <h1>Invite new users</h1>
          <InviteUsers
            valueName={this.state.nameField1}
            valueEmail={this.state.emailField1}
            nameName='nameField1'
            nameEmail='emailField1'
            onChange={this.handleChange}
          />
          <InviteUsers
            valueName={this.state.nameField2}
            valueEmail={this.state.emailField2}
            nameName='nameField2'
            nameEmail='emailField2'
            onChange={this.handleChange}
          />
          <InviteUsers
            valueName={this.state.nameField3}
            valueEmail={this.state.emailField3}
            nameName='nameField3'
            nameEmail='emailField3'
            onChange={this.handleChange}
          />
        </div>
        <button>Invite users</button>
        <div className='admin-filter-container'>
          <Input label={'Name or email contains'}
            onChange={({target}) => this.handleChange(target)}
            value={this.state.filterValue}
            inputType='text'
            name='filterValue'
          />
        </div>
        <div className='people-list-container' >
          <PeopleBody />
          {/* <table>
            <thead>
              <tr>
                <th className='name'>Full name</th>
                <th className='tags' />
                <th className='email'>Email address</th>
                <th className='last-active'>Last active</th>
                <th className='admin-actions' />
              </tr>
            </thead>
            <tbody>
              {this.renderTable()}
            </tbody> */}
          {/* </table> */}
        </div>
      </React.Fragment>
    )
  }
}
