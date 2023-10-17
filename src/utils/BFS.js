import Queue from "./Queue";
import _ from "lodash";

function BFS(grid, start, end) {
    const [ROWS, COLS] = [grid.length, grid[0].length];
    const neiEnums = [{y: 1, x: 0}, {y: -1, x: 0}, {y: 0, x: -1}, {y: 0, x: 1}]; // Up Down Left Right

    if (!start || !end) {
        return;
    }

    let path = [];
    let frontier = new Queue();
    let visited = new Set();
    let reachable = false;
    frontier.push(start);

    while (frontier) {
        // Visit the current node, when we visit the node we want to also maninpulate the dom
        let currNode = frontier.dequeue();

        if (_.isEqual(currNode, end)) {
            reachable = !reachable;
            break;
        }
        // Check the next candidates to add to queue
        neiEnums.forEach((deltas, _index) => {
            const {y: deltaY, x: deltaX} = deltas;
            const newNode = {y: currNode['y'] + deltaY, x: currNode['x'] + deltaX};
            if (newNode.y < ROWS && newNode.x < COLS && !visited.has(newNode)) {
                frontier.enqueue(grid[newNode.y][newNode.x]);
            }
        });

        let timerId = setTimeout(() => {
            console.log('delaying')
        }, 1000);
    }

    return path;
}

export default BFS;