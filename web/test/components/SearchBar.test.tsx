import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import SearchBar from "../../src/components/Inputs/SearchBar";

afterEach(cleanup);

describe("SearchBar", () => {
  it("should render", () => {
    render(<SearchBar value={"big cat"} onValueChange={() => {}} />);

    expect(screen.getByRole("textbox")).toBeTruthy();
  });

  it("should not render the clear button when the search is empty", () => {
    render(<SearchBar value={""} onValueChange={() => {}} />);

    expect(screen.queryByRole("button")).toBeNull();
  });

  it("should render with a clear button when there is text", () => {
    render(<SearchBar value={"big cat"} onValueChange={() => {}} />);

    expect(screen.getByRole("button")).toBeTruthy();
  });
});
