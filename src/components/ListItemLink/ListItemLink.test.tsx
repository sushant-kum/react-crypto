import { render, screen } from "@testing-library/react";
import React from "react";

import "@testing-library/jest-dom/extend-expect";
import ListItemLink from "./ListItemLink";

describe("<ListItemLink />", () => {
  test("it should mount", () => {
    render(<ListItemLink />);

    const templateName = screen.getByTestId("ListItemLink");

    expect(templateName).toBeInTheDocument();
  });
});
