import React from "react";
import { Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
export default function ImageToDate() {
  return (
    <div>
      <Row>
        <Col>
          <DropdownButton id="dropdown-basic-button" title="Pick an Image">
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </DropdownButton>
        </Col>
        <Col>
          <DropdownButton id="dropdown-basic-button" title="Pick Date">
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>
    </div>
  );
}
