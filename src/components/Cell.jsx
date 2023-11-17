import React, { useEffect, useState } from 'react';
import { TbWall } from "react-icons/tb";
import { FaBomb } from "react-icons/fa";
import { MdOutlineTripOrigin } from "react-icons/md";
import { FaLocationCrosshairs } from "react-icons/fa6";
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
        verticalAlign: 'top',
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
        <>
            {props.isWeakWall ?
                <TbWall className='weakWall' id={`${props.id}`} viewBox='4 4 16 16'/>
             : (props.isBomb ?
                    <FaBomb className='bomb' id={`${props.id}`}/>
                : (props.isStart ?
                        <MdOutlineTripOrigin className='start' id={`${props.id}`}/>
                        : (props.isEnd ?
                            <FaLocationCrosshairs className='end' id={`${props.id}`}/>
                            :
                                (<div className='cell'
                                    id={`${props.id}`}
                                    style={style}
                                    onClick={!props.disabled ? () => {
                                        props.handleClick(getCoords()); // Sending data back to graph when a cell is clicked
                                    } : () => {}}
                                    onMouseEnter={(props.addWalls && !props.disabled) ? () => {
                                        props.dragToFill(getCoords());
                                    } : () => {}}>
                                </div>)
                          )
                  )
                )
            }
        </>
        
    )
}

export default Cell;