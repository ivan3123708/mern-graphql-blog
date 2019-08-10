import { useEffect } from 'react';
import ReactDOM from 'react-dom';

const Modal = (props) => {
  const modalRoot = document.getElementById('modal-root');
  const el = document.createElement('div');

  useEffect(() => {
    modalRoot.appendChild(el);
  }, []);

  return ReactDOM.createPortal(props.children, modalRoot);
}

export default Modal;
