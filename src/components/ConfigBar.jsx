import { Component } from "react";
import { Button, Container } from "react-bootstrap";
import './styles/ConfigBar.css';


function ConfigBar() {
    return (
        <div className="configBar">
            {/* <Button className="btn" variant="light"> Add Start </Button>
            <Button className="btn" variant="light"> Add End </Button> */}
            <Button variant="light"> Run BFS </Button>
        </div>
    )
}

export default ConfigBar;