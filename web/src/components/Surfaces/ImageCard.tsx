import { useState } from "react";

import CustomImage from "../CustomImage";
import ImageDialog from "../Dialogs/ImageDialog";
import Author from "../Widgets/Author";
import LikesCounter from "../Widgets/LikesCounter";
import Card from "./Card";

interface Props {
  id: string;
  src: string;
  prompt: string;
  likes: number;
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
        id={id}
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
