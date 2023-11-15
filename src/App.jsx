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

	const [btnStates, setButtonStates] = useState(JSON.stringify({'gen-maze': false,
																  'search-algo': false,
																  'add-weak-walls': false,
																  'add-bombs': false,
																  'reset-board': false}));

	const [toggleStates, setToggleStates] = useState(JSON.stringify({'add-weak-walls': false,
																	 'add-bombs': false}));

	const [mazeAlgo, setMazeAlgo] = useState('* Select Maze Generation Algorithm');
    const [pfAlgo, setPfAlgo] = useState('* Select Path Finding Algorithm');

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

	console.log('App.js: App rendered');

	const runPfAlgo = () => {
		console.log('App.js: runPfAlgo()');
		setRun((run) => !run);
		setToggleStates(JSON.stringify({'add-weak-walls': false,
						 		   		'add-bombs': false}));
		console.log('App.js: Changed props.run');
	}

	const clearBoard = () => {
		console.log('App.js: clearBoard()');
		setReset((reset) => !reset);
		setToggleStates(JSON.stringify({'add-weak-walls': false,
						 		   		'add-bombs': false}));
		console.log('App.js: Changed props.reset');
	}

	const generateMaze = () => {
		console.log('App.js: generateMaze()');
		setGenerate((generate) => !generate);
		console.log('App.js: Changed props.generate');
	}

	const setBtnStates = (states) => {
		console.log('App.js: setBtnStates() Setting button states')
		setButtonStates(states);
		console.log('App.js: Changed btnStates')
	}

	const handleSelect = (_eventKey, event) => {
        console.log(event.target.className);
        event.preventDefault();
        let target = event.target.className;
        if (target === 'mazeAlgo dropdown-item') {
            setMazeAlgo(event.target.text);
        } else {
            setPfAlgo(event.target.text);
        }
    }

	const handleWallClick = (e) => {
		let prevStates = JSON.parse(toggleStates);
        e.preventDefault();
        setToggleStates(JSON.stringify({'add-weak-walls': !prevStates['add-weak-walls'],
						 		   		'add-bombs': false}));
    }

    const handleBombClick = (e) => {
		let prevStates = JSON.parse(toggleStates);
        e.preventDefault();
        setToggleStates(JSON.stringify({'add-weak-walls': false,
						 				'add-bombs': !prevStates['add-bombs']}));
    }

	return (
		<div className="App">
			<ConfigBar
				runPfAlgo={runPfAlgo}
				clearBoard={clearBoard}
				generateMaze={generateMaze}
				btnStates={btnStates}
				toggleStates={toggleStates}
				handleSelect={handleSelect}
				handleWallClick={handleWallClick}
				handleBombClick={handleBombClick}
				mazeAlgo={mazeAlgo}
				pfAlgo={pfAlgo}
			/>
			<div id='graph-parent'>
				<Graph
					width={width}
					height={height}
					run={run}
					reset={reset}
					generate={generate}
					setBtnStates={setBtnStates}
					toggleStates={toggleStates}
					mazeAlgo={mazeAlgo}
					pfAlgo={pfAlgo}
				/>
			</div>
		</div>
	);
}

export default App;
