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


function Graph(props) {

    const [nodes, setNodes] = useState(null);
    const [graph, setGraph] = useState([]); 

    useEffect(() => {
        const [ROWS, COLS] = [ Math.floor(props.height / 20), Math.floor(props.width / 35) ];
        setNodes(
            Array( Math.floor(props.height / 20) )
                .fill()
                .map((_row, rowIdx) =>
                    Array( Math.floor(props.width / 35) )
                        .fill()
                        .map((_col, colIdx) => ({ x: colIdx, y: rowIdx, isStart: false, isEnd: false, backgroundColor: '' }))
                )
        );
        setGraph(computeBoard(ROWS, COLS));
        console.log('Graph:', props.height, props.width);
        console.log('Board Dimensions:', ROWS, COLS)
        console.log(nodes);
        console.log(graph);
    }, [props.width, props.height]);


    // Recieving data from child cell
    let handleCick = (coords) => {
        const {x: x, y: y} = coords;
        console.log('Clicked coordinates from graph \n', coords);

        // Color the clicked cell here and save it
        console.log('Clicked cell from graph:\n', graphRef.current.childNodes[y].childNodes[x]);
        let cell = graphRef.current.childNodes[y].childNodes[x];
        cell.backgroundColor = 'green';

    }
    
    return (
        <div className='graph' key={props.width}>
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