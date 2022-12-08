import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

const ChainNavigation = () => {
  return (
    <Nav fill variant="tabs" defaultActiveKey="/chain">
      <Nav.Item>
        <Link to="/">CHAIN</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/nextblock">NEXT BLOCK</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/addtransaction">TRANSACTION</Link>
      </Nav.Item>
    </Nav>
  );
};

export default ChainNavigation;
