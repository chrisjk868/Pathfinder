import Queue from "./Queue.js";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

async function BFS(grid, start, end) {

    console.log('BFS.js: Start is:', start);
    console.log('BFS.js: End is:', end);
    console.log('BFS.js: Grid is:', grid);
    if (!start || !end) {
        return;
    }
    const [ROWS, COLS] = [grid.length, grid[0].length];
    // Up, Down, Left, Right
    const neiEnums = [{y: 1, x: 0}, {y: -1, x: 0}, {y: 0, x: -1}, {y: 0, x: 1}];
    let adjacency = {};
    let frontier = new Queue();
    let visited = new Set();
    let reachable = false;
    // Initalize frontier for BFS
    frontier.enqueue(start);
    adjacency[[start.y, start.x]] = null;
    visited.add(JSON.stringify(start))
    while (!frontier.isEmpty()) {
        // Process the current node
        let currNode = frontier.dequeue(); // currNode: Parent
        // console.log('\n==================================================================');
        // console.log('BFS.js: Current node:', currNode);
        // console.log('BFS.js: Visited nodes:', visited);
        // console.log('BFS.js: Frontier:', frontier);
        // console.log(frontier.isEmpty());

        if (reachable) {
            // console.log('BFS.js: End node reached:', currNode);
            break;
        }
        // Check the next candidates to visit
        neiEnums.forEach((deltas, _index) => {
            const {y: deltaY, x: deltaX} = deltas;
            const newCoords = {y: currNode.y + deltaY, x: currNode.x + deltaX}; // newNode: Child
            // DEBUG
            // console.log(newCoords);
            // console.log('BFS.js: new node:', newNode);
            // console.log(0 <= newNode.y && newNode.y < ROWS);
            // console.log(0 <= newNode.x && newNode.x < COLS);
            // console.log(!visited.has(JSON.stringify(newNode)));
            if (0 <= newCoords.y && newCoords.y < ROWS && 0 <= newCoords.x && newCoords.x < COLS) {
                const newNode = grid[newCoords.y][newCoords.x];
                if (!visited.has(JSON.stringify(newNode)) && !newNode.isWall) {
                    frontier.enqueue(newNode);
                    visited.add(JSON.stringify(newNode));
                    // console.log('BFS.js: Added node', newCoords);
                    adjacency[[newNode.y, newNode.x]] = [currNode.y, currNode.x]; // A Child can't have multiple parents
                    if (newNode.isEnd) {
                        // console.log('BFS.js: End node reached:', currNode);
                        reachable = true;
                        // break;
                    } else {
                        let cell = document.getElementById(`${newNode.y}-${newNode.x}`);
                        cell.style.backgroundColor = 'cyan';
                        cell.classList.add('animate', 'pop');
                    }
                }
            }
        });
        // console.log('BFS.js: Child(y, x) : Parent(y, x) | From(Parent) To(Child)', adjacency);
        // console.log('==================================================================\n');
        await sleep(10);
    }
    if (reachable) {
        const reconstructPath = async (end, adjacency) => {
            console.log('BFS.js: Reconstructing path...');
            console.log('BFS.js: Current adjacency:', adjacency);
            let path = [];
            let curr = end;
            while (curr !== null) {
                if (!grid[curr[0]][curr[1]].isEnd && !grid[curr[0]][curr[1]].isStart) {
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