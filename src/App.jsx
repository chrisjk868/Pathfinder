import React, { useRef, useState, useEffect } from 'react';
import Graph from './components/Graph';
import ConfigBar from './components/ConfigBar';
import logo from './logo.svg';
import './App.css';

function App() {

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
      const resizeObserver = new ResizeObserver((event) => {
          setWidth(event[0].contentBoxSize[0].inlineSize);
          setHeight(event[0].contentBoxSize[0].blockSize);
      });
      resizeObserver.observe(document.getElementById("graph-parent"));
      console.log('Graph Container:', height, width);
  }, []);


  return (
    <div className="App">
      <ConfigBar/>
      <div id='graph-parent'>
        <Graph width={width} height={height}/>
      </div>
    </div>
  );
}

export default App;
