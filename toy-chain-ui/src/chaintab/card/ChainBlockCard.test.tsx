import React from "react";
import { render, screen } from "@testing-library/react";
import ChainBlockCard from "./ChainBlockCard";
import { Block } from "../../model/Block";

test("renders a block card with all the details", () => {
  const block: Block = {
    hash: "abc222",
    previousHash: "abc111",
    timestamp: Date.now().toString(),
  };

  render(<ChainBlockCard block={block} />);

  const hash = screen.getByText(block.hash);
  const previousHash = screen.getByText(block.previousHash);

  expect(hash).toBeInTheDocument();
  expect(previousHash).toBeInTheDocument();
});
