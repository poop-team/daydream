import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import TextField from "../../src/components/Inputs/TextField";

afterEach(cleanup);

describe("TextField", () => {
  it("should render", () => {
    render(<TextField />);

    expect(screen.getByRole("textbox")).toBeTruthy();
  });

  it("should render with a label", () => {
    render(<TextField label="Username:" />);

    expect(screen.getByText(/username:/i)).toBeTruthy();
  });

  it("should render with a placeholder", () => {
    render(<TextField placeholder="Enter your username here..." />);

    expect(
      screen.getByPlaceholderText(/enter your username here.../i)
    ).toBeTruthy();
  });

  it("should render with a value", () => {
    render(<TextField value="garfield" onChange={() => {}} />);

    expect(screen.getByDisplayValue(/garfield/i)).toBeTruthy();
  });

  it("should render with a helper text", () => {
    render(<TextField helperText="This is a helper text" />);

    expect(screen.getByText(/this is a helper text/i)).toBeTruthy();
  });

  it("should be disabled", () => {
    render(<TextField disabled />);

    expect(screen.getByRole("textbox")).toHaveProperty("disabled", true);
  });

  it("should be in an error state", () => {
    render(<TextField error />);

    expect(
      screen.getByRole("textbox").classList.contains("border-red-500")
    ).toBeTruthy();
  });
});
