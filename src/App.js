import React from 'react';
import Graph from './components/Graph';
import ConfigBar from './components/ConfigBar';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <ConfigBar/>
      <Graph/>
    </div>
  );
}

export default App;
