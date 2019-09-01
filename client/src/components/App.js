import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { UserContext, ModalContext } from '../context';
import Header from './partials/Header';
import Homepage from './pages/Homepage';
import Post from './pages/Post';

const client = new ApolloClient({
  url: 'http://localhost:4000/graphql',
  request: (operation) => {
    const token = localStorage.getItem('authToken');

    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    });
  }
});

const App = () => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <ApolloProvider client={client}>
      <IconContext.Provider value={{ size: '1.5em' }}>
        <UserContext.Provider value={{ user, setUser }}>
          <ModalContext.Provider value={{ showModal, setShowModal }}>
            <Router>
              <div className="App">
                <Header />
                <Route exact path="/" component={Homepage} />
                <Route path="/posts/:id" component={Post} />
              </div>
            </Router>
          </ModalContext.Provider>
        </UserContext.Provider>
      </IconContext.Provider>
    </ApolloProvider>
  );
}

export default App;
