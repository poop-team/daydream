import Image from "next/future/image";
import { useState } from "react";
import { MdAccountCircle, MdSave } from "react-icons/md";

import ImageDialog from "../Dialogs/ImageDialog";
import Card from "./Card";

interface Props {
  src: string;
  prompt: string;
  saveCount: number;
  authorName: string;
  authorAvatar: string;
  showDialog?: boolean;
  className?: string;
}

export default function ImageCard({
  src,
  prompt,
  saveCount,
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
            <p>{saveCount.toLocaleString()}</p>
            <MdSave className={"h-5 w-5"} />
          </div>
          <p className={"line-clamp-10"}>{prompt}</p>
          <div className={"mt-auto flex items-center justify-center gap-2"}>
            <div className={"relative h-8 w-8"}>
              {authorAvatar ? (
                <Image
                  src={authorAvatar}
                  alt={authorName}
                  fill
                  priority
                  sizes={"2rem"}
                  className={"rounded-full"}
                />
              ) : (
                <MdAccountCircle className={"h-full w-full"} />
              )}
            </div>
            <p className={"overflow-hidden text-ellipsis whitespace-nowrap"}>
              By <b>{authorName}</b>
            </p>
          </div>
        </div>
      </Card>
      <ImageDialog
        src={src}
        prompt={prompt}
        saveCount={saveCount}
        authorName={authorName}
        authorAvatar={authorAvatar}
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
      />
    </>
  );
}
