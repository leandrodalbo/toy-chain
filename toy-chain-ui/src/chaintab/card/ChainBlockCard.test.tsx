import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import ChainBlockCard from "./ChainBlockCard";
import { Block } from "../../model/Block";
import { Transaction } from "../../model/Transaction";

const transaction: Transaction = {
  hash: "trabc234",
  blockHash: "abc222",
  timestamp: Date.now().toString(),
  sender: "any@any.com",
  receiver: "any@any.com",
  amount: 101,
};

const block: Block = {
  hash: "abc222",
  previousHash: "abc111",
  timestamp: Date.now().toString(),
  transactions: [transaction],
};

test("renders a block card with all the details", () => {
  render(<ChainBlockCard block={block} />);

  const hash = screen.getByText(block.hash);
  const previousHash = screen.getByText(block.previousHash);

  expect(hash).toBeInTheDocument();
  expect(previousHash).toBeInTheDocument();
});

test("display transansactions when the user focus on them", async () => {
  render(<ChainBlockCard block={block} />);

  await act(async () => {
    fireEvent.focus(screen.getByTestId("transactions-button"));
  });

  expect(screen.getByText(transaction.hash as string)).toBeInTheDocument();
});
