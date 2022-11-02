import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function search(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // If userId provided will return all posts from that user that match the search query
  // else if collectionId provided will return all posts in that collection that match the search query
  // otherwise will return all posts of all users that match the search criteria

  const prisma = new PrismaClient();
  const query = req.query;

  if (!query.search) {
    res.statusCode = 400;
    res.json({ Error: "You are missing the search parameter" });
    return;
  }

  if (Array.isArray(query.search)) {
    res.statusCode = 400;
    res.json({ Error: "search param cannot be a string array" });
    return;
  }

  const search: string = query.search;

  if (query.userID) {
    const SearchedPostsOfUser = await prisma.post.findMany({
      where: {
        authorId: String(query.userID),
        prompt: {
          search: String(search),
        },
      },
      orderBy: {
        dateCreated: "desc",
      },
      select: {
        id: true,
        dateCreated: true,
        prompt: true,
        imageURL: true,
        author: {
          select: {
            name: true,
            id: true,
          },
        },
        likes: true,
      },
    });
    res.json({ SearchedPostsOfUser });
  } else if (query.CollectionId) {
    const SearchedPostsOfCollection = await prisma.collection.findUnique({
      where: {
        id: String(query.collectionId),
      },
      select: {
        posts: {
          orderBy: {
            dateCreated: "desc",
          },
          select: {
            id: true,
            dateCreated: true,
            prompt: true,
            imageURL: true,
            author: {
              select: {
                name: true,
                id: true,
              },
            },
            likes: true,
          },
        },
      },
    });

    let matchedPosts;
    if (SearchedPostsOfCollection) {
      const posts = SearchedPostsOfCollection.posts;
      if (posts) {
        matchedPosts = posts.filter((post: { prompt: string }) =>
          post.prompt.toLowerCase().includes(search.toLowerCase())
        );
      }
    }
    res.json({ matchedPosts });
  } else {
    const SearchedPostsOfAllUsers = await prisma.post.findMany({
      where: {
        prompt: {
          search: String(query.search),
        },
      },
      orderBy: {
        dateCreated: "desc",
      },
      select: {
        id: true,
        dateCreated: true,
        prompt: true,
        imageURL: true,
        author: {
          select: {
            name: true,
            id: true,
          },
        },
        likes: true,
      },
    });
    res.json({ SearchedPostsOfAllUsers });
  }
}
