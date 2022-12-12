import React from "react";
import { Card, Popover, OverlayTrigger, Button } from "react-bootstrap";
import { Block } from "../../model/Block";
import { Transaction } from "../../model/Transaction";
import TransactionsList from "../../transactions-list/TransactionsList";

interface BlockCardProps {
  block: Block;
}

const BlockCard = ({ block }: BlockCardProps) => {
  const transactionsPopover = (transactions: Transaction[]) => {
    return (
      <Popover id="popover-transactions" title="Block Transactions">
        <TransactionsList transactionsList={transactions} />
      </Popover>
    );
  };

  return (
    <Card>
      <Card.Header>
        hash: <span>{block.hash}</span>
      </Card.Header>
      <Card.Body className="row p-3 m-5">
        <div className="col-auto">
          <Card.Text>
            timeStamp: <span>{block.timestamp}</span>
          </Card.Text>

          <Card.Text>
            lastBlock: <span>{block.previousHash}</span>
          </Card.Text>
        </div>
        <div className="col-auto m-3 p-3">
          <OverlayTrigger
            trigger={["hover", "focus"]}
            placement="top"
            overlay={transactionsPopover(block.transactions || [])}
          >
            <Button data-testid="transactions-button">Transactions</Button>
          </OverlayTrigger>
        </div>
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
