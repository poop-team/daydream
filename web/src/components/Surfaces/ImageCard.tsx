import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { likePost, unlikePost } from "../../requests/mutate";
import ImageDialog from "../Dialogs/ImageDialog";
import Author from "../Widgets/Author";
import LikesCounter from "../Widgets/LikesCounter";
import Card from "./Card";
import CustomImage from "./CustomImage";

interface Props {
  id: string;
  src: string;
  prompt: string;
  likes: number;
  isLiked: boolean;
  authorName: string;
  authorAvatar?: string | null;
  showDialog?: boolean;
  className?: string;
}

export default function ImageCard({
  id,
  src,
  prompt,
  likes,
  isLiked,
  authorName,
  authorAvatar,
  showDialog = true,
  className = "",
}: Props) {
  //#region Hooks

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // Tracks a local version of whether the post is liked or not which is updated immediately
  const [localIsLiked, setLocalIsLiked] = useState(isLiked);

  const { mutate: mutateLike, isLoading: isLiking } = useMutation({
    mutationKey: ["like"],
    mutationFn: () => likePost(id),
    onError: (err: Error) => {
      setLocalIsLiked(false); // Revert the local state on failure
      toast.error(err.message);
    },
  });

  const { mutate: mutateUnlike, isLoading: isUnliking } = useMutation({
    mutationKey: ["unlike"],
    mutationFn: () => unlikePost(id),
    onError: (err: Error) => {
      setLocalIsLiked(true); // Revert the local state on failure
      toast.error(err.message);
    },
  });

  useEffect(() => {
    setLocalIsLiked(isLiked);
  }, [isLiked]);

  //#endregion

  //#region Handlers

  const handleDialogOpen = () => {
    if (showDialog) {
      setIsDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleLikeChange = (isLiked: boolean) => {
    if (!isLiking && !isUnliking) {
      setLocalIsLiked(isLiked); // Optimistically update the local state
      if (isLiked) {
        mutateLike();
      } else {
        mutateUnlike();
      }
    }
  };

  //#endregion

  //#region Derived State

  // Tracks a local version of the likes counter which is updated immediately
  const localLikes =
    localIsLiked && !isLiked
      ? likes + 1
      : !localIsLiked && isLiked
      ? likes - 1
      : likes;

  // We might use this split prompt to classify the styles used later on
  const splitPrompt = prompt.split(/[,.]/).filter((word) => word.length > 0);
  const promptPreview = splitPrompt[0];

  //#endregion

  return (
    <>
      <Card
        tabIndex={1}
        className={`group relative aspect-square cursor-pointer select-none overflow-hidden transition-all duration-200 ease-out 
        hover:shadow-2xl focus-visible:scale-90 focus-visible:ring-4 focus-visible:ring-indigo-800 focus-visible:ring-offset-4 sm:hover:scale-[103%] ${className}`}
        onClick={handleDialogOpen}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            handleDialogOpen();
          }
        }}
      >
        <CustomImage
          src={src}
          alt={prompt}
          fill
          priority
          sizes={
            "(max-width: 600px) 40vw, (max-width: 1024px) 30vw, (max-width: 1650px) 22vw, 36rem"
          }
          containerClassName={"absolute"}
          className={
            "scale-[103%] sm:group-hover:scale-100 sm:group-hover:blur-sm sm:group-hover:brightness-[40%]"
          }
        />
        <div
          className={
            "relative hidden h-full flex-col justify-between p-3 text-slate-50 opacity-0 transition-all duration-200 ease-out group-hover:opacity-100 sm:flex sm:gap-2 lg:gap-4 lg:p-6"
          }
        >
          <LikesCounter
            likes={localLikes}
            isLiked={localIsLiked}
            className={"justify-end"}
          />
          <p className={"text-center text-lg sm:line-clamp-2 md:line-clamp-3"}>
            {/* Only the first sentence/section of the prompt which contains the main topic will be displayed here */}
            {promptPreview}
          </p>
          <Author
            authorName={authorName}
            authorAvatar={authorAvatar}
            className={"justify-center"}
          />
        </div>
      </Card>
      <ImageDialog
        id={id}
        src={src}
        prompt={prompt}
        likes={localLikes}
        isLiked={localIsLiked}
        onLikedChange={handleLikeChange}
        authorName={authorName}
        authorAvatar={authorAvatar}
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
      />
    </>
  );
}
