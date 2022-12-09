import React, { useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { Transaction } from "../model/Transaction";
import { ENDPOINT } from "../api/api";

const AddTransaction = () => {
  const [amount, setAmount] = useState(100);
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [lastTransaction, setLastTransaction] = useState<
    Transaction | undefined
  >();

  const sendTransaction = async (trx: Transaction) => {
    const response = await fetch(`${ENDPOINT}/addTransaction`, {
      method: "POST",
      headers: {
        "access-control-allow-origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trx),
    });

    if (response.status === 200) {
      const saved = (await response.json()) as Transaction;
      setLastTransaction(saved);
    }
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const trx: Transaction = {
      sender: sender,
      receiver: receiver,
      amount: amount,
    };

    setAmount(100);
    setSender("");
    setReceiver("");

    await sendTransaction(trx);
  };

  return (
    <Row>
      <Col>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="trxSenderEmail">
            <Row className="mt-5 mx-auto">
              <Form.Label>Sender Address</Form.Label>
              <Col>
                <Form.Control
                  data-testid="trxSenderEmail"
                  type="email"
                  placeholder="Enter email"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  required
                />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="trxReceiverEmail">
            <Row className="mt-4 mx-auto">
              <Form.Label>Receiver Address</Form.Label>
              <Col>
                <Form.Control
                  data-testid="trxReceiverEmail"
                  type="email"
                  placeholder="Enter email"
                  value={receiver}
                  onChange={(e) => setReceiver(e.target.value)}
                  required
                />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="trxAmount">
            <Row className="mt-4 mx-auto">
              <Form.Label>Amount</Form.Label>
              <Col>
                <Form.Control
                  data-testid="trxAmount"
                  type="number"
                  min={100}
                  max={50000}
                  value={amount}
                  placeholder="Enter Amount"
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
              </Col>
            </Row>
          </Form.Group>

          <Button
            data-testid="confirmTransactionButton"
            className="m-3"
            variant="primary"
            type="submit"
          >
            Confirm Transaction
          </Button>
        </Form>
      </Col>
      <Col className="m-3 p-3">
        {lastTransaction && (
          <Card>
            <Card.Header>Last Transaction: {lastTransaction.hash}</Card.Header>
            <Card.Body>
              <Card.Text>Sender: {lastTransaction.sender}</Card.Text>
              <Card.Text>Receiver: {lastTransaction.receiver}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <Card.Text>Amount: {lastTransaction.amount}</Card.Text>
            </Card.Footer>
          </Card>
        )}
      </Col>
    </Row>
  );
};

export default AddTransaction;
