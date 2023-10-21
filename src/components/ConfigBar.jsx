import { Component } from "react";
import { Button, Container } from "react-bootstrap";
import './styles/ConfigBar.css';

function ConfigBar({ runBfs, clearBoard, generateMaze }) {

    return (
        <div className="configBar">
            <Button variant="light" onClick={() => {generateMaze();}}> Create Maze </Button>
            <Button variant="light" onClick={() => {runBfs();}}> Run BFS </Button>
            <Button variant="light" onClick={() => {clearBoard();}}> Clear Board </Button>
        </div>
    )

}

export default ConfigBar;