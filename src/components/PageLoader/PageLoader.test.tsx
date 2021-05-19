import { render, screen } from "@testing-library/react";
import React from "react";

import "@testing-library/jest-dom/extend-expect";
import PageLoader from "./PageLoader";

describe("<PageLoader />", () => {
  test("it should mount", () => {
    render(<PageLoader />);

    const templateName = screen.getByTestId("PageLoader");

    expect(templateName).toBeInTheDocument();
  });
});
