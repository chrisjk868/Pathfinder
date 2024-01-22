import Queue from "./Queue.js";
import BFS from "./BFS.js";
import { forEach } from "lodash";

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

    // Base Cases:
    if (visitedWalls.has(currNode)) {
        return;
    }
    visitedWalls.add(JSON.stringify([currNode[0], currNode[1]]));

    // Get all neighbouring available nodes
    let nonBarrierNodes = [];
    neiEnums.forEach((deltas, _index) => {
        const {y: deltaY, x: deltaX} = deltas;
        const newCoords = {y: currNode[0] + deltaY, x: currNode[1] + deltaX};
        if (0 <= newCoords.y && newCoords.y < ROWS && 0 <= newCoords.x && newCoords.x < COLS) {
            const nonBarrierNode = [newCoords.y, newCoords.x];
            nonBarrierNodes.push([nonBarrierNode, deltas]);
        }
    });
    nonBarrierNodes = shuffle(nonBarrierNodes);
    nonBarrierNodes.forEach((node, _index) => {
        // Create a path from current node to the next available node by removing barrier between them
        // Given that the barrier node to be removed is not an end point and not out of bounds
        const [pathToNode, delta] = node;
        const [newDeltaY, newDeltaX] = [-1 * Math.trunc(delta.y / 2), -1 * Math.trunc(delta.x / 2)];
        const [bnodeY, bnodeX] = [pathToNode[0] + newDeltaY, pathToNode[1] + newDeltaX];
        console.log(board[bnodeY][bnodeX])
        if (!visitedWalls.has(JSON.stringify(pathToNode)) && !board[bnodeY][bnodeX].isEnd) {
            board[bnodeY][bnodeX]['backgroundColor'] = '';
            board[bnodeY][bnodeX]['isWall'] = false;
            getWalls(pathToNode, ROWS, COLS);
        }
    });
}

function getIslands(ROWS, COLS, getPockets=false) {
    let segments = [];
    let visited = new Set();
    const neiEnums = [{y: 1, x: 0}, {y: -1, x: 0}, {y: 0, x: -1}, {y: 0, x: 1}];
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (visited.has(JSON.stringify([row, col]))) {
                continue;
            }
            let currNode = board[row][col];
            const targetCurrNode = getPockets ? (!currNode.isWall && !currNode.isStart && !currNode.isEnd) : currNode.isWall;
            if (targetCurrNode) {
                let segment = [];
                let frontier = new Queue();
                frontier.enqueue([currNode.y, currNode.x]);
                visited.add(JSON.stringify([currNode.y, currNode.x]));
                segment.push([currNode.y, currNode.x]);
                while (!frontier.isEmpty()) {
                    let curr = frontier.dequeue();
                    neiEnums.forEach((deltas, _index) => {
                        const {y: deltaY, x: deltaX} = deltas;
                        const newCoords = {y: curr[0] + deltaY, x: curr[1] + deltaX};
                        if (0 <= newCoords.y && newCoords.y < ROWS && 0 <= newCoords.x && newCoords.x < COLS) {
                            const newNode = board[newCoords.y][newCoords.x];
                            const targetNewNode = getPockets ? (!newNode.isWall && !newNode.isStart && !newNode.isEnd) : newNode.isWall;
                            if (!visited.has(JSON.stringify([newNode.y, newNode.x])) && targetNewNode) {
                                frontier.enqueue([newNode.y, newNode.x]);
                                visited.add(JSON.stringify([newNode.y, newNode.x]));
                                segment.push([newNode.y, newNode.x]);
                            }
                        }
                    });
                }
                segments.push(segment);
            }
        }
    }

    return segments;

}

function pathExists(grid, start, end) {
    // initalize the focus to be at the end point
    // while there's no path continue path building algorithm
    // 1. get all empty pockets on the board
    // 2. find the closest empty pocket to the current point of focus
    // 3. create a path between empty pocket and end point
    // 4. update focus to the empty pocket where a path is recently created and then repeat steps
    console.log('Maze.js: Maze generation starts ...')
    let focus = [end];
    while ((BFS(grid, start, end, false)).length === 0) {
        let emptyPockets = getIslands(grid.length, grid[0].length, true);
        let minDist = Infinity; 
        let closestFocusNode = null;
        let closestPocketNode = null;
        let closestSegment = null;
        for (const [focusY, focusX] in focus) {
            for (const segment in emptyPockets) {
                // Calculate the manhattan distance from all nodes in focus to all node pockets in segment
                // Use the closest point as the reference point from focus to the current pocket
                console.log(segment);
                segment.forEach(
                    ([y, x], _index) => {
                        const dist = Math.sqrt(Math.pow(focusY - y, 2) + Math.pow(focusX - x, 2));
                        if (dist <= minDist) {
                            minDist = dist;
                            closestFocusNode = [focusY, focusX];
                            closestPocketNode = [y, x];
                            closestSegment = segment;
                        }
                    }
                );
            }
        }
        // Create a passage from the closest focus node to the closest pocket node
        // const [fNodeY, fNodeX] = closestFocusNode;
        // const [pNodeY, pNodeX] = closestPocketNode;
        // const [deltaY, deltaX] = [pNodeY - fNodeY, pNodeX - fNodeX];

        // if (deltaX > 0) { // On the right side
        //     grid[fNodeY][fNodeX + 1].isWall = false;
        // } else if (deltaX < 0) { // On the left side
        //     grid[fNodeY][fNodeX - 1].isWall = false;
        // } else { // Top and bottom
        //     if (deltaY > 0) {
        //         grid[fNodeY + 1][fNodeX].isWall = false;
        //     } else {
        //         grid[fNodeY - 1][fNodeX].isWall = false;
        //     }
        // }

        // // Update the focus to encompass all nodes throughout the created passage
        // focus = focus.concat(closestSegment);
    }
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
                    board[row][col]['isWall'] = true;
                }
            } else {
                if (col % 2 === 0 && (!board[row][col]['isStart'] && !board[row][col]['isEnd'])) {
                    board[row][col]['isWall'] = true;
                }
            }
            if (startY % 2 === 0) {
                if (row % 2 === 1 && (!board[row][col]['isStart'] && !board[row][col]['isEnd'])) {
                    board[row][col]['isWall'] = true;
                }
            } else {
                if (row % 2 === 0 && (!board[row][col]['isStart'] && !board[row][col]['isEnd'])) {
                    board[row][col]['isWall'] = true;
                }
            }
        }
    }

    // Randomized DFS for generating a maze
    visitedWalls.clear();
    getWalls([startY, startX], ROWS, COLS);

    // Get all wall segments
    const wallSegments = getIslands(ROWS, COLS);

    // Animate walls appending to the grid here
    const animateWalls = async () => {
        for (let i = 0; i < wallSegments.length; i++) {
            const segment = wallSegments[i];
            for (let j = 0; j < segment.length; j++) {
                const [row, col] = wallSegments[i][j]
                board[row][col]['backgroundColor'] = '#00008B';
                let cell = document.getElementById(`${row}-${col}`);
                cell.style.backgroundColor = '#00008B';
                cell.classList.add('animate', 'pop');
                await sleep(15);
            }
            await sleep(15);
        }
    }
    await animateWalls();
    return board;
}

export default generateMaze;
