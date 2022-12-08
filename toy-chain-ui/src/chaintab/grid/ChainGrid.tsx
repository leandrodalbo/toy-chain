import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Block } from "../../model/Block";
import BlockCard from "../card/ChainBlockCard";

interface ChainGridProps {
  blocksList: Array<Block>;
}

const ChainGrid = ({ blocksList }: ChainGridProps) => {
  return (
    <Container fluid>
      {blocksList.map((block) => (
        <Row key={block.hash}>
          <Col>
            <BlockCard block={block} />
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default ChainGrid;
