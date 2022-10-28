import Image from "next/future/image";
import { useState } from "react";

import ImageDialog from "../Dialogs/ImageDialog";
import Author from "../Widgets/Author";
import LikesCounter from "../Widgets/LikesCounter";
import Card from "./Card";

interface Props {
  src: string;
  prompt: string;
  likes: number;
  authorName: string;
  authorAvatar: string;
  showDialog?: boolean;
  className?: string;
}

export default function ImageCard({
  src,
  prompt,
  likes,
  authorName,
  authorAvatar,
  showDialog = true,
  className = "",
}: Props) {
  //#region Hooks

  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  //#endregion

  return (
    <>
      <Card
        className={`group relative aspect-square cursor-pointer select-none overflow-hidden bg-slate-500 p-6 
      transition-all duration-200 ease-out hover:shadow-2xl sm:hover:scale-[103%] ${className}`}
        onClick={handleDialogOpen}
      >
        <Image
          src={src}
          alt={prompt}
          fill
          priority
          sizes={
            "(max-width: 600px) 40vw, (max-width: 1024px) 30vw, (max-width: 1536px) 22vw, 18vw"
          }
          className={
            "scale-[103%] transition-all duration-200 ease-out sm:group-hover:scale-100 sm:group-hover:blur-sm sm:group-hover:brightness-[30%]"
          }
        />
        <div
          className={
            "relative hidden h-full flex-col justify-between text-slate-50 opacity-0 transition-all duration-200 ease-out group-hover:opacity-100 sm:flex sm:gap-2 lg:gap-4"
          }
        >
          <LikesCounter
            likes={likes}
            // TODO: Connect isLiked once the API calls are set up
            isLiked={false}
            className={"justify-end"}
          />
          <p className={"text-center sm:line-clamp-2 md:line-clamp-4"}>
            {prompt}
          </p>
          <Author
            authorName={authorName}
            authorAvatar={authorAvatar}
            className={"justify-center"}
          />
        </div>
      </Card>
      <ImageDialog
        src={src}
        prompt={prompt}
        likes={likes}
        isLiked={false}
        // TODO: Connect onLikedChange once the API calls are set up
        onLikedChange={() => {}}
        authorName={authorName}
        authorAvatar={authorAvatar}
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
      />
    </>
  );
}
