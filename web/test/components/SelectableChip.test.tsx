import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import SelectableChip from "../../src/components/Inputs/SelectableChip";

afterEach(cleanup);

describe("SelectableChip", () => {
  it("should render", () => {
    render(
      <SelectableChip label="realistic" selected={false} onSelect={() => {}} />
    );

    expect(screen.getByRole("button")).toBeTruthy();
  });

  it("should render with a label", () => {
    render(
      <SelectableChip label="realistic" selected={false} onSelect={() => {}} />
    );

    expect(screen.getByText("realistic")).toBeTruthy();
  });

  it("should call onSelect with parameters when clicked", () => {
    const onSelect = vi.fn();
    render(
      <SelectableChip label="realistic" selected={false} onSelect={onSelect} />
    );

    screen.getByRole("button").click();

    expect(onSelect).toBeCalledWith("realistic", true);
  });
});
