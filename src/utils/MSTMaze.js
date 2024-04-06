let board = null;
let [ROWS, COLS] = [null, null];

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    return array
}

function kruskalsAlgo(walls) {

    let emptyCellSets = {}
    
    // First get all empty cells and create a set for each empty cells
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (!board[r][c]['isWall']) {
                emptyCellSets[[r, c]] = new Set([[r, c]]);
            }
        }
    }

    // DEBUG: All cells that are empty and available
    // Get their adjacent cells also (from left to right) or (from up to down)
    console.log(emptyCellSets);

    const neiEnums = [{y: 1, x: 0}, {y: -1, x: 0}, {y: 0, x: -1}, {y: 0, x: 1}];

    // Need to use disjoint sets here. 
    // Kruskal's Algorithm
    // We know that the coordinate of each wall represents a passage
    let randomSequencedWalls = shuffle(walls);
    randomSequencedWalls.forEach((cell, _index) => {
        let [cellRow, cellCol] = [cell['y'], cell['x']];
        // Get adjacent cells
        neiEnums.forEach((deltas, _index) => {
            const {y: deltaY, x: deltaX} = deltas;
            const newCoords = {y: cellRow + deltaY, x: cellCol + deltaX};
            if (0 <= newCoords.y && newCoords.y < ROWS && 0 <= newCoords.x && newCoords.x < COLS && !board[newCoords.y][newCoords.x]['isWall']) {
                // If the cells divided by current wall belong to distinct sets 
                // 1. Remove the current wall
                // 2. Join the set of the formerly divided walls
                board[cellRow][cellCol]['backgroundColor'] = '';
                board[cellRow][cellCol]['isWall'] = false;

            }
        })
    });
}


async function mstMaze(grid, start, end) {

    console.log('MSTMaze.js: Start is:', start);
    console.log('MSTMaze.js: End is:', end);
    console.log('MSTMaze.js: Grid is:', grid);
    if (!start || !end) {
        return;
    }
    const [ROWS, COLS] = [grid.length, grid[0].length]
    const {x: startX, y: startY} = start;
    const {x: endX, y: endY} = end;
    let walls = []
    board = [...grid];
    

    // Generate barriers to remove for randomized Kruskal's
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

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j].isWall) {
                let cell = document.getElementById(`${i}-${j}`);
                // cell.style.backgroundColor = '#00008B';
                cell.classList.add('animate', 'pop');
                board[i][j]['backgroundColor'] = '#00008B';
                walls.push(board[i][j]);
            }

        }
    }

    let connectionWalls = [];
    let pos = [[1, 0], [-1, 0], [0, -1], [0, 1]] // Position enums Up, down, left, right
    // Get specific walls that allow connections between empty cells;
    for (let i = 0; i < walls.length; i++) {
        // Check top bottom and left right
        let currRow = walls[i]['y'];
        let currCol = walls[i]['x'];
        for (let j = 0; j < pos.length; j++) {
            // Check that the positions which we are looking at are within bounds
            let [dR, dC] = pos[j];
            let [newR, newC] = [currRow + dR, currCol + dC];
            if (newR > 0 && newR < ROWS && newC > 0 && newC < COLS) {
                if (!board[newR][newC]['isWall']) {
                    board[currRow][currCol]['backgroundColor'] = 'green';
                } 
            }
        }
    }

    // Run kruskal's for maze generation
    let barriers = kruskalsAlgo(walls);

    return board;
}

export default mstMaze;