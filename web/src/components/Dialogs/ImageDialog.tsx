import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { MdFavorite, MdFavoriteBorder, MdLibraryAdd } from "react-icons/md";

import { useMediaQuery } from "../../hooks/useMediaQuery";
import { transitions } from "../../styles/motion-definitions";
import CustomImage from "../CustomImage";
import Button from "../Inputs/Button";
import IconButton from "../Inputs/IconButton";
import Card from "../Surfaces/Card";
import Author from "../Widgets/Author";
import LikesCounter from "../Widgets/LikesCounter";
import AddToCollectionPanel from "./Panels/AddToCollectionPanel";
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

  const handleLikeClick = () => {
    onLikedChange(!isLiked);
  };

  const handleDialogClose = () => {
    setIsAddToCollectionPanelOpen(false);
    onClose();
  };

  //#endregion

  return (
    <StyledDialog isOpen={isOpen} onClose={handleDialogClose}>
      <Card
        className={
          "relative flex max-h-[90vh] w-full flex-col overflow-hidden bg-slate-100 md:aspect-video md:flex-row"
        }
        // onClick={() => setIsAddToCollectionPanelOpen(false)}
      >
        {/* Big Image */}
        <CustomImage
          src={src}
          alt={prompt}
          fill
          priority
          quality={90}
          sizes={"(max-width: 768px) 100vw, 50vw"}
          containerClassName={"relative aspect-square"}
          className={"object-cover"}
        />
        {/* Right Content Panel */}
        <div
          className={
            "flex basis-full flex-col items-center gap-2 p-4 md:p-6 lg:gap-4"
          }
        >
          <div className={"flex w-full justify-between"}>
            <Author
              authorName={authorName}
              authorAvatar={authorAvatar}
              className={"w-2/3 md:w-44 lg:w-72 xl:w-96"}
            />
            <LikesCounter likes={likes} isLiked={isLiked} />
          </div>
          <p
            className={
              "basis-28 overflow-y-auto px-1 text-center text-lg sm:text-xl md:max-h-fit md:basis-full lg:text-2xl"
            }
          >
            {prompt}
          </p>
          <div className={"mt-auto flex gap-2"}>
            <Button onClick={() => setIsAddToCollectionPanelOpen(true)}>
              Add to Collection
              <MdLibraryAdd className={"h-5 w-5"} />
            </Button>
            <IconButton onClick={handleLikeClick}>
              <AnimatePresence initial={false}>
                {isLiked ? (
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1, 1.1, 1],
                    }}
                    transition={{
                      duration: 0.7,
                    }}
                  >
                    <MdFavorite className={"h-10 w-10"} />
                  </motion.div>
                ) : (
                  <MdFavoriteBorder className={"h-10 w-10"} />
                )}
              </AnimatePresence>
            </IconButton>
          </div>
        </div>
        <AnimatePresence initial={false}>
          {isAddToCollectionPanelOpen && (
            <motion.div
              initial={{
                x: md ? "100%" : "0%",
                y: md ? "0%" : "100%",
              }}
              animate={{
                x: md ? "4%" : "0%",
                y: md ? "0%" : "4%",
              }}
              exit={{
                x: md ? "100%" : "0%",
                y: md ? "0%" : "100%",
              }}
              transition={transitions.springStiffer}
              className={
                "absolute right-0 bottom-0 h-[95%] w-full shadow-2xl md:h-full md:w-[95%]"
              }
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
