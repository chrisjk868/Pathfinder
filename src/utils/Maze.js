import Stack from "./Stack.js";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    return array
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

    // Up, Down, Left, Right
    const neiEnums = [{y: 2, x: 0}, {y: -2, x: 0}, {y: 0, x: -2}, {y: 0, x: 2}];
    let frontier = new Stack();
    let visited = new Set();
    frontier.push([startX, startY]);
    visited.add(JSON.stringify([startX, startY]));
    // console.log('Maze.js: [currNode]', frontier);
    console.log('Maze.js: [!frontier.isEmpty()]', !frontier.isEmpty());
    while (!frontier.isEmpty()) {
        const currNode = frontier.pop(); 
        console.log('Maze.js: [currNode]', currNode);
        let nonBarrierNodes = [];
        neiEnums.forEach((deltas, _index) => {
            const {y: deltaY, x: deltaX} = deltas;
            const newCoords = {y: currNode.y + deltaY, x: currNode.x + deltaX};
            if (0 <= newCoords.y && newCoords.y < ROWS && 0 <= newCoords.x && newCoords.x < COLS) {
                const barrierNode = [newCoords.y, newCoords.x];
                if (!visited.has(JSON.stringify(barrierNode)) && !grid[newCoords.y][newCoords.x].isStart && !grid[newCoords.y][newCoords.x].isEnd) {
                    neiBarriers.push([barrierNode, deltas]);
                    visited.add(barrierNode);
                }
            }
        });
        nonBarrierNodes = shuffle(nonBarrierNodes);
        nonBarrierNodes.forEach((node, _index) => {
            // Create a path from current node to the next available node by removing barrier between them
            // Given that the barrier node to be removed is not an End point
            const [pathNode, delta] = node;
            const [newDeltaY, newDeltaX] = [-1 * Math.trunc(delta.y / 2), -1 * Math.trunc(delta.x / 2)];
            const [bnodeY, bnodeX] = [pathNode[0] + newDeltaY, pathNode[1] + newDeltaX];
            if (!grid[bnodeY][bnodeX].isEnd) {
                grid[bnodeY][bnodeX]['backgroundColor'] = '';
                grid[bnodeY][bnodeX]['isWall'] = false;
            }
            frontier.push(node);
            console.log('Maze.js: [currNode]', frontier);
        });
    }
    return grid;
}

export default generateMaze;