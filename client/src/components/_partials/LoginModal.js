import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN } from '../../queries/mutations';
import Modal from './Modal';
import { MdClose } from 'react-icons/md';

const LoginModal = ({ setShowModal }) => {
  const [login, { data, loading, error }] = useMutation(LOGIN);

  const loginUser = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    login({ variables: {
      data: {
        email,
        password
      }
    }});
  }

  return (
    <Modal>
      <div className="modal">
        <div className="modal__box">
          <div className="modal__box__container">
            <a onClick={() => setShowModal(false)}><MdClose/></a>
            <h1>Welcome back.</h1>
            <h2>Sign in to get personalized story recommendations, follow authors and topics you love, and interact with stories.</h2>
            <form onSubmit={loginUser}>
              <input name="email" type="email" placeholder="Email" />
              <input name="password" type="password" placeholder="Password" />
              <button className="btn-outline">Sign in</button>
            </form>
            <span>No account? <a onClick={() => setShowModal('signup')}>Create one</a></span>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default LoginModal;
