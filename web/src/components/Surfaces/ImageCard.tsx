import Image from "next/future/image";
import { useState } from "react";
import { MdFavorite } from "react-icons/md";

import ImageDialog from "../Dialogs/ImageDialog";
import Author from "../Widgets/Author";
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
        className={`group relative h-96 w-96 cursor-pointer select-none overflow-hidden bg-slate-500 p-6 transition-all 
      duration-200 ease-out hover:scale-[103%] hover:shadow-2xl ${className}`}
        onClick={handleDialogOpen}
      >
        <Image
          src={src}
          alt={prompt}
          fill
          priority
          sizes={
            "(max-width: 600px) 80vw, (max-width: 768px) 50vw, (max-width: 1200px) 30vw, 20vw"
          }
          className={
            "scale-[103%] transition-all duration-200 ease-out group-hover:scale-100 group-hover:blur-sm group-hover:brightness-[30%]"
          }
        />
        <div
          className={
            "relative flex h-full flex-col gap-4 text-slate-50 opacity-0 transition-all duration-200 ease-out group-hover:opacity-100"
          }
        >
          <div className={"flex items-center justify-end gap-1"}>
            <p>{likes.toLocaleString()}</p>
            <MdFavorite className={"h-5 w-5"} />
          </div>
          <p className={"line-clamp-10"}>{prompt}</p>
          <Author
            authorName={authorName}
            authorAvatar={authorAvatar}
            className={"mt-auto justify-center"}
          />
        </div>
      </Card>
      <ImageDialog
        src={src}
        prompt={prompt}
        likes={likes}
        authorName={authorName}
        authorAvatar={authorAvatar}
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
      />
    </>
  );
}
