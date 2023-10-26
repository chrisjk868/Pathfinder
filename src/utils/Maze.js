import Queue from "./Queue.js";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    return array
}

let board = null;
let visitedWalls = new Set();
const neiEnums = [{y: 2, x: 0}, {y: -2, x: 0}, {y: 0, x: -2}, {y: 0, x: 2}];
function getWalls(currNode, ROWS, COLS) {

    // console.log(visitedWalls);

    // Base Cases:
    if (visitedWalls.has(currNode)) {
        // console.log('Maze.js: reached visited node [currNode]', currNode);
        // console.log('======================================================================\n');
        return;
    }
    // console.log('\n======================================================================');
    // console.log('Maze.js: [currNode]', currNode);
    visitedWalls.add(JSON.stringify([currNode[0], currNode[1]]));

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
    // console.log('Maze.js: available neighbor candidate => [nonBarrierNodes]', nonBarrierNodes);
    nonBarrierNodes.forEach((node, _index) => {
        // Create a path from current node to the next available node by removing barrier between them
        // Given that the barrier node to be removed is not an End point
        const [pathToNode, delta] = node;
        const [newDeltaY, newDeltaX] = [-1 * Math.trunc(delta.y / 2), -1 * Math.trunc(delta.x / 2)];
        const [bnodeY, bnodeX] = [pathToNode[0] + newDeltaY, pathToNode[1] + newDeltaX];
        if (!visitedWalls.has(JSON.stringify(pathToNode)) && !board[bnodeY][bnodeX].isEnd) {
            board[bnodeY][bnodeX]['backgroundColor'] = '';
            board[bnodeY][bnodeX]['isWall'] = false;
            getWalls(pathToNode, ROWS, COLS);
        }
    });
    // console.log('======================================================================\n');
}

function getIslands(ROWS, COLS) {
    let segments = [];
    let visited = new Set();
    const neiEnums = [{y: 1, x: 0}, {y: -1, x: 0}, {y: 0, x: -1}, {y: 0, x: 1}];
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (visited.has(JSON.stringify([row, col]))) {
                continue;
            }
            let currNode = board[row][col];
            if (currNode.isWall) {
                // console.log('\n====================== (Starting BFS for segments) ======================');
                let segment = [];
                let frontier = new Queue();
                frontier.enqueue([currNode.y, currNode.x]);
                visited.add(JSON.stringify([currNode.y, currNode.x]));
                segment.push([currNode.y, currNode.x]);
                while (!frontier.isEmpty()) {
                    let curr = frontier.dequeue();
                    // console.log('Maze.js: current node:', curr);
                    neiEnums.forEach((deltas, _index) => {
                        const {y: deltaY, x: deltaX} = deltas;
                        const newCoords = {y: curr[0] + deltaY, x: curr[1] + deltaX};
                        if (0 <= newCoords.y && newCoords.y < ROWS && 0 <= newCoords.x && newCoords.x < COLS) {
                            // console.log('Maze.js: node to visit:', newCoords);
                            const newNode = board[newCoords.y][newCoords.x];
                            if (!visited.has(JSON.stringify([newNode.y, newNode.x])) && newNode.isWall) {
                                frontier.enqueue([newNode.y, newNode.x]);
                                visited.add(JSON.stringify([newNode.y, newNode.x]));
                                segment.push([newNode.y, newNode.x]);
                            }
                        }
                    });
                }
                segments.push(segment);
                // console.log('======================================================================\n');
            }
        }
    }

    return segments;

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
    board = [...grid];

    // Generate barriers to remove for randomized DFS
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (startX % 2 === 0) {
                if (col % 2 === 1 && (!board[row][col]['isStart'] && !board[row][col]['isEnd'])) {
                    // board[row][col]['backgroundColor'] = 'cyan';
                    board[row][col]['isWall'] = true;
                }
            } else {
                if (col % 2 === 0 && (!board[row][col]['isStart'] && !board[row][col]['isEnd'])) {
                    // board[row][col]['backgroundColor'] = 'cyan';
                    board[row][col]['isWall'] = true;
                }
            }
            if (startY % 2 === 0) {
                if (row % 2 === 1 && (!board[row][col]['isStart'] && !board[row][col]['isEnd'])) {
                    // board[row][col]['backgroundColor'] = 'cyan';
                    board[row][col]['isWall'] = true;
                }
            } else {
                if (row % 2 === 0 && (!board[row][col]['isStart'] && !board[row][col]['isEnd'])) {
                    // board[row][col]['backgroundColor'] = 'cyan';
                    board[row][col]['isWall'] = true;
                }
            }
        }
    }

    // Randomized DFS for generating a maze
    console.log('Maze.js: Randomized DFS => [visitedWalls]:', visitedWalls);
    visitedWalls.clear();
    getWalls([startY, startX], ROWS, COLS);

    console.log('Maze.js: Board after maze generation [board]:', board);

    // Get all wall segments
    const wallSegments = getIslands(ROWS, COLS);
    console.log('Maze.js: Wall segments [wallSegments]:', wallSegments);

    // Animate walls appending to the grid here
    const animateWalls = async () => {
        console.log('Maze.js: Animating walls appending');
        for (let i = 0; i < wallSegments.length; i++) {
            const segment = wallSegments[i];
            for (let j = 0; j < segment.length; j++) {
                const [row, col] = wallSegments[i][j];
                let cell = document.getElementById(`${row}-${col}`);
                cell.style.backgroundColor = '#00008B';
                cell.classList.add('animate', 'pop');
                await sleep(10);
            }
            await sleep(10);
        }
    }
    await animateWalls();
    console.log('Maze.js: Returning board with new data');
    return board;
    // return new Promise(resolve => resolve(board));
}

export default generateMaze;