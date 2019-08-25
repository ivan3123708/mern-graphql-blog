import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { IconContext } from 'react-icons';
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
  return (
    <ApolloProvider client={client}>
      <IconContext.Provider value={{ size: "1.5em" }}>
        <Router>
          <div className="App">
            <Header />
            <Route exact path="/" component={Homepage} />
            <Route path="/posts/:id" component={Post} />
          </div>
        </Router>
      </IconContext.Provider>
    </ApolloProvider>
  );
}

export default App;
