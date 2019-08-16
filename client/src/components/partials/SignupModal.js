import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { SIGNUP } from '../../queries/mutations';
import Modal from './Modal';
import { MdClose } from 'react-icons/md';

const SignupModal = ({ setShowModal, setToken }) => {
  const [signup, { loading, error }] = useMutation(SIGNUP);

  const signupUser = (e) => {
    e.preventDefault();

    const firstName = e.target.first_name.value;
    const lastName = e.target.last_name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    signup({
      variables: {
        data: {
          firstName,
          lastName,
          email,
          password
        }
      }
    }).then((res) => {
      const authToken = res.data.createUser.token;

      localStorage.setItem('authToken', authToken);

      setToken(authToken);
      setShowModal(false);
    });
  }

  return (
    <Modal>
      <div className="modal">
        <div className="modal__box">
          <div className="modal__box__container">
            <a onClick={() => setShowModal(false)}><MdClose /></a>
            <h1>Join Blog.</h1>
            <h2>Create an account to receive great stories in your inbox, personalize your homepage, and follow authors and topics that you love.</h2>
            <form onSubmit={signupUser}>
              <span className="error">{error && error.message.replace('GraphQL error: ', '')}</span>
              <input name="first_name" type="text" placeholder="First Name" required />
              <input name="last_name" type="text" placeholder="Last Name" required />
              <input name="email" type="email" placeholder="Email" required />
              <input name="password" type="password" placeholder="Password" required />
              <button className="btn-outline" disabled={loading}>Sign in</button>
            </form>
            <span>Already have an account? <a onClick={() => setShowModal('login')}>Sign in</a></span>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default SignupModal;
