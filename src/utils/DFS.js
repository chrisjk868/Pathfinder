import Stack from "./Stack.js";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

async function DFS(grid, start, end, animate=true) {

    console.log('DFS.js: Start is:', start);
    console.log('DFS.js: End is:', end);
    console.log('DFS.js: Grid is:', grid);
    if (!start || !end) {
        return;
    }
    const [ROWS, COLS] = [grid.length, grid[0].length];
    // Up, Down, Left, Right
    const neiEnums = [{y: 1, x: 0}, {y: -1, x: 0}, {y: 0, x: -1}, {y: 0, x: 1}];


    }
    if (reachable) {
        const reconstructPath = async (end, adjacency) => {
            console.log('BFS.js: Reconstructing path...');
            console.log('BFS.js: Current adjacency:', adjacency);
            let path = [];
            let curr = end;
            while (curr !== null) {
                if (animate) {
                    let cell = document.getElementById(`${curr[0]}-${curr[1]}`);
                    cell.style.backgroundColor = 'yellow';
                    cell.classList.add('animate1', 'pop1');
                }
                path.push(curr);
                curr = adjacency[curr] // Visit Parent from Child
                await sleep(25);
            }
            return path; // From end to start
        };
        const path = await reconstructPath([end.y, end.x], adjacency);
        return path.reverse(); // From start to end
    }
    console.log('BFS.js: Path isn\'t reachable');
    return [];
}

export default BFS;