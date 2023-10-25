import React, { useEffect, useState } from 'react';
import './styles/Cell.css';

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

    useEffect(() => {
        setStyle(defaultStyles);
    }, [props.backgroundColor]);


    console.log('Cell.js: Rendered');

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