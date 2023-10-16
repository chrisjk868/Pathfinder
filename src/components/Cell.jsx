import React from 'react';
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
        display: 'inline-block'
    };

    const clickedStyle = {
        ...defaultStyles,
        backgroundColor: 'red'
    }

    let getCoords = () => {
        const res = { x: props.col, y: props.row }
        return res;
    }

    return (
        <div className='cell' id={`${props.id}`} style={defaultStyles} onClick={() => {
                props.handleClick(getCoords()); // Sending data back to graph when a cell is clicked
            }
        }>
        </div>
    )
}

// const Cell = React.forwardRef((props, ref) => {

//     let getCoords = () => {
//         const res = { x: props.col, y: props.row }
//         return res;
//     }

//     return (
//         <div className='cell' id={`${props.id}`} ref={ref} onClick={() => {
//                 props.handleClick(getCoords()); // Sending data back to graph when a cell is clicked
//             }
//         }>
//         </div>
//     )

// })

export default Cell;    