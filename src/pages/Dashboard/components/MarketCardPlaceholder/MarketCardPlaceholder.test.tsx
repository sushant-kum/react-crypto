import { render, screen } from "@testing-library/react";
import React from "react";

import "@testing-library/jest-dom/extend-expect";
import MarketCardPlaceholder from "./MarketCardPlaceholder";

describe("<MarketCardPlaceholder />", () => {
  test("it should mount", () => {
    render(<MarketCardPlaceholder />);

    const templateName = screen.getByTestId("MarketCardPlaceholder");

    expect(templateName).toBeInTheDocument();
  });
});
