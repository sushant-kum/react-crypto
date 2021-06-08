import { render, screen } from "@testing-library/react";
import React from "react";

import "@testing-library/jest-dom/extend-expect";
import MarketCard from "./MarketCard";

describe("<MarketCard />", () => {
  test("it should mount", () => {
    render(<MarketCard />);

    const templateName = screen.getByTestId("MarketCard");

    expect(templateName).toBeInTheDocument();
  });
});
