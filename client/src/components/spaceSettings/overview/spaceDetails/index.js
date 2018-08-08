import React, { Component } from 'react'
import './spaceDetails.css'

import img from 'src/resources/logo.svg'

export default class SpaceDetails extends Component {
  render () {
    return (
      <table className='space-details-table'>
        <tbody>
          <tr>
            <td className='avatar-label-cell'>Space logo</td>
            <td className='avatar-cell'>
              <img id='space-logo' className='field-value space-avatar' src={img} />
            </td>
          </tr>
          <tr>
            <td>Name</td>
            <td>name</td>
          </tr>
          <tr>
            <td>Key</td>
            <td>DOC</td>
          </tr>
          <tr>
            <td>Home page</td>
            <td>

              <span className='link'>
                <i className='fas fa-home' />
                    my home page
              </span>
            </td>
          </tr>
          <tr>
            <td>Created by</td>
            <td> <span className='link'>Danil </span></td>
          </tr>
          <tr>
            <td>Categories</td>
            <td />
          </tr>
          <tr>
            <td>Description</td>
            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed iaculis ex, eu ornare ligula. Nunc pulvinar eget libero sit amet eleifend. Curabitur laoreet enim quis consequat lacinia. Integer tincidunt aliquet turpis, at imperdiet odio ultricies ut. Vestibulum nec rhoncus velit. Quisque quis odio at sapien tincidunt fringilla et eget sapien. Mauris nec nulla nisl. Donec bibendum, urna vitae tempor accumsan, odio libero dignissim eros, eu rhoncus neque nisi in metus. Aliquam eu neque posuere, varius risus in, sollicitudin lectus. Praesent vel placerat justo.</td>
          </tr>
          <tr>
            <td>Administrators</td>
            <td>
              <span className='link'> Danil </span>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}
