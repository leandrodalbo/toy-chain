import React from "react";
import { render, screen } from "@testing-library/react";
import Chain from "./Chain";
import { Block } from "../../model/Block";

const block: Block = {
  hash: "abc222",
  previousHash: "abc111",
  timestamp: Date.now().toString(),
};

test("renders a grid with all the blocks", () => {
  global.fetch = jest.fn().mockImplementation(
    () =>
      new Promise<Block[]>((resolve) => {
        resolve([block]);
      })
  );
  render(<Chain />);

  const chain = screen.findByText(block.hash);

  expect(chain).toBeInTheDocument();
  expect(global.fetch).not.toHaveBeenCalled();

  jest.resetAllMocks();
});
