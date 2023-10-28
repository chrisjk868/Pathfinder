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

    useEffect(() => {
        setStyle(defaultStyles);
    }, [props.backgroundColor]);


    // console.log('Cell.js: Rendered [props.disabled]', props.disabled);

    const getCoords = () => {
        const res = { x: props.col, y: props.row }
        return res;
    }
    
    return (
        <div className='cell'
             id={`${props.id}`}
             style={style}
             onClick={!props.disabled ? () => {
                props.handleClick(getCoords()); // Sending data back to graph when a cell is clicked
             } : () => {}}
             onMouseEnter={(props.addWalls && !props.disabled) ? () => {
                props.dragToFill(getCoords());
             } : () => {}}>
        </div>
    )
}

export default Cell;