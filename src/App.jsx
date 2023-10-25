import React, { useState, useEffect } from 'react';
import Graph from './components/Graph';
import ConfigBar from './components/ConfigBar';
import './App.css';

function App() {

	const [width, setWidth] = useState(window.innerWidth);
	const [height, setHeight] = useState(window.innerHeight);
	const [run, setRun] = useState(false);
	const [reset, setReset] = useState(false);
	const [generate, setGenerate] = useState(false);
	const [btnStates, setButtonStates] = useState({'gen-maze': false, 'search-algo': false, 'reset-board': false});

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
		console.log('App.js: clearBoard()');
		setReset(!reset);
		console.log('App.js: Changed props.reset');
	}

	const generateMaze = () => {
		console.log('App.js: generateMaze()');
		setGenerate(!generate);
		console.log('App.js: Changed props.generate');
	}

	const setBtnStates = (states) => {
		console.log('App.js: setBtnStates() Setting button states')
		setButtonStates(states);
		console.log('App.js: Changed btnStates')
	}

	return (
		<div className="App">
			<ConfigBar runBfs={runBfs} clearBoard={clearBoard} generateMaze={generateMaze} btnStates={btnStates}/>
			<div id='graph-parent'>
				<Graph width={width} height={height} run={run} reset={reset} generate={generate} setBtnStates={setBtnStates}/>
			</div>
		</div>
	);
}

export default App;
