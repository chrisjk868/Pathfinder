import React, { useRef, useEffect, useState } from 'react';
import './styles/Graph.css';
import Cell from './Cell';
import BFS from '../utils/BFS.js';
import generateMaze from '../utils/DFSMaze.js';

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
			console.log('Graph.js: Running BFS...');
			props.setBtnStates(JSON.stringify({'gen-maze': true, 'search-algo': true, 'reset-board': true}));
			const path = await BFS(nodes, start, end);
			props.setBtnStates(JSON.stringify({'gen-maze': false, 'search-algo': false, 'reset-board': false}));
			console.log('Graph.js: Returned path is:', path);
			setDisableCells((disableCells) => {
				return !disableCells;
			});
		}
	};

	const startDFS = async () => {

	}

	const startDijkstra = async () => {

	}

	const startAstar = async () => {

	}

	useEffect(() => {
		console.log('Graph.js, props.run:', `props.run: ${props.run} | props.reset: ${props.reset}`);
		try {
			if (props.pfAlgo === 'BFS') {
				startBFS(); 
			} else if (props.pfAlgo === 'DFS') {
				startDFS();
			} else if (props.pfAlgo === 'Dijkstra\'s') {
				startDijkstra();
			} else if (props.pfAlgo === 'A*') {
				startAstar();
			} else {
				
			}
		} catch (error) {
			console.error();
		}
		// console.log(nodesRef.current);
	}, [props.run]);

	// Hook that runs when Generate Maze is clicked
	useEffect(() => {
		console.log('Graph.js: props.generate:', props.generate);
		const genMaze = async () => {
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
				props.setBtnStates(JSON.stringify({'gen-maze': true, 'search-algo': true, 'reset-board': true}));
				const walls = await generateMaze(nodes, start, end);
				props.setBtnStates(JSON.stringify({'gen-maze': false, 'search-algo': false, 'reset-board': false}));
				console.log('Graph.js: Nodes with walls...', walls);
				setNodes([...walls]);
				setDisableCells((disableCells) => {
					return !disableCells;
				});
			} else {
				console.log('Graph.js: Start or End isn\'t added yet');
			}
		};
		try {
			genMaze();
		} catch (error) {
			console.error();
		}
	}, [props.generate])

	console.log('Graph.js: On render and state/props change [nodes]:', nodes, `[props.reset]: ${props.reset}`);

    // Recieving data from child cell
    const handleCick = (coords) => {
		let newNodes = [...nodes];
		const {x: x, y: y} = coords;
        console.log('Graph.js: Clicked coordinates from graph \n', coords);


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
			} else {
				newNodes[y][x].backgroundColor = '#00008B';
				newNodes[y][x].isWall = true;
			}

		}

        setNodes(newNodes);
    }

	const dragToFill = (coords) => {
		console.log('Graph.js: Drag to fill ran \n', coords);
		let newNodes = [...nodes];
		const {x: x, y: y} = coords;
		if (isMouseDown) {
			newNodes[y][x]['backgroundColor'] = '#00008B';
			newNodes[y][x]['isWall'] = true;
			console.log('mouse down over:', x, y);
		}
		setNodes(newNodes);
	}
    
    return (
        <div className='graph' onMouseDown={() => {setIsMouseDown(true)}} onMouseUp={() => {setIsMouseDown(false)}} onMouseLeave={() => {setIsMouseDown(false)}}>
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
												  disabled={disableCells}
                                                  handleClick={handleCick}
												  dragToFill={dragToFill}
                                                  backgroundColor={nodes[rowIdx][colIdx]['backgroundColor']}
												  addWalls={addedStart && addedEnd}
                                                  key={[colIdx, rowIdx]}
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