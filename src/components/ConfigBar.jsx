import { Button, Container } from "react-bootstrap";
import './styles/ConfigBar.css';

function ConfigBar({ runBfs, clearBoard, generateMaze, btnStates }) {

    const getState = (btn) => {
        let states = JSON.parse(btnStates);
        return states[btn];
    }

    return (
        <div className="configBar">
            <Button id="gen-maze" variant="light" onClick={() => {generateMaze();}} disabled={getState('gen-maze')}> Create Maze </Button>
            <Button id="search-algo" variant="light" onClick={() => {runBfs();}} disabled={getState('search-algo')}> Run BFS </Button>
            <Button id="reset-board" variant="light" onClick={() => {clearBoard();}} disabled={getState('reset-board')}> Clear Board </Button>
        </div>
    )

}

export default ConfigBar;