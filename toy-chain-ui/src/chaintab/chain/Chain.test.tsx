import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Chain from "./Chain";
import { Block } from "../../model/Block";
import { ENDPOINT } from "../../api/api";
import { act } from "react-dom/test-utils";

const block: Block = {
  hash: "abc222",
  previousHash: "abc111",
  timestamp: Date.now().toString(),
};

test("renders the seed after being created", async () => {
  const initialfetchMock = jest
    .spyOn(global, "fetch")
    .mockImplementation(() =>
      Promise.resolve({ json: () => Promise.resolve([]) } as Response)
    );

  await act(async () => {
    render(<Chain />);
  });

  expect(initialfetchMock).toHaveBeenCalled();
  expect(screen.getByTestId("SeedingButton")).toBeInTheDocument();

  const seedingFetch = jest
    .spyOn(global, "fetch")
    .mockImplementation(() =>
      Promise.resolve({ json: () => Promise.resolve(block) } as Response)
    );

  await act(async () => {
    fireEvent.click(screen.getByTestId("SeedingButton"));
  });

  expect(seedingFetch).toHaveBeenCalled();
  expect(screen.getByText(block.hash)).toBeInTheDocument();
});

test("renders a grid with all the blocks", async () => {
  const fetchMock = jest
    .spyOn(global, "fetch")
    .mockImplementation(() =>
      Promise.resolve({ json: () => Promise.resolve([block]) } as Response)
    );

  await act(async () => {
    render(<Chain />);
  });

  expect(fetchMock).toHaveBeenCalled();
  expect(screen.getByText(block.hash)).toBeInTheDocument();
});

test("renders seeding button if there is no blocks", async () => {
  const fetchMock = jest
    .spyOn(global, "fetch")
    .mockImplementation(() =>
      Promise.resolve({ json: () => Promise.resolve([]) } as Response)
    );

  await act(async () => {
    render(<Chain />);
  });

  expect(fetchMock).toHaveBeenCalled();
  expect(screen.getByText("Seed Chain")).toBeInTheDocument();
});

test("renders an error message if request fails", async () => {
  const fetchMock = jest
    .spyOn(global, "fetch")
    .mockImplementation(() =>
      Promise.resolve({ json: () => Promise.reject() } as Response)
    );

  await act(async () => {
    render(<Chain />);
  });

  expect(fetchMock).toHaveBeenCalled();
  expect(screen.getByText("Error Fetching Blocks")).toBeInTheDocument();
});
