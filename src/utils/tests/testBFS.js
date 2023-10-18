import BFS from "../BFS.js";
// Tests
const testGrid = [
    [
        {x: 0, y: 0, isStart: true, isEnd: false, isWall: false, backgroundColor: 'green'},
        {x: 1, y: 0, isStart: false, isEnd: false, isWall: false, backgroundColor: ''},
        {x: 2, y: 0, isStart: false, isEnd: false, isWall: false, backgroundColor: ''},
        {x: 3, y: 0, isStart: false, isEnd: true, isWall: false, backgroundColor: 'red'}
    ],
    [
        {x: 0, y: 1, isStart: false, isEnd: false, isWall: false, backgroundColor: ''},
        {x: 1, y: 1, isStart: false, isEnd: false, isWall: false, backgroundColor: ''},
        {x: 2, y: 1, isStart: false, isEnd: false, isWall: false, backgroundColor: ''},
        {x: 3, y: 1, isStart: false, isEnd: false, isWall: false, backgroundColor: ''}
    ]
];
const testStart = {
    x: 0,
    y: 0,
    isStart: true,
    isEnd: false,
    isWall: false,
    backgroundColor: 'green'
};
const testEnd = {
    x: 3,
    y: 0,
    isStart: false,
    isEnd: true,
    isWall: false,
    backgroundColor: 'red'
};
console.log('Final Path:', BFS(testGrid, testStart, testEnd));