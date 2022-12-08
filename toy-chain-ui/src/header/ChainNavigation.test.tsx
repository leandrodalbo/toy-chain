import React from "react";
import { HashRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import ChainNavigation from "./ChainNavigation";

test("renders navigation component with all tabs", () => {
  render(
    <Router>
      <ChainNavigation />
    </Router>
  );
  const chainTab = screen.getByText("CHAIN");
  const nextBlockTab = screen.getByText("NEXT BLOCK");
  const transactionTab = screen.getByText("TRANSACTION");

  expect(chainTab).toBeInTheDocument();
  expect(nextBlockTab).toBeInTheDocument();
  expect(transactionTab).toBeInTheDocument();
});
