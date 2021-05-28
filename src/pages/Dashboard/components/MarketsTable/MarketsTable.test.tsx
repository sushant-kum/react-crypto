import { render, screen } from "@testing-library/react";
import React from "react";

import "@testing-library/jest-dom/extend-expect";
import MarketsTable from "./MarketsTable";

describe("<MarketsTable />", () => {
  test("it should mount", () => {
    render(<MarketsTable />);

    const templateName = screen.getByTestId("MarketsTable");

    expect(templateName).toBeInTheDocument();
  });
});
