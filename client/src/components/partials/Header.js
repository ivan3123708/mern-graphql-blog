import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GET_USER } from '../../queries/queries';
import { UserContext, ModalContext } from '../../context';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

const Header = () => {
  const { data } = useQuery(GET_USER);
  const { setUser } = useContext(UserContext);
  const { showModal, setShowModal } = useContext(ModalContext);
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  useEffect(() => {
    setToken(localStorage.getItem('authToken'));
    setUser(data ? data.user : null);
  }, [token, data]);

  const logout = () => {
    localStorage.removeItem('authToken');

    setToken(null);
    setUser(null);
  }

  return (
    <header className="header">
      <div className="header__container">
        <span className="header__title">
          <Link to="/">BLOG</Link>
        </span>
        {token ?
          <div className="header__right">
            <a className="btn-outline" onClick={logout}>Logout</a>
          </div> :
          <div className="header__right">
            <a className="btn-outline" onClick={() => setShowModal('login')}>Sign In</a>
            <a className="btn-outline" onClick={() => setShowModal('signup')}>Get Started</a>
          </div>
        }
      </div>
      {showModal ?
        showModal === 'login' ?
          <LoginModal
            setShowModal={setShowModal}
            setToken={setToken}
            setUser={setUser}
          /> :
          <SignupModal
            setShowModal={setShowModal}
            setToken={setToken}
            setUser={setUser}
          /> :
        null
      }
    </header>
  );
}

export default Header;
