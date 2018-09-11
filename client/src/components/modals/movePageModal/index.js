import React, {Component} from 'react'
import Modal from 'src/components/common/modal'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import './movePageModal.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { closeMovePageModal } from 'src/components/modals/movePageModal/logic/movePageModalActions'
import { movePageToSpaceRequest } from 'src/components/page/logic/pageActions'
import { allSpaces, spaceById } from 'src/components/space/spaceContainer/logic/spaceReducer'

class MovePageModal extends Component {
  state = {
    selectedSpaceId: null
  }

  handleMoveMethod = () => {
    const {pageId, fromSpaceId} = this.props
    const toSpaceId = this.state.selectedSpaceId
    if (this.state.selectedSpaceId) {
      this.props.movePageToSpace(pageId, fromSpaceId, toSpaceId)
      this.props.closeMovePageModal()
    }
  }

  handleSelectSpace = (spaceId) => {
    this.setState({
      selectedSpaceId: spaceId
    })
  }

  isConfirmAllowed = () => Boolean(this.state.selectedSpaceId)

  renderModalHeader = () => (
    <h2 className='movepage-header'>{this.props.t('Move_page')}</h2>
  )

  renderModalFooter = () => (
    <div className='modal-footer'>
      <button className='accept-button' onClick={this.handleMoveMethod} disabled={!this.isConfirmAllowed()}>
        {this.props.t('confirm')}
      </button>
      <button onClick={this.props.closeMovePageModal}>
        {this.props.t('cancel')}
      </button>
    </div>

  )

   renderModalContent = () => (
     <div className='movepage-body' >
       <div className='movepage-text'>
         <p>{this.props.t('specify_new_space')}</p>

       </div>
       <div className='movepage-choose-space'>
         <span>{this.props.t('choose_a_space')}</span>
         <select
           onChange={({target}) => this.handleSelectSpace(target.value)}
           defaultValue='none'
         >
           <option value='none' disabled hidden>{this.props.spaces.length < 2 ? this.props.t('no_spaces_to_move') : this.props.t('choose_here')}</option>
           {
             this.props.spaces.map(space => (
               space._id !== this.props.fromSpaceId &&
               <option value={space._id} key={space._id}>
                 {space.name}
               </option>
             ))
           })
         </select>
         <span>{`${this.props.t('current_space')}: ${this.props.currentSpaceName}`}</span>
       </div>
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
  spaces: PropTypes.array.isRequired,
  currentSpaceName: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return {
    showModal: state.movePageModal.showModal,
    pageId: state.movePageModal.pageId,
    fromSpaceId: state.movePageModal.fromSpaceId,
    toSpaceId: state.movePageModal.toSpaceId,
    spaces: allSpaces(state),
    currentSpaceName: spaceById(state).name
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    movePageToSpace: bindActionCreators(movePageToSpaceRequest, dispatch),
    closeMovePageModal: bindActionCreators(closeMovePageModal, dispatch)
  }
}

export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(MovePageModal))
