import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import Button from "../../src/components/Inputs/Button";

afterEach(cleanup);

describe("Button", () => {
  it("should render", () => {
    render(<Button>Hello</Button>);
    expect(screen.getByText(/hello/i)).toBeTruthy();
  });

  it("should be clickable", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);

    fireEvent.click(screen.getByText(/clickable/i));

    expect(handleClick).toBeCalled();
  });

  it("should not call onClick when disabled", () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    );

    fireEvent.click(screen.getByText(/disabled/i));

    expect(handleClick).not.toBeCalled();
  });

  it("should not call onClick when loading", () => {
    const handleClick = vi.fn();
    render(
      <Button loading onClick={handleClick}>
        Doing something
      </Button>
    );

    fireEvent.click(screen.getByText(/doing something/i));

    expect(handleClick).not.toBeCalled();
  });

  it("should render loading indicator when loading", () => {
    render(<Button loading>Doing something</Button>);

    expect(screen.getByText(/loading.../i)).toBeTruthy();
  });
});
