import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import CollectionList from "../../src/components/Layout/CollectionList";
import { Collection } from "../../src/types/collection.type";
import { createQueryWrapper } from "./Wrappers";

const collections = [
  {
    id: "1",
    name: "chonky cats 1",
    posts: [],
    postCount: 0,
  },
] as Collection[];
collections.push({
  ...collections[0],
  id: "2",
  name: "chonky cats 2",
});

afterEach(cleanup);

describe("CollectionList", () => {
  it("should render with no collections", () => {
    render(<CollectionList collections={[]} areCollectionsLoading={false} />, {
      wrapper: createQueryWrapper(),
    });

    expect(screen.getByText(/no collections to show/i)).toBeTruthy();
  });

  it("should render with collections", () => {
    render(
      <CollectionList
        collections={collections}
        areCollectionsLoading={false}
      />,
      {
        wrapper: createQueryWrapper(),
      }
    );

    expect(screen.getByText(/chonky cats 1/i)).toBeTruthy();
  });

  it("should render more than one collection", () => {
    render(
      <CollectionList
        collections={collections}
        areCollectionsLoading={false}
      />,
      {
        wrapper: createQueryWrapper(),
      }
    );

    expect(
      screen.getAllByText(/(chonky cats 1)|(chonky cats 2)/i)
    ).toHaveLength(2);
  });

  it("should still render collections when loading", () => {
    render(
      <CollectionList collections={collections} areCollectionsLoading={true} />,
      {
        wrapper: createQueryWrapper(),
      }
    );

    expect(screen.getByText(/chonky cats 1/i)).toBeTruthy();
  });

  it("should render loading indicator when loading and no existing collections", () => {
    render(<CollectionList collections={[]} areCollectionsLoading={true} />, {
      wrapper: createQueryWrapper(),
    });

    expect(screen.getByText(/loading.../i)).toBeTruthy();
  });

  it("should call onCollectionClick when a collection is clicked", () => {
    const onCollectionClick = vi.fn();
    render(
      <CollectionList
        collections={collections}
        areCollectionsLoading={false}
        onCollectionClick={onCollectionClick}
      />,
      {
        wrapper: createQueryWrapper(),
      }
    );

    screen.getByText(/chonky cats 1/i).click();

    expect(onCollectionClick).toBeCalledWith(collections[0]);
  });
});
