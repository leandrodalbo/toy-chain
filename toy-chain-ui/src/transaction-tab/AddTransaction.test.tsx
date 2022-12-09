import React from "react";
import { act } from "react-dom/test-utils";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AddTransaction from "./AddTransaction";
import { Transaction } from "../model/Transaction";
import { wait } from "@testing-library/user-event/dist/utils";

const transaction: Transaction = {
  hash: "abc222",
  sender: "lea@somemail.com",
  receiver: "lea@someothermail.com",
  amount: 101,
};

test("renders a form with the right input fields", () => {
  render(<AddTransaction />);

  const sender = screen.getByText("Sender Address");
  const receiver = screen.getByText("Receiver Address");
  const amount = screen.getByText("Amount");

  expect(sender).toBeInTheDocument();
  expect(receiver).toBeInTheDocument();
  expect(amount).toBeInTheDocument();
});

test("renders the new saved transaction hash", async () => {
  const fetchPostMock = jest
    .spyOn(global, "fetch")
    .mockImplementation(() =>
      Promise.resolve({ json: () => Promise.resolve(transaction) } as Response)
    );

  render(<AddTransaction />);

  await act(async () => {
    fireEvent.input(screen.getByTestId("trxSenderEmail"), {
      target: { value: transaction.sender },
    });
    fireEvent.input(screen.getByTestId("trxReceiverEmail"), {
      target: { value: transaction.receiver },
    });
    fireEvent.input(screen.getByTestId("trxAmount"), {
      target: { value: transaction.amount },
    });
    fireEvent.click(screen.getByTestId("confirmTransactionButton"));
  });

  expect(fetchPostMock).toHaveBeenCalled();
});
