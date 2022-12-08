import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders react app component with navingation links and routes", () => {
  render(<App />);

  const links = screen.getByTestId("navigationLinks");
  const routes = screen.getByTestId("navigationRoutes");

  expect(links).toBeInTheDocument();
  expect(routes).toBeInTheDocument();
});
