import { render, screen } from "@testing-library/react";
import React from "react";

import "@testing-library/jest-dom/extend-expect";
import Layout from "./Layout";

describe("<Layout />", () => {
  test("it should mount", () => {
    render(<Layout />);

    const templateName = screen.getByTestId("Layout");

    expect(templateName).toBeInTheDocument();
  });
});
