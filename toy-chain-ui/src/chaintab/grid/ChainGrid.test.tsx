import React from "react";
import { render, screen } from "@testing-library/react";
import ChainGrid from "./ChainGrid";
import { Block } from "../../model/Block";

test("renders a grid with all the blocks", () => {
  const block: Block = {
    hash: "abc222",
    previousHash: "abc111",
    timestamp: Date.now().toString(),
  };

  render(<ChainGrid blocksList={[block]} />);

  const blockByHash = screen.getByText(block.hash);
  expect(blockByHash).toBeInTheDocument();
});
