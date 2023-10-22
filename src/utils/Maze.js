function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    return array
}

// Up, Down, Left, Right
const neiEnums = [{y: 2, x: 0}, {y: -2, x: 0}, {y: 0, x: -2}, {y: 0, x: 2}];
let visited = new Set();
let board = null;
function getWalls(currNode, ROWS, COLS) {

    // Base Cases:
    if (visited.has(currNode)) {
        console.log('Maze.js: reached visited node [currNode]', currNode);
        console.log('======================================================================\n');
        return;
    }
    console.log('\n======================================================================');
    console.log('Maze.js: [currNode]', currNode);
    visited.add(JSON.stringify([currNode[0], currNode[1]]));

    // Get all neighbouring available nodes
    let nonBarrierNodes = [];
    neiEnums.forEach((deltas, _index) => {
        const {y: deltaY, x: deltaX} = deltas;
        const newCoords = {y: currNode[0] + deltaY, x: currNode[1] + deltaX};
        // console.log('Maze.js: [newCoords]', newCoords);
        if (0 <= newCoords.y && newCoords.y < ROWS && 0 <= newCoords.x && newCoords.x < COLS) {
            const nonBarrierNode = [newCoords.y, newCoords.x];
            nonBarrierNodes.push([nonBarrierNode, deltas]);
        }
    });
    // console.log('Maze.js: [nonBarrierNodes] before shuffle', nonBarrierNodes);
    nonBarrierNodes = shuffle(nonBarrierNodes);
    console.log('Maze.js: available neighbor candidate => [nonBarrierNodes]', nonBarrierNodes);
    nonBarrierNodes.forEach((node, _index) => {
        // Create a path from current node to the next available node by removing barrier between them
        // Given that the barrier node to be removed is not an End point
        const [pathToNode, delta] = node;
        const [newDeltaY, newDeltaX] = [-1 * Math.trunc(delta.y / 2), -1 * Math.trunc(delta.x / 2)];
        const [bnodeY, bnodeX] = [pathToNode[0] + newDeltaY, pathToNode[1] + newDeltaX];
        if (!visited.has(JSON.stringify(pathToNode)) && !board[bnodeY][bnodeX].isEnd) {
            board[bnodeY][bnodeX]['backgroundColor'] = '';
            board[bnodeY][bnodeX]['isWall'] = false;
            getWalls(pathToNode, ROWS, COLS);
        }
    });
    console.log('======================================================================');

}


async function generateMaze(grid, start, end) {
    console.log('Maze.js: Start is:', start);
    console.log('Maze.js: End is:', end);
    console.log('Maze.js: Grid is:', grid);
    if (!start || !end) {
        return;
    }
    const [ROWS, COLS] = [grid.length, grid[0].length]
    const {x: startX, y: startY} = start;
    const {x: endX, y: endY} = end;

    // Generate barriers to remove for randomized DFS
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (startX % 2 === 0) {
                if (col % 2 === 1 && (!grid[row][col]['isStart'] && !grid[row][col]['isEnd'])) {
                    grid[row][col]['backgroundColor'] = '#00008B';
                    grid[row][col]['isWall'] = true;
                }
            } else {
                if (col % 2 === 0 && (!grid[row][col]['isStart'] && !grid[row][col]['isEnd'])) {
                    grid[row][col]['backgroundColor'] = '#00008B';
                    grid[row][col]['isWall'] = true;
                }
            }
            if (startY % 2 === 0) {
                if (row % 2 === 1 && (!grid[row][col]['isStart'] && !grid[row][col]['isEnd'])) {
                    grid[row][col]['backgroundColor'] = '#00008B';
                    grid[row][col]['isWall'] = true;
                }
            } else {
                if (row % 2 === 0 && (!grid[row][col]['isStart'] && !grid[row][col]['isEnd'])) {
                    grid[row][col]['backgroundColor'] = '#00008B';
                    grid[row][col]['isWall'] = true;
                }
            }
        }
    }

    board = [...grid];

    // Randomized DFS for generating a maze
    getWalls([startX, startY], ROWS, COLS);

    console.log('Maze.js: Board after maze generation [board]:', board);

    // Animate walls appending to the grid here
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if (board[row][col].isWall) {
                let cell = document.getElementById(`${row}-${col}`);
                cell.style.backgroundColor = '#00008B';
                cell.classList.add('animate', 'pop');
            }
            await sleep(10);
        }
    }
    return board;
}

export default generateMaze;