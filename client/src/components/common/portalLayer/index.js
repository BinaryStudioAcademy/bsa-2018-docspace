import { createPortal } from 'react-dom'

const PortalLayer = (props) => {
  return createPortal(
    props.children,
    document.getElementById('root')
  )
}

export default PortalLayer
