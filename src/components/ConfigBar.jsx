import { Button, Container } from "react-bootstrap";
import './styles/ConfigBar.css';

function ConfigBar({ runBfs, clearBoard, generateMaze, btnStates }) {

    return (
        <div className="configBar">
            <Button id="gen-maze" variant="light" onClick={() => {generateMaze();}} disabled={btnStates['gen-maze']}> Create Maze </Button>
            <Button id="search-algo" variant="light" onClick={() => {runBfs();}} disabled={btnStates['search-algo']}> Run BFS </Button>
            <Button id="reset-board" variant="light" onClick={() => {clearBoard();}} disabled={btnStates['reset-board']}> Clear Board </Button>
        </div>
    )

}

export default ConfigBar;