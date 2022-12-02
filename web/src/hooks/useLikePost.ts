import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { likePost, unlikePost } from "../requests/mutate";

interface Params {
  postId: string;
  initialLikeCount: number;
  initialIsLiked: boolean;
}
export default function useLikePost({
  postId,
  initialLikeCount,
  initialIsLiked,
}: Params) {
  // Tracks a local version of whether the post is liked or not which is updated immediately
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  const { mutate: mutateLike, isLoading: isLiking } = useMutation({
    mutationKey: ["like"],
    mutationFn: () => likePost(postId),
    onError: (err: Error) => {
      setIsLiked(false); // Revert the local state on failure
      toast.error(err.message);
    },
  });

  const { mutate: mutateUnlike, isLoading: isUnliking } = useMutation({
    mutationKey: ["unlike"],
    mutationFn: () => unlikePost(postId),
    onError: (err: Error) => {
      setIsLiked(true); // Revert the local state on failure
      toast.error(err.message);
    },
  });

  useEffect(() => {
    setIsLiked(initialIsLiked);
  }, [initialIsLiked]);

  const mutateLikeChange = (isLiked: boolean) => {
    if (!isLiking && !isUnliking) {
      setIsLiked(isLiked); // Optimistically update the local state
      if (isLiked) {
        mutateLike();
      } else {
        mutateUnlike();
      }
    }
  };

  // Tracks a local version of the likes counter which is updated immediately
  const localLikes =
    isLiked && !initialIsLiked
      ? initialLikeCount + 1
      : !isLiked && initialIsLiked
      ? initialLikeCount - 1
      : initialLikeCount;

  return {
    isLiked: isLiked,
    likeCount: localLikes,
    isLoading: isLiking || isUnliking,
    mutateLikeChange,
  };
}
