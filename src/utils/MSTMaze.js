let board = null

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

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j].isWall) {
                let cell = document.getElementById(`${i}-${j}`);
                cell.style.backgroundColor = '#00008B';
                cell.classList.add('animate', 'pop');
            }

        }
    }

    return board;
}

export default mstMaze;