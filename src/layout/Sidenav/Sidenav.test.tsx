import { render, screen } from "@testing-library/react";
import React from "react";

import "@testing-library/jest-dom/extend-expect";
import Sidenav from "./Sidenav";

describe("<Sidenav />", () => {
  test("it should mount", () => {
    render(<Sidenav />);

    const templateName = screen.getByTestId("Sidenav");

    expect(templateName).toBeInTheDocument();
  });
});
