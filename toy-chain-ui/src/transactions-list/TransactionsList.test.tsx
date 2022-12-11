import React from "react";
import { render, screen } from "@testing-library/react";
import TransactionsList from "./TransactionsList";
import { Transaction } from "../model/Transaction";

test("renders a table with all the transactions", () => {
  const transactions: Transaction[] = [
    {
      blockHash: "abc111",
      hash: "abc113",
      timestamp: Date.now().toString(),
      sender: "any@any.com",
      receiver: "any@any.com",
      amount: 111,
    },
  ];

  render(<TransactionsList transactionsList={transactions} />);

  const blockByHash = screen.getByText(transactions[0].blockHash as string);
  expect(blockByHash).toBeInTheDocument();
});
