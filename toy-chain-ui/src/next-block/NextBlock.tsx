import React, { useState } from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { ENDPOINT } from "../api/api";
import { Transaction } from "../model/Transaction";
import TransactionsList from "../transactions-list/TransactionsList";

const NextBlock = () => {
  const [pendingTransactions, setPendingTransactions] = useState<
    Transaction[] | undefined
  >();

  const fetchPendingTransactions = async () => {
    const response = await fetch(`${ENDPOINT}/pendingTransactions`);
    const data = await response.json();
    if (data) {
      setPendingTransactions(data);
    } else {
      setPendingTransactions(undefined);
    }
  };

  const mineNewBlock = async () => {
    await fetch(`${ENDPOINT}/kickMining`);
    setPendingTransactions(undefined);
  };

  useEffect(() => {
    fetchPendingTransactions();
  }, []);

  return (
    <>
      {pendingTransactions && pendingTransactions.length > 0 && (
        <div>
          <h2>
            Trigger Miner
            <span>
              <Button
                data-testid="miningButton"
                variant="primary"
                onClick={() => mineNewBlock()}
              >
                NEW BLOCK
              </Button>
            </span>
          </h2>
          <TransactionsList transactionsList={pendingTransactions || []} />
        </div>
      )}
      {(!pendingTransactions || pendingTransactions.length === 0) && (
        <h2 data-testid="no-transactions-message">NO TRANSACTIONS PENDING</h2>
      )}
    </>
  );
};

export default NextBlock;
