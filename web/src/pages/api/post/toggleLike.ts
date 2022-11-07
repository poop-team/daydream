import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";
import { validateRequest } from "../../../utils/jwt";

interface Request extends NextApiRequest {
    body: {
        userId: string;
        postId: string;
    };
}

export default async function createCollection(
    req: Request,
    res: NextApiResponse
) {
    // Validate if the user has a valid JWT token
    // if (!(await validateRequest(req))) {
    //     return res.status(401).json({ error: "User not logged in." });
    // }

    const { userId, postId } = req.body;

    if (!postId) {
        return res.status(400).json("Give me post to like");
    }

    const postToLike = await prisma.post.findFirst({
        where: {
            id: String(postId),
        },
    });

    if (!postToLike) {
        return res.status(400).json("give me a valid postId");
    }
    // check if post is already liked. If it is then unlike it.
    const isAlreadyLiked = await prisma.like.findFirst({
        where: {
            userId: userId,
            postID: postId,
        },
    });

    if (isAlreadyLiked) {
        await prisma.like.create({
            data: {
                userId: userId,
                postID: postId,
            },
        });
    } else {
        await prisma.like.delete({
            where: {
                userId_postID: {
                    userId: userId,
                    postID: postId,
                },
            },
        });
    }

    res.status(200).json({ success: true });
}
