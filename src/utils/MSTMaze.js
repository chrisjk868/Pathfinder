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
    

    // Generate barriers to remove for randomized DFS
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (startX % 2 === 0) {
                if (col % 2 === 1 && (!board[row][col]['isStart'] && !board[row][col]['isEnd'])) {
                    board[row][col]['isWall'] = true;
                    walls.push(board[row][col]);
                }
            } else {
                if (col % 2 === 0 && (!board[row][col]['isStart'] && !board[row][col]['isEnd'])) {
                    board[row][col]['isWall'] = true;
                    walls.push(board[row][col]);
                }
            }
            if (startY % 2 === 0) {
                if (row % 2 === 1 && (!board[row][col]['isStart'] && !board[row][col]['isEnd'])) {
                    board[row][col]['isWall'] = true;
                    walls.push(board[row][col]);
                }
            } else {
                if (row % 2 === 0 && (!board[row][col]['isStart'] && !board[row][col]['isEnd'])) {
                    board[row][col]['isWall'] = true;
                    walls.push(board[row][col]);
                }
            }
        }
    }

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j].isWall) {
                let cell = document.getElementById(`${i}-${j}`);
                cell.style.backgroundColor = '#00008B';
                cell.classList.add('animate', 'pop');
            }

        }
    }

    let connectionWalls = [];
    // Get specific walls that allow connections between empty cells;
    for (let i = 0; i < walls.length; i++) {
        // Check top bottom and left right
        let currRow = walls[i]['y'];
        let currCol = walls[i]['x'];
        if (0 <= currRow - 1 && currRow < ROWS) {
            if (grid[currRow - 1][currCol]['isWall'] || grid[currRow + 1][currCol]['isWall']) {
                // connectionWalls.push(walls[i]);
                let cell = document.getElementById(`${currRow}-${currCol}`);
                cell.style.backgroundColor = 'green';
            }
        } else if (0 <= currCol - 1 && currCol < COLS) {
            if (grid[currRow][currCol - 1]['isWall'] || grid[currRow][currCol + 1]['isWall']) {
                let cell = document.getElementById(`${currRow}-${currCol}`);
                cell.style.backgroundColor = 'green';
            }
        }
    }

    // Marking walls green and seeing if its correct

    // let barriers = kruskalsAlgo(walls);

    return board;
}

export default mstMaze;