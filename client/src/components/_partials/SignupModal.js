import React from 'react';
import Modal from './Modal';
import { MdClose } from 'react-icons/md';

const SignupModal = ({ setShowModal }) => {
  return (
    <Modal>
      <div className="modal">
        <div className="modal__box">
          <div className="modal__box__container">
            <a onClick={() => setShowModal(false)}><MdClose /></a>
            <h1>Join Blog.</h1>
            <h2>Create an account to receive great stories in your inbox, personalize your homepage, and follow authors and topics that you love.</h2>
            <form>
              <input type="text" placeholder="First Name" />
              <input type="text" placeholder="Last Name" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button className="btn-outline">Sign in</button>
            </form>
            <span>Already have an account? <a onClick={() => setShowModal('login')}>Sign in</a></span>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default SignupModal;
