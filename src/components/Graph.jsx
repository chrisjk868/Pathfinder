import React, { useRef, useEffect, useState } from 'react';
import './styles/Graph.css';
import Cell from './Cell';
import { Container } from 'react-bootstrap';


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
								.map((_col, colIdx) => ({ x: colIdx, y: rowIdx, isStart: false, isEnd: false, backgroundColor: '' }))
            )
    )
}


function Graph(props) {

    const graphRef = useRef(null)
    const [ROWS, COLS] = [ Math.floor(props.height / 20), Math.floor(props.width / 35) ];
    const [nodes, setNodes] = useState([]);
    const [graph, setGraph] = useState([]); 
    const [addedStart, setAddedStart] = useState(false);
    const [addedEnd, setAddedend] = useState(false);

    // Hook that determines if start is added
    useEffect(() => {
        
    }, [addedStart ]);


    // Hook that rerenders the board if the size of window changes
    useEffect(() => {
        setNodes(computeNodes(ROWS, COLS));
        setGraph(computeBoard(ROWS, COLS));
        // console.log('Graph:', props.height, props.width);
        // console.log('Board Dimensions:', ROWS, COLS)
        // console.log(nodes);
        // console.log(graph);
    }, [props.width, props.height]);

    // Recieving data from child cell
    const handleCick = (coords) => {
        const {x: x, y: y} = coords;
        console.log('Clicked coordinates from graph \n', coords);

        // Color the clicked cell here and save it
        console.log('Clicked cell from graph:\n', graphRef.current.childNodes[y].childNodes[x]);
        let cell = graphRef.current.childNodes[y].childNodes[x];
        cell.backgroundColor = 'green';

        // Change the state of the related cell in nodes
        let newNodes = [...nodes];
        console.log(newNodes);
        newNodes[y][x]['backgroundColor'] = 'green';
        setNodes(newNodes);
    }
    
    return (
        <div className='graph' ref={graphRef}>
            {graph.map((row, rowIdx) => {
                let rowId = `row-${rowIdx}`;
                return (
                    <div id={rowId} key={rowIdx}>
                        {
                            row.map((col, colIdx) => {
                                let cellId = String(rowIdx).concat('-', (colIdx));
                                let cell = (<Cell row={rowIdx}
                                                  col={colIdx}
                                                  id={cellId}
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