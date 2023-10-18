import Queue from "./Queue.js";
// import _ from "lodash";

function BFS(grid, start, end) {

    console.log('BFS.js: Start is:', start);
    console.log('BFS.js: End is:', end);
    console.log('BFS.js: Grid is:', grid);
    if (!start || !end) {
        return;
    }
    const [ROWS, COLS] = [grid.length, grid[0].length];
    const neiEnums = [{y: 1, x: 0}, {y: -1, x: 0}, {y: 0, x: -1}, {y: 0, x: 1}]; // Up Down Left Right
    let adjacency = {}; // {Child : Parent}
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
        // When we visit the node we want to also maninpulate the DOM
        // let nodeVisited = document.getElementById(`${currNode.y}-${currNode.x}`);
        console.log('\n==================================================================');
        console.log('BFS.js: Current node:', currNode);
        console.log('BFS.js: Visited nodes:', visited);
        console.log('BFS.js: Frontier:', frontier);
        // console.log(frontier.isEmpty());

        if (currNode.isEnd) {
            console.log('BFS.js: End node reached:', currNode);
            reachable = true;
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
                    console.log('BFS.js: Added node', newCoords);
                    adjacency[[newNode.y, newNode.x]] = [currNode.y, currNode.x]; // A Child can't have multiple parents
                }
            }
        });
        console.log('BFS.js: Child(y, x) : Parent(y, x) | From(Parent) To(Child)', adjacency);
        console.log('==================================================================\n');
        // Delay for animations
        // let timerId = setTimeout(() => {
        //     console.log('delaying')
        // }, 1000);
    }
    if (reachable) {
        const reconstructPath = (end, adjacency) => {
            console.log('BFS.js: Reconstructing path...');
            console.log('BFS.js: Current adjacency:', adjacency);
            let path = [];
            let curr = end;
            while (curr !== null) {
                path.push(curr);
                curr = adjacency[curr] // Visit Parent from Child
            }
            return path; // From end to start
        };

        const path = reconstructPath([end.y, end.x], adjacency);
        console.log(path)
        return path.reverse(); // From start to end
    }
    console.log('BFS.js: Path isn\'t reachable');
    return [];
}

export default BFS;