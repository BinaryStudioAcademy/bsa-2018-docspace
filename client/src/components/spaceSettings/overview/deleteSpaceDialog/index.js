import React from 'react'
import PropTypes from 'prop-types'
import './deleteSpaceDialog.css'

const DeleteSpaceDialog = (props) => (
  <React.Fragment>
    <p>
        Deleting the space will delete all of its contents
        (including pages, comments, attachments and blog entries)
    </p>
    <div className='warning-message'>

      <p className='title'>
          WARNING
      </p>
      <p>
          This action <strong> can not be undone. </strong>
          After removal, the space can not be called. It will be permanently deleted.
      </p>
    </div>
    <div className='btn-group'>
      <button type='submit'> Delete </button>
      <button onClick={props.goBackToDetails}> Cancel </button>
    </div>
  </React.Fragment>
)

DeleteSpaceDialog.propTypes = {
  goBackToDetails: PropTypes.func.isRequired
}

export default DeleteSpaceDialog
