import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import ImageList from "../../src/components/Layout/ImageList";
import { Post } from "../../src/types/post.type";
import { createQueryWrapper } from "./Wrappers";

const posts = [
  {
    dateCreated: new Date(),
    id: "1",
    prompt: "chonky cat 1",
    imageURL: "https://example.com/image.png",
    author: {
      id: "1",
      name: "garfield",
      image: "https://example.com/garfield.png",
    },
    likeCount: 3,
    isLiked: false,
  },
] as Post[];
posts.push({
  ...posts[0],
  id: "2",
  prompt: "chonky cat 2",
  imageURL: "https://example.com/image2.png",
});

afterEach(cleanup);

describe("ImageList", () => {
  it("should render with no posts", () => {
    render(
      <ImageList
        posts={[]}
        arePostsLoading={false}
        noPostsMessage={"No posts found"}
      />,
      { wrapper: createQueryWrapper() }
    );

    expect(screen.getByText(/no posts found/i)).toBeTruthy();
  });

  it("should render with posts", () => {
    render(<ImageList posts={posts} arePostsLoading={false} />, {
      wrapper: createQueryWrapper(),
    });

    expect(screen.getByRole("img", { name: /chonky cat 1/i })).toBeTruthy();
  });

  it("should render more than one post", () => {
    render(<ImageList posts={posts} arePostsLoading={false} />, {
      wrapper: createQueryWrapper(),
    });

    expect(
      screen.getAllByRole("img", { name: /(chonky cat 1)|(chonky cat 2)/i })
    ).toHaveLength(2);
  });

  it("should still render posts when loading", () => {
    render(<ImageList posts={posts} arePostsLoading={true} />, {
      wrapper: createQueryWrapper(),
    });

    expect(screen.getByRole("img", { name: /chonky cat 1/i })).toBeTruthy();
  });

  it("should render loading indicator when loading and no existing posts", () => {
    render(<ImageList posts={[]} arePostsLoading={true} />, {
      wrapper: createQueryWrapper(),
    });

    expect(screen.getByText(/loading.../i)).toBeTruthy();
  });

  it("should render a loading indicator when loading more posts", () => {
    render(
      <ImageList
        posts={posts}
        arePostsLoading={false}
        areMorePostsLoading={true}
      />,
      { wrapper: createQueryWrapper() }
    );

    expect(screen.getByText(/loading.../i)).toBeTruthy();
  });
});
