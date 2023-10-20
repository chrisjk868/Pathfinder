import React, { forwardRef, useEffect, useState } from 'react';
import './styles/Cell.css';
import { Row, Col } from 'react-bootstrap';

function Cell(props) {

    const defaultStyles = {
        color: 'grey',
        border: 'solid',
        height: '30px',
        width: '30px',
        margin: '0',
        padding: '0',
        display: 'inline-block',
        borderWidth: 'thin',
        backgroundColor: props.backgroundColor
    };

    const[style, setStyle] = useState(defaultStyles);
    // const[reset, setReset] = useState(false);

    // Hook that rerenders cell when background color is changed
    useEffect(() => {
        setStyle(defaultStyles);
    }, [props.backgroundColor]);

    // Hook that rerenders cell when clear board is pressed:
    // useEffect(() => {
    //     setReset(!reset);
    // }, [props.reset])

    // console.log(`color for cell ${props.row}, ${props.col} is ${props.backgroundColor}`);

    let getCoords = () => {
        const res = { x: props.col, y: props.row }
        return res;
    }

    return (
        <div className='cell' id={`${props.id}`} style={style} onClick={() => {
                props.handleClick(getCoords()); // Sending data back to graph when a cell is clicked
            }
        }>
        </div>
    )
}

export default Cell;