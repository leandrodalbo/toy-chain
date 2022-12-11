import React from "react";
import { Table, Container } from "react-bootstrap";
import { Transaction } from "../model/Transaction";

interface TransactionsListProps {
  transactionsList: Array<Transaction>;
}

const TransactionsList = ({ transactionsList }: TransactionsListProps) => {
  return (
    <Container fluid>
      <Table striped>
        <thead>
          <tr>
            <th>Hash</th>
            <th>Block</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {transactionsList.map((it) => (
            <tr key={it.hash}>
              <td>{it.hash}</td>
              <td>{it.blockHash ? it.blockHash : "Mining Pending"}</td>
              <td>{it.timestamp ? it.timestamp : "Mining Pending"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TransactionsList;
