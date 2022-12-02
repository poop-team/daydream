import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { MdLibraryAdd } from "react-icons/md";

import { useMediaQuery } from "../../hooks/useMediaQuery";
import { transitions } from "../../styles/motion-definitions";
import Button from "../Inputs/Button";
import AddToCollectionPanel from "../Panels/AddToCollectionPanel";
import Card from "../Surfaces/Card";
import CustomImage from "../Surfaces/CustomImage";
import Author from "../Widgets/Author";
import FloatingImageActions from "../Widgets/FloatingImageActions";
import LikesCounter from "../Widgets/LikesCounter";
import StyledDialog from "./StyledDialog";

interface Props {
  id: string;
  src: string;
  prompt: string;
  likes: number;
  isLiked: boolean;
  onLikedChange: (isLiked: boolean) => void;
  authorName: string;
  authorAvatar?: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageDialog({
  id,
  src,
  prompt,
  likes,
  isLiked,
  onLikedChange,
  authorName,
  authorAvatar,
  isOpen,
  onClose,
}: Props) {
  //#region Hooks

  const md = useMediaQuery("(min-width: 768px)");

  const [isAddToCollectionPanelOpen, setIsAddToCollectionPanelOpen] =
    useState(false);

  //#endregion

  //#region Handlers

  const handleDialogClose = () => {
    setIsAddToCollectionPanelOpen(false);
    onClose();
  };

  //#endregion

  //#region Derived

  const downloadLink = src.replace("_compressed", "");

  //#endregion

  return (
    <StyledDialog isOpen={isOpen} onClose={handleDialogClose}>
      <Card
        className={
          "relative flex max-h-[90vh] w-full flex-col overflow-hidden bg-slate-100 dark:bg-slate-800 md:aspect-video md:flex-row"
        }
      >
        <div className={"group relative z-0 aspect-square h-full w-full"}>
          <FloatingImageActions
            postId={id}
            downloadLink={downloadLink}
            className={`absolute left-1/2 top-2 z-10 -translate-x-1/2 opacity-0 transition-all delay-1000 duration-100 
            ease-out group-hover:opacity-100 group-hover:delay-200 group-focus:opacity-100 group-focus:delay-100`}
          />
          <CustomImage
            src={src}
            alt={prompt}
            fill
            priority
            quality={90}
            sizes={"(max-width: 768px) 100vw, 50vw"}
            className={"object-contain"}
            onClick={() => setIsAddToCollectionPanelOpen(false)}
          />
        </div>
        <div
          className={
            "flex w-full flex-col items-center gap-2 p-4 md:p-6 lg:gap-4"
          }
        >
          <div className={"flex w-full select-none justify-between"}>
            <Author
              authorName={authorName}
              authorAvatar={authorAvatar}
              className={"w-2/3 md:w-44 lg:w-72 xl:w-96"}
            />
            <LikesCounter
              likes={likes}
              isLiked={isLiked}
              onLikeClick={() => onLikedChange(!isLiked)}
            />
          </div>
          <p
            className={
              "basis-28 overflow-y-auto px-1 text-center text-lg sm:text-xl md:max-h-fit md:basis-full lg:text-2xl"
            }
          >
            {prompt}
          </p>
          <Button
            onClick={() => setIsAddToCollectionPanelOpen(true)}
            className={"mt-auto"}
          >
            Add to Collection
            <MdLibraryAdd className={"h-5 w-5"} />
          </Button>
        </div>
        <AnimatePresence initial={false}>
          {isAddToCollectionPanelOpen && (
            <motion.div
              initial={{
                opacity: 0,
                x: md ? "8%" : "0%",
                y: md ? "0%" : "8%",
              }}
              animate={{
                opacity: 1,
                x: md ? "4%" : "0%",
                y: md ? "0%" : "4%",
              }}
              exit={{
                opacity: 0,
                x: md ? "8%" : "0%",
                y: md ? "0%" : "8%",
              }}
              transition={transitions.springStiffer}
              className={"absolute right-0 bottom-0 h-full w-full shadow-2xl"}
            >
              <AddToCollectionPanel
                postId={id}
                onClose={() => setIsAddToCollectionPanelOpen(false)}
                className={"pb-[4%] md:pr-[4%] md:pb-0"}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </StyledDialog>
  );
}
