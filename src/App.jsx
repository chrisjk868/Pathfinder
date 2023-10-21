import React, { useRef, useState, useEffect } from 'react';
import Graph from './components/Graph';
import ConfigBar from './components/ConfigBar';
import logo from './logo.svg';
import './App.css';

function App() {

	const [width, setWidth] = useState(window.innerWidth);
	const [height, setHeight] = useState(window.innerHeight);
	const [run, setRun] = useState(false);
	const [reset, setReset] = useState(false);
	const [generate, setGenerate] = useState(false);

	useEffect(() => {
		const resizeObserver = new ResizeObserver((event) => {
			// console.log(event[0].contentBoxSize[0].inlineSize, event[0].contentBoxSize[0].blockSize)
			let [ deltaX, deltaY ] = [width - event[0].contentBoxSize[0].inlineSize, height - event[0].contentBoxSize[0].blockSize];
			setWidth(event[0].contentBoxSize[0].inlineSize);
			setHeight(event[0].contentBoxSize[0].blockSize);
		});
		resizeObserver.observe(document.getElementById("graph-parent"));
		// console.log('Graph Container', width, height);
	}, [width, height]);

	const runBfs = () => {
		console.log('App.js: runBfs()');
		setRun(!run);
		console.log('App.js: Changed props.run');
	}

	const clearBoard = () => {
		setReset(!reset);
	}

	const generateMaze = () => {
		setGenerate(!generate);
	}

	return (
		<div className="App">
			<ConfigBar runBfs={runBfs} clearBoard={clearBoard} generateMaze={generateMaze}/>
			<div id='graph-parent'>
				<Graph width={width} height={height} run={run} reset={reset} generate={generate}/>
			</div>
		</div>
	);
}

export default App;
