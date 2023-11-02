import { Button, Container, Dropdown } from "react-bootstrap";
import './styles/ConfigBar.css';

function ConfigBar({ runBfs, clearBoard, generateMaze, btnStates }) {

    const getState = (btn) => {
        let states = JSON.parse(btnStates);
        return states[btn];
    }

    return (
        <div className="configBar">
            <Dropdown>
                <Dropdown.Toggle variant="secondary">
                    Select Maze Generation Algorithm
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item>DFS</Dropdown.Item>
                    <Dropdown.Item>MST</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
                <Dropdown.Toggle variant="secondary">
                    Select Path Finding Algorithm
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item>BFS</Dropdown.Item>
                    <Dropdown.Item>DFS</Dropdown.Item>
                    <Dropdown.Item>Disjkstra's</Dropdown.Item>
                    <Dropdown.Item>A*</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Button id="gen-maze" variant="light" onClick={() => {generateMaze();}} disabled={getState('gen-maze')}> Create Maze </Button>
            <Button id="search-algo" variant="light" onClick={() => {runBfs();}} disabled={getState('search-algo')}> Run BFS </Button>
            <Button id="reset-board" variant="light" onClick={() => {clearBoard();}} disabled={getState('reset-board')}> Clear Board </Button>
        </div>
    )

}

export default ConfigBar;