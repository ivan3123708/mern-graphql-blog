import ReactDOM from 'react-dom';

const Modal = (props) => {
  return ReactDOM.createPortal(props.children, document.getElementById('modal-root'));
}

export default Modal;
