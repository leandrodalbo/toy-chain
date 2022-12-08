import React from "react";
import { render, screen } from "@testing-library/react";
import Chain from "./Chain";
import { Block } from "../../model/Block";

test("renders a grid with all the blocks", () => {
  render(<Chain />);

  const chain = screen.getByTestId("chainComponent");
  expect(chain).toBeInTheDocument();
});
