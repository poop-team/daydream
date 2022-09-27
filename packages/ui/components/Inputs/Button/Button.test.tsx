import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Button from "./Button";

describe("Running test for Button component", () => {
  test("Check Button Disabled", () => {
    render(<Button text={"a disabled button"} disabled />);
    expect(
      screen.getByRole("button", { name: "a disabled button" })
    ).toBeDisabled();
  });
});
