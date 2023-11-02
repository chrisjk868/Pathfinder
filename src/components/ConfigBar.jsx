import { Button, Container, Dropdown } from "react-bootstrap";
import { useState } from "react";
import './styles/ConfigBar.css';

function ConfigBar({ runBfs, clearBoard, generateMaze, btnStates }) {

    const [mazeAlgo, setMazeAlgo] = useState('Select Maze Generation Algorithm');
    const [pfAlgo, setPfAlgo] = useState('Select Path Finding Algorithm');

    const getState = (btn) => {
        let states = JSON.parse(btnStates);
        return states[btn];
    }

    const handleSelect = (_eventKey, event) => {
        console.log(event.target.className);
        event.preventDefault();
        let target = event.target.className;
        if (target === 'mazeAlgo dropdown-item') {
            setMazeAlgo(event.target.text);
        } else {
            setPfAlgo(event.target.text);
        }
    }

    return (
        <div className="configBar">
            <Dropdown onSelect={handleSelect}>
                <Dropdown.Toggle variant="secondary">
                    {mazeAlgo}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item className='mazeAlgo'>Randomized DFS</Dropdown.Item>
                    <Dropdown.Item className='mazeAlgo'>MST</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown onSelect={handleSelect}>
                <Dropdown.Toggle variant="secondary">
                    {pfAlgo}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item className='pathAlgo'>BFS</Dropdown.Item>
                    <Dropdown.Item className='pathAlgo'>DFS</Dropdown.Item>
                    <Dropdown.Item className='pathAlgo'>Disjkstra's</Dropdown.Item>
                    <Dropdown.Item className='pathAlgo'>A*</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Button id="gen-maze" variant="outline-light" onClick={() => {generateMaze();}} disabled={getState('gen-maze')}> Create Maze </Button>
            <Button id="search-algo" variant="outline-light" onClick={() => {runBfs();}} disabled={getState('search-algo')}> Run BFS </Button>
            <Button id="reset-board" variant="outline-light" onClick={() => {clearBoard();}} disabled={getState('reset-board')}> Clear Board </Button>
        </div>
    )

}

export default ConfigBar;