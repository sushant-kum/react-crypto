import { render, screen } from "@testing-library/react";
import React from "react";

import "@testing-library/jest-dom/extend-expect";
import Header from "./Header";

describe("<Header />", () => {
  test("it should mount", () => {
    render(<Header />);

    const templateName = screen.getByTestId("Header");

    expect(templateName).toBeInTheDocument();
  });
});
