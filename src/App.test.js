import React from "react";
import { render, getByTestId } from "@testing-library/react";
import App from "./App";

test("renders app", () => {
  const { getByTestId } = render(<App />);
  const appElement = getByTestId("app");
  expect(appElement).toBeInTheDocument();
});
