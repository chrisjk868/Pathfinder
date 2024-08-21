import { forEach } from "lodash";
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
    let stack = new Stack();
    let visited = new Set();
    let path = {}
    path[[start.y, start.x]] = null;

    stack.push([start.y, start.x]);

    // Perform DFS here
    while (!stack.isEmpty()) {

        let curPos = stack.pop();
        let [curY, curX] = curPos;

        if (curY === end.y && curX === end.x) {
            // If we reach the end node here we would backtrack and find the path back to the start node
            break;
        }

        if (visited.has([curY, curX])) {
            continue;
        }


        if (animate) {
            let cell = document.getElementById(`${curY}-${curX}`);
            cell.style.backgroundColor = 'cyan';
            cell.classList.add('animate', 'pop');
        }

        visited.add([curY, curX]);

        neiEnums.forEach(
            (deltas, _index) => {
                let [newY, newX] = [curY + deltas.y, curX + deltas.x];
                if (!visited.has([newY, newX]) && 0 <= newY && newY < ROWS && 0 <= newX && newX < COLS) {
                    console.log('Appending new coordinates: ', [newY, newX]);
                    stack.push([newY, newX]);
                    visited.add([newY, newX])
                }
            }
        );
    }

    // if (reachable) {
    //     const reconstructPath = async (end, adjacency) => {
    //         console.log('DFS.js: Reconstructing path...');
    //         console.log('DFS.js: Current adjacency:', adjacency);
    //         let path = [];
    //         let curr = end;
    //         while (curr !== null) {
    //             if (animate) {
    //                 let cell = document.getElementById(`${curr[0]}-${curr[1]}`);
    //                 cell.style.backgroundColor = 'yellow';
    //                 cell.classList.add('animate1', 'pop1');
    //             }
    //             path.push(curr);
    //             curr = adjacency[curr] // Visit Parent from Child
    //             await sleep(25);
    //         }
    //         return path; // From end to start
    //     };
    //     const path = await reconstructPath([end.y, end.x], adjacency);
    //     return path.reverse(); // From start to end
    // }

    console.log('DFS.js: Path isn\'t reachable');
    return [];
}

export default DFS;