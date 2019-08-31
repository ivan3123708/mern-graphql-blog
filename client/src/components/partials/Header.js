import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  useEffect(() => {
    setToken(localStorage.getItem('authToken'));
  }, [token]);

  const logout = () => {
    localStorage.removeItem('authToken');

    setToken(null);
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
          /> :
          <SignupModal
            setShowModal={setShowModal}
            setToken={setToken}
          /> :
        null
      }
    </header>
  );
}

export default Header;
