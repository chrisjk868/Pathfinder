import BFS from "../BFS.js";

function genGrid(start, end, rows, cols) {
    const [ROWS, COLS] = [rows, cols];
    let grid = [];
    console.log
    for (let r = 0; r < ROWS; r++) {
        let curRow = [];
        for (let c = 0; c < COLS; c++) {
            let curNode = {x: c,
                           y: r,
                           isStart: false,
                           isEnd: false,
                           isWall: false,
                           backgroundColor: ''};
            if ([r, c].toString() === start.toString()) {
                curNode.isStart = true;
                curNode.backgroundColor = 'green';
            } else if ([r, c].toString() === end.toString()) {
                curNode.isEnd = true;
                curNode.backgroundColor = 'red';
            }
            curRow.push(curNode);
        }
        grid.push(curRow);
    }
    return grid
}

// Tests
const testGrid = genGrid([0, 0], [23, 53], 24, 54);
console.log(testGrid);
const testStart = {
    x: 0,
    y: 0,
    isStart: true,
    isEnd: false,
    isWall: false,
    backgroundColor: 'green'
};
const testEnd = {
    x: 53,
    y: 23,
    isStart: false,
    isEnd: true,
    isWall: false,
    backgroundColor: 'red'
};
console.log('Final Path:', BFS(testGrid, testStart, testEnd));