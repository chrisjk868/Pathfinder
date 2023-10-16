import React from 'react';
import './styles/Cell.css';
import { Row, Col } from 'react-bootstrap';

function Cell(props) {
    
    let getCoords = () => {
        const res = { x: props.col, y: props.row }
        console.log(res);
    }

    return (
        <div className='cell' onClick={() => getCoords()}></div>
    )   
}

export default Cell;    