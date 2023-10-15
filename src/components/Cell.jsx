import React from 'react';

function Cell(props) {
    const {width, height} = props.data
    return (
        <div>
            <p>
                Window dimensions are L: {width}, W: {height}
            </p>
        </div>
    )
}

export default Cell;