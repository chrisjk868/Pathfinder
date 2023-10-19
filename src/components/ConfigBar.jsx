import { Component } from "react";
import { Button, Container } from "react-bootstrap";
import './styles/ConfigBar.css';

function ConfigBar({ runBfs }) {

    return (
        <div className="configBar">
            <Button className="btn" variant="light"> Create Maze </Button>
            <Button variant="light" onClick={() => {runBfs();}} > Run BFS </Button>
            <Button className="btn" variant="light"> Clear Board </Button>
        </div>
    )

}

export default ConfigBar;