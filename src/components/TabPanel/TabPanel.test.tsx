import { render, screen } from "@testing-library/react";
import React from "react";

import "@testing-library/jest-dom/extend-expect";
import TabPanel from "./TabPanel";

describe("<TabPanel />", () => {
  test("it should mount", () => {
    render(<TabPanel />);

    const templateName = screen.getByTestId("TabPanel");

    expect(templateName).toBeInTheDocument();
  });
});
