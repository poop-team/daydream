import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import ImageCard from "../../src/components/Surfaces/ImageCard";
import { createQueryWrapper } from "./Wrappers";

const DefaultImageCard = (
  <ImageCard
    authorAvatar={"https://example.com/garfieldpfp.jpg"}
    authorName={"garfield"}
    id={"777"}
    isLiked={false}
    likeCount={69}
    src={"https://example.com/garfield.jpg"}
    prompt={"Big cat, big appetite"}
  />
);

const DisabledDialogImageCard = (
  <ImageCard
    authorAvatar={"https://example.com/garfieldpfp.jpg"}
    authorName={"garfield"}
    id={"777"}
    isLiked={false}
    likeCount={69}
    src={"https://example.com/garfield.jpg"}
    prompt={"Big cat, big appetite"}
    showDialog={false}
  />
);

afterEach(cleanup);

describe("ImageCard", () => {
  it("should render", () => {
    render(DefaultImageCard, { wrapper: createQueryWrapper() });

    expect(
      screen.getByRole("img", { name: /big cat, big appetite/i })
    ).toBeTruthy();
  });

  it("should render with author", () => {
    render(DefaultImageCard, { wrapper: createQueryWrapper() });

    expect(screen.getByText(/garfield/i)).toBeTruthy();
  });

  it("should render with author avatar", () => {
    render(DefaultImageCard, { wrapper: createQueryWrapper() });

    expect(screen.getByRole("img", { name: /garfield/i })).toBeTruthy();
  });

  it("should render with a preview of the full prompt", () => {
    render(DefaultImageCard, { wrapper: createQueryWrapper() });

    expect(screen.getByText(/big cat/i)).toBeTruthy();
    expect(screen.queryByText(/big cat, big appetite/i)).toBeNull();
  });

  it("should render with like count", () => {
    render(DefaultImageCard, { wrapper: createQueryWrapper() });

    expect(screen.getByText(69)).toBeTruthy();
  });

  it("should not render dialog before clicking", () => {
    render(DefaultImageCard, { wrapper: createQueryWrapper() });

    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("should open dialog on click", () => {
    render(DefaultImageCard, { wrapper: createQueryWrapper() });

    fireEvent.click(
      screen.getByRole("img", { name: /big cat, big appetite/i })
    );

    expect(screen.getByRole("dialog")).toBeTruthy();
  });

  it("should not open dialog on click when disabled", () => {
    render(DisabledDialogImageCard, { wrapper: createQueryWrapper() });

    fireEvent.click(
      screen.getByRole("img", { name: /big cat, big appetite/i })
    );

    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
