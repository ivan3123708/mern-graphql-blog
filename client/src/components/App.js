import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { IconContext } from 'react-icons';
import Header from './_partials/Header';

const client = new ApolloClient({
  url: 'http://localhost:4000/graphql'
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <IconContext.Provider value={{ size: "1.5em" }}>
        <div className="App">
          <Header />
        </div>
      </IconContext.Provider>
    </ApolloProvider>
  );
}

export default App;
