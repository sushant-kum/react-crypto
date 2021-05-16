import { render, screen } from "@testing-library/react";
import React from "react";

import "@testing-library/jest-dom/extend-expect";
import Dashboard from "./Dashboard";

describe("<Dashboard />", () => {
  test("it should mount", () => {
    render(<Dashboard />);

    const templateName = screen.getByTestId("Dashboard");

    expect(templateName).toBeInTheDocument();
  });
});
