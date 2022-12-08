import React from "react";
import { Card } from "react-bootstrap";
import { Block } from "../../model/Block";

interface BlockCardProps {
  block: Block;
}

const BlockCard = ({ block }: BlockCardProps) => {
  return (
    <Card>
      <Card.Header>
        hash: <span>{block.hash}</span>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          timeStamp: <span>{block.timestamp}</span>
        </Card.Text>

        <Card.Text>
          lastBlock: <span>{block.previousHash}</span>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-arrow-right ml-auto"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
          />
        </svg>
      </Card.Footer>
    </Card>
  );
};

export default BlockCard;
