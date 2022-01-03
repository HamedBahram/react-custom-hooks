import ReactDOM from 'react-dom'
import './Modal.css'

const Modal = ({ onClose = f => f, children }) => {
    return ReactDOM.createPortal(
        <>
            <div className='backdrop' onClick={onClose}></div>
            <div className='modal'>{children}</div>
        </>,
        document.getElementById('modal')
    )
}

export default Modal
