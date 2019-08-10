import React, { useState } from 'react';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <header className="header">
      <div className="header__container">
        <span className="header__title">BLOG</span>
        <div className="header__right">
          <a className="btn-outline" onClick={() => setShowModal('login')}>Sign In</a>
          <a className="btn-outline" onClick={() => setShowModal('signup')}>Get Started</a>
        </div>
      </div>
      {showModal ? showModal === 'login' ? <LoginModal setShowModal={setShowModal} /> : <SignupModal setShowModal={setShowModal}/> : null}
    </header>
  );
}

export default Header;
