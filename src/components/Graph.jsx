import React, { useRef, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import './styles/Graph.css';
import Cell from './Cell';
import BFS from '../utils/BFS.js';
import generateMaze from '../utils/Maze';


function computeBoard(ROWS, COLS) {
	const graph = [];
	for (let row = 0; row < ROWS; row++) {
		graph.push([]);
		for (let col = 0; col < COLS; col++) {
			graph[row].push([]);
		}
	}
	return graph;
}

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
    const [ROWS, COLS] = [ Math.floor(props.height / 20), Math.floor(props.width / 35) ];
    const [nodes, setNodes] = useState([]);
    const [graph, setGraph] = useState([]);
    const [addedStart, setAddedStart] = useState(false);
    const [addedEnd, setAddedEnd] = useState(false);
	const [start, setStart] = useState(null);
	const [end, setEnd] = useState(null);

    // Hook that rerenders the board if the size of window changes or clear board is pressed
    useEffect(() => {
		const cells = document.getElementsByClassName('cell');
		for (let i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = '';
			cells[i].classList.remove('animate', 'pop', 'animate1', 'pop1');
		}
        setNodes(computeNodes(ROWS, COLS));
        setGraph(computeBoard(ROWS, COLS));
		setAddedStart(false);
		setAddedEnd(false);
		setStart(null);
		setEnd(null);
    }, [props.width, props.height, props.reset]);

	// Hook that runs when Run BFS button is clicked
	// Run BFS with pre-existing graph data
	useEffect(() => {
		console.log('Graph.js, props.run:', props.run);
		const startBFS = async () => {
			if (addedStart && addedEnd) {
				// Disable all event listeners here for click in Cells
				console.log('Graph.js: Running BFS...');
				const path = await BFS(nodes, start, end);
				console.log('Graph.js: Returned path is:', path);
			}
		};
		try {
			startBFS();
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
				console.log('Graph.js: Generating Maze...');
				const walls = await generateMaze(nodes, start, end);
				console.log('Graph.js: Nodes with walls...', walls);
				setNodes([...walls]);
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

	console.log('Graph.js: On render and state/props change [nodes]:', nodes);

    // Recieving data from child cell
    const handleCick = (coords) => {
		let newNodes = [...nodes];
		const {x: x, y: y} = coords;
		// console.log(nodesRef.current[y].childNodes[x]);
        console.log('Clicked coordinates from graph \n', coords);

		if (!addedStart) {
			newNodes[y][x]['backgroundColor'] = 'green';
			newNodes[y][x]['isStart'] = true;
			setAddedStart(true);
			setStart(newNodes[y][x]);
		} else if (!addedEnd) {
			newNodes[y][x]['backgroundColor'] = 'red';
			newNodes[y][x]['isEnd'] = true;
			setAddedEnd(true);
			setEnd(newNodes[y][x]);
		} else if (!newNodes[y][x]['isStart'] &&
				   !newNodes[y][x]['isEnd']) {
			newNodes[y][x]['backgroundColor'] = '#00008B';
			newNodes[y][x]['isWall'] = true;
		}

        // Change the state of the related cell in nodes
        setNodes(newNodes);
    }
    
    return (
        <div className='graph'>
            {graph.map((row, rowIdx) => {
                let rowId = `row-${rowIdx}`;
                return (
                    <div id={rowId} key={rowIdx} ref={(el) => {nodesRef.current[rowIdx] = el;}}>
                        {
                            row.map((_col, colIdx) => {
                                let cellId = String(rowIdx).concat('-', (colIdx));
                                let cell = (<Cell id={cellId}
												  row={rowIdx}
                                                  col={colIdx}
                                                  handleClick={handleCick}
                                                  backgroundColor={nodes[rowIdx][colIdx]['backgroundColor']}
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