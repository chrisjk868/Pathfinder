import React from 'react';
import Cell from './Cell';

function getWindowDimesion() {
    const { innerWidth : width, innerHeight : height} = window;
    return {width, height};
}

function Graph() {
    // const dim = getWindowDimesion();
    // console.log(dim);
    return (
        <div>
            <Cell data={getWindowDimesion()}/>
        </div>
    )
}

export default Graph;