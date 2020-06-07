import React from 'react';
import Header from './components/Header/Header';
import Homepage from './pages/Homepage/Homepage';
import './default.scss';

const App = () => {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <Homepage />
      </div>
    </div>
  );
}

export default App;
