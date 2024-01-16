import { Button, Container, Dropdown, ToggleButton } from "react-bootstrap";
import { FaBomb } from "react-icons/fa";
import { GiMaze } from 'react-icons/gi';
import { TbWall } from "react-icons/tb";
import { PiPathBold, PiEraserFill } from "react-icons/pi";
import './styles/ConfigBar.css';

function ConfigBar({ runPfAlgo, clearBoard, generateMaze, btnStates, toggleStates, handleSelect, handleBombClick, mazeAlgo, pfAlgo }) {

    const getBtnState = (btn) => {
        let states = JSON.parse(btnStates);
        return states[btn];
    }

    const getToggleState = (tgl) => {
        let states = JSON.parse(toggleStates);
        return states[tgl];
    }

    return (
        <Container className="header" fluid={true}>
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
                <Button id="gen-maze" variant="outline-light" onClick={() => {generateMaze();}} disabled={getBtnState('gen-maze')}> Create Maze <GiMaze/> </Button>
                <Button id="search-algo" variant="outline-light" onClick={() => {runPfAlgo();}} disabled={getBtnState('search-algo')}> Find Path <PiPathBold/> </Button>
                {/* <ToggleButton
                    id="add-weak-walls"
                    className="toggleBtn"
                    variant="outline-light"
                    type="checkbox"
                    checked={getToggleState('add-weak-walls')}
                    disabled={getBtnState('add-weak-walls')}
                    onClick={handleWallClick}>
                        Add Weak Walls <TbWall/>
                </ToggleButton> */}
                <ToggleButton
                    id="add-bomb"
                    className="toggleBtn"
                    variant="outline-light"
                    type="checkbox"
                    checked={getToggleState('add-bombs')}
                    disabled={getBtnState('add-bombs')}
                    onClick={handleBombClick}>
                        Add Bombs <FaBomb/>
                    </ToggleButton>
                <Button id="reset-board" variant="outline-light" onClick={() => {clearBoard();}} disabled={getBtnState('reset-board')}> Clear Board <PiEraserFill/> </Button>
            </div>
        </Container>
    )

}

export default ConfigBar;