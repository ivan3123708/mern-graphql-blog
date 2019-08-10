import React from 'react';
import { IconContext } from 'react-icons';
import Header from './_partials/Header';

const App = () => {
  return (
    <IconContext.Provider value={{ size: "1.5em" }}>
      <div className="App">
        <Header />
      </div>
    </IconContext.Provider>
  );
}

export default App;
