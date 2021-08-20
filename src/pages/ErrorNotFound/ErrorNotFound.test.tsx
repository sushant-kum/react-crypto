import { render, screen } from "@testing-library/react";
import React from "react";

import "@testing-library/jest-dom/extend-expect";
import ErrorNotFound from "./ErrorNotFound";

describe("<ErrorNotFound />", () => {
  test("it should mount", () => {
    render(<ErrorNotFound />);

    const templateName = screen.getByTestId("ErrorNotFound");

    expect(templateName).toBeInTheDocument();
  });
});
