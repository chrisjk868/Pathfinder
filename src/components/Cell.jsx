import React from 'react';
import './styles/Cell.css';
import { Row, Col } from 'react-bootstrap';

function Cell(props) {
    // const {width, height} = props.data
    return (
        <div className='cell'>
            <p>
                {/* Window dimensions are L: {width}, W: {height} */}
            </p>
        </div>
    )
}

export default Cell;