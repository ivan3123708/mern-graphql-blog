import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { IconContext } from 'react-icons';
import Header from './partials/Header';
import Homepage from './pages/Homepage';

const client = new ApolloClient({
  url: 'http://localhost:4000/graphql'
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <IconContext.Provider value={{ size: "1.5em" }}>
        <div className="App">
          <Header />
          <Homepage />
        </div>
      </IconContext.Provider>
    </ApolloProvider>
  );
}

export default App;
