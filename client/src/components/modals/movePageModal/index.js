import React, {Component} from 'react'
import Modal from 'src/components/common/modal'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import './movePageModal.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { closeMovePageModal } from 'src/components/modals/movePageModal/logic/movePageModalActions'
import { movePageToSpaceRequest } from 'src/components/page/logic/pageActions'
import { allSpaces } from 'src/components/space/spaceContainer/logic/spaceReducer'

class MovePageModal extends Component {
  state = {
    selectedSpace: null
  }

  handleMoveMethod = () => {
    const {pageId, fromSpaceId} = this.props
    const toSpaceId = this.state.selectedSpace._id
    if (this.state.selectedSpace) {
      this.props.movePageToSpace(pageId, fromSpaceId, toSpaceId)
      this.props.closeMovePageModal()
    }
  }

  handleSelectSpace = (space) => {
    this.setState({
      selectedSpace: space
    })
  }

  renderModalHeader = () => (
    <h1 className='warning-header'>{this.props.t('Move_page')}</h1>
  )

  renderModalFooter = () => (
    <div className='modal-footer'>
      <button className='accept-button' onClick={this.handleMoveMethod}>
        {this.props.t('confirm')}
      </button>
      <button onClick={this.props.closeMovePageModal}>
        {this.props.t('cancel')}
      </button>
    </div>

  )

   renderModalContent = () => (
     <div className='movepage-text' >
       <p> SOME TEXT </p>
       <select
         onChange={({target}) => this.handleSelectSpace(target.value)}
         defaultValue='none'
       >
         <option value='none' disabled hidden>{this.props.t('choose_here')}</option>
         {
           this.props.spaces.map((space, index) => (
             <option value={JSON.stringify(space)} key={index}>
               {space.name}
             </option>
           ))
         }
       </select>
     </div>

   )

   render () {
     return (
       <Modal
         renderHeader={this.renderModalHeader}
         renderFooter={this.renderModalFooter}
         renderContent={this.renderModalContent}
         closeModal={this.props.closeMovePageModal}
         minHeight='auto'
       />
     )
   }
}

MovePageModal.propTypes = {
  t: PropTypes.func.isRequired,
  closeMovePageModal: PropTypes.func.isRequired,
  movePageToSpace: PropTypes.func.isRequired,
  pageId: PropTypes.string.isRequired,
  fromSpaceId: PropTypes.string.isRequired,
  spaces: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  return {
    showModal: state.movePageModal.showModal,
    pageId: state.movePageModal.pageId,
    fromSpaceId: state.movePageModal.fromSpaceId,
    toSpaceId: state.movePageModal.toSpaceId,
    spaces: allSpaces(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    movePageToSpace: bindActionCreators(movePageToSpaceRequest, dispatch),
    closeMovePageModal: bindActionCreators(closeMovePageModal, dispatch)
  }
}

export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(MovePageModal))
