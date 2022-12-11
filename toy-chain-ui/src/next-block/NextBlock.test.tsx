import React from "react";
import { fireEvent, getByText, render, screen } from "@testing-library/react";
import NextBlock from "./NextBlock";
import { Transaction } from "../model/Transaction";
import { act } from "react-dom/test-utils";

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

test("renders pending transactions after fetch", async () => {
  const initialfetchMock = jest
    .spyOn(global, "fetch")
    .mockImplementationOnce(() =>
      Promise.resolve({ json: () => Promise.resolve(transactions) } as Response)
    );

  await act(async () => {
    render(<NextBlock />);
  });

  expect(initialfetchMock).toHaveBeenCalled();
  expect(screen.getByTestId("miningButton")).toBeInTheDocument();
  expect(screen.getByText(transactions[0].hash as string)).toBeInTheDocument();
});

test("should trigger mining on click", async () => {
  const initialfetchMock = jest
    .spyOn(global, "fetch")
    .mockImplementation(() =>
      Promise.resolve({ json: () => Promise.resolve(transactions) } as Response)
    );

  await act(async () => {
    render(<NextBlock />);
  });

  const miningfetchMock = jest
    .spyOn(global, "fetch")
    .mockImplementationOnce(() =>
      Promise.resolve({ json: () => Promise.resolve(transactions) } as Response)
    );

  await act(async () => {
    fireEvent.click(screen.getByTestId("miningButton"));
  });

  expect(initialfetchMock).toHaveBeenCalled();
  expect(miningfetchMock).toHaveBeenCalled();
});

test("renders a message without transactions", async () => {
  const initialfetchMock = jest
    .spyOn(global, "fetch")
    .mockImplementation(() =>
      Promise.resolve({ json: () => Promise.resolve([]) } as Response)
    );

  await act(async () => {
    render(<NextBlock />);
  });

  expect(screen.getByTestId("no-transactions-message")).toBeInTheDocument();
});
