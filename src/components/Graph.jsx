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
    return [ Math.floor(ROWS), Math.floor(COLS) ];
}

function Graph() {
    const [ ROWS, COLS ] = getRowsCols();
    const graphRows = [];
    for (let row = 0; row <= ROWS; row++) {
        graphRows.push([]);
        for (let col = 0; col <= COLS; col++) {
            graphRows[row].push(<Cell/>)
        }
    }
    // console.log(ROWS, COLS);
    return (
        <div className='graph'>
            {graphRows}
        </div>
    )
}

export default Graph;