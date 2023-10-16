import React from 'react';
import './styles/Graph.css';
import Cell from './Cell';
import { Container } from 'react-bootstrap';

function getWindowDimesion() {
    const { innerWidth : width, innerHeight : height } = window;
    return { width, height };
}

function getRowsCols() {
    const { width, height } = getWindowDimesion();
    let [ ROWS, COLS ] = [ width / 50, height / 50 ];
    // console.log(width, height);
    return [ Math.floor(ROWS), Math.floor(COLS) ];
}

function Graph() {

    const [ ROWS, COLS ] = getRowsCols();
    const graph = [];
    for (let row = 0; row <= ROWS; row++) {
        graph.push([]);
        for (let col = 0; col <= COLS; col++) {
            graph[row].push([]);
        }
    }
    // console.log(ROWS, COLS);
    return (
        <div className='graph'>
            {graph.map((row, rowIdx) => {
                return (
                    <div id='row' key={rowIdx}>
                        {
                            row.map((col, colIdx) => {  
                                return (<Cell row={rowIdx} col={colIdx} key={[colIdx, rowIdx]}/>);
                            })
                        }
                    </div>
                );
            })}
        </div>
    )
}

export default Graph;