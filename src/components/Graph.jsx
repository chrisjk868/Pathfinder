import React, { useRef, useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import Cell from './Cell';
import BFS from '../utils/BFS.js';
import generateMaze from '../utils/DFSMaze.js';
import './styles/Graph.css';


function computeNodes(ROWS, COLS) {
    return (
        Array( ROWS )
            .fill()
            .map((_row, rowIdx) =>
								Array( COLS )
									.fill()
									.map((_col, colIdx) => ({
										x: colIdx,
										y: rowIdx,
										isStart: false,
										isEnd: false,
										isWall: false,
										isWeakWall: false,
										isBomb: false,
										backgroundColor: ''
									 })
									)
            )
    );
}

function Graph(props) {

	const nodesRef = useRef([]);
    const [ROWS, COLS] = [ Math.floor(props.height / 20), Math.floor(props.width / 65) ];
    const [nodes, setNodes] = useState([]);
	const [disableCells, setDisableCells] = useState(false);
    const [addedStart, setAddedStart] = useState(false);
    const [addedEnd, setAddedEnd] = useState(false);
	const [isMouseDown, setIsMouseDown] = useState(false);
	const [start, setStart] = useState(null);
	const [end, setEnd] = useState(null);
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');

	// Hook that checks when the component just mounted
	let justMounted;
	React.useEffect(() => { justMounted = true; }, []);

    // Hook that rerenders the board if the size of window changes or clear board is pressed
    useEffect(() => {
		console.log('Graph.js: Board reset ran');
		const cells = document.getElementsByClassName('cell');
		for (let i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = '';
			cells[i].classList.remove('animate', 'pop', 'animate1', 'pop1');
		}
        setNodes(computeNodes(ROWS, COLS));
		setAddedStart(false);
		setAddedEnd(false);
		setStart(null);
		setEnd(null);
    }, [props.width, props.height, props.reset]);

	// Hook that runs when Run BFS button is clicked
	// Run BFS with pre-existing graph data
	// Run the selected pathfinding algorithm
	const startBFS = async () => {
		if (addedStart && addedEnd) {
			// Disable all event listeners here for click in Cells
			// Disable all buttons and user interactions when algo is running
			setDisableCells(!disableCells);
			console.log('Graph.js: Running BFS ...');
			props.setBtnStates(JSON.stringify({'gen-maze': true, 'search-algo': true, 'add-weak-walls': true, 'add-bombs': true, 'reset-board': true}));
			const path = await BFS(nodes, start, end);
			props.setBtnStates(JSON.stringify({'gen-maze': false, 'search-algo': false, 'add-weak-walls': false, 'add-bombs': false, 'reset-board': false}));
			console.log('Graph.js: Returned path is:', path);
			setDisableCells((disableCells) => {
				return !disableCells;
			});
		}
	};

	const startDFS = async () => {
		if (addedStart && addedEnd) {
			console.log('Graph.js: Running DFS ...')
		}
	}

	const startDijkstra = async () => {
		if (addedStart && addedEnd) {
			console.log('Graph.js: Running Dijkstra\'s ...')
		}
	}

	const startAstar = async () => {
		if (addedStart && addedEnd) {
			console.log('Graph.js: Running A* ...')
		}
	}

	useEffect(() => {
		console.log('Graph.js, props.run:', `props.run: ${props.run} | props.reset: ${props.reset}`);
		if (!justMounted) {
			try {
				if (props.pfAlgo === 'BFS') {
					startBFS();
					setShowAlert(false);
				} else if (props.pfAlgo === 'DFS') {
					startDFS();
					setShowAlert(false);
				} else if (props.pfAlgo === 'Dijkstra\'s') {
					startDijkstra();
					setShowAlert(false);
				} else if (props.pfAlgo === 'A*') {
					startAstar();
					setShowAlert(false);
				} else {
					setAlertMessage('Please select a path finding algorithm');
					setShowAlert(true);
				}
			} catch (error) {
				console.error();
			}
		}
	}, [props.run]);

	const genMazeDFS = async () => {
		if (addedStart && addedEnd) {
			console.log('Graph.js: Nodes before maze generation [nodes]:', nodes);
			setDisableCells(!disableCells);
			const cells = document.getElementsByClassName('cell');
			for (let i = 0; i < cells.length; i++) {
				const [row, col] = (cells[i].id).split('-');
				if (!nodes[row][col].isStart && !nodes[row][col].isEnd && !nodes[row][col].isWall) {
					cells[i].style.backgroundColor = '';
					cells[i].classList.remove('animate', 'pop', 'animate1', 'pop1');
				}
			}
			console.log('Graph.js: Generating Maze...');
			props.setBtnStates(JSON.stringify({'gen-maze': true, 'search-algo': true, 'add-weak-walls': true, 'add-bombs': true,'reset-board': true}));
			const walls = await generateMaze(nodes, start, end);
			props.setBtnStates(JSON.stringify({'gen-maze': false, 'search-algo': false, 'add-weak-walls': false, 'add-bombs': false, 'reset-board': false}));
			console.log('Graph.js: Nodes with walls...', walls);
			setNodes([...walls]);
			setDisableCells((disableCells) => {
				return !disableCells;
			});
		} else {
			console.log('Graph.js: Start or End isn\'t added yet');
		}
	};

	const genMazeMST = async () => {
		console.log('Graph.js: Running MST ...');
	}

	// Hook that runs when Generate Maze is clicked
	useEffect(() => {
		console.log('Graph.js: props.generate:', props.generate);
		if (!justMounted) {
			try {
				if (props.mazeAlgo === 'Randomized DFS') {
					genMazeDFS();
					setShowAlert(false);
				} else if (props.mazeAlgo === 'MST') {
					genMazeMST();
					setShowAlert(false);
				} else {
					setAlertMessage('Please select a maze generation algorithm');
					setShowAlert(true);
				}
			} catch (error) {
				console.error();
			}
		}
	}, [props.generate])

	console.log('Graph.js: On render and state/props change [nodes]:', nodes, `[props.reset]: ${props.reset}`);

    // Recieving data from child cell
    const handleCick = (coords) => {
		let newNodes = [...nodes];
		let tglStates = JSON.parse(props.toggleStates);
		const {x: x, y: y} = coords;

        console.log('Graph.js: Clicked coordinates from graph \n', coords);
		
		if (tglStates['add-weak-walls'] || tglStates['add-bombs']) {
			if (!addedStart || !addedEnd) {
				setShowAlert(true);
				setAlertMessage('Please add a start and end point');
			} else {
				if (tglStates['add-weak-walls']) {
					newNodes[y][x].isWeakWall = true;
				} else if (tglStates['add-bombs']) {
					newNodes[y][x].isBomb = true;
				}
			}
		} else {
			if (!newNodes[y][x].isStart && !newNodes[y][x].isEnd) {
				if (!addedStart) {
					newNodes[y][x].backgroundColor = 'green';
					newNodes[y][x].isStart = true;
					setAddedStart(true);
					setStart(newNodes[y][x]);
				} else if (!addedEnd) {
					newNodes[y][x].backgroundColor = 'red';
					newNodes[y][x].isEnd = true;
					setAddedEnd(true);
					setEnd(newNodes[y][x]);
					if (showAlert) {
						setShowAlert(false);
					}
				} else {
					newNodes[y][x].backgroundColor = '#00008B';
					newNodes[y][x].isWall = true;
				}
			}
		}

		setNodes(newNodes);

    }

	const dragToFill = (coords) => {
		console.log('Graph.js: Drag to fill ran \n', coords);
		let newNodes = [...nodes];
		let states = JSON.parse(props.toggleStates); 
		const {x: x, y: y} = coords;
		if (isMouseDown && !states['add-weak-walls'] && !states['add-bombs'] && !nodes[y][x]['isStart'] && !nodes[y][x]['isEnd']) {
			newNodes[y][x]['backgroundColor'] = '#00008B';
			newNodes[y][x]['isWall'] = true;
			console.log('mouse down over:', x, y);
		}
		setNodes(newNodes);
	}
    
    return (
        <div className='graph' onMouseDown={() => {setIsMouseDown(true)}} onMouseUp={() => {setIsMouseDown(false)}} onMouseLeave={() => {setIsMouseDown(false)}}>
			<Alert show={showAlert}
				   style={{ marginLeft: '25vw', marginRight: '25vw' }}
				   variant='danger' id='path-finding-error'>
					{alertMessage}
			</Alert>
            {nodes.map((row, rowIdx) => {
                let rowId = `row-${rowIdx}`;
                return (
                    <div id={rowId} key={rowIdx} ref={(el) => {nodesRef.current[rowIdx] = el;}}>
                        {
                            row.map((_col, colIdx) => {
                                let cellId = String(rowIdx).concat('-', (colIdx));
                                let cell = (<Cell id={cellId}
												  row={rowIdx}
                                                  col={colIdx}
												  key={[colIdx, rowIdx]}
												  disabled={disableCells}
                                                  handleClick={handleCick}
												  dragToFill={dragToFill}
                                                  backgroundColor={nodes[rowIdx][colIdx]['backgroundColor']}
												  addWalls={addedStart && addedEnd}
												  isStart={nodes[rowIdx][colIdx]['isStart']}
												  isEnd={nodes[rowIdx][colIdx]['isEnd']}
												  isWall={nodes[rowIdx][colIdx]['isWall']}
												  isWeakWall={nodes[rowIdx][colIdx]['isWeakWall']}
												  isBomb={nodes[rowIdx][colIdx]['isBomb']}
                                            />);
                                return cell;
                            })
                        }
                    </div>
                );
            })}
        </div>
    )
}

export default Graph;