import React from 'react';
import MyName from './components/MyName';
import Ipsum from './components/Ipsum';

import './App.css';

function App() {
  return (
    <div className='App'>
      <MyName myName={'Kim'} favorites={['red', 'green', 'blue']}></MyName>
      <hr></hr>
      <Ipsum></Ipsum>
    </div>
  );
}

export default App;
