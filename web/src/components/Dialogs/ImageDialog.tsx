import { AnimatePresence, motion } from "framer-motion";
import Image from "next/future/image";
import { MdFavorite, MdFavoriteBorder, MdLibraryAdd } from "react-icons/md";

import Button from "../Inputs/Button";
import IconButton from "../Inputs/IconButton";
import Card from "../Surfaces/Card";
import Author from "../Widgets/Author";
import LikesCounter from "../Widgets/LikesCounter";
import StyledDialog from "./StyledDialog";

interface Props {
  src: string;
  prompt: string;
  likes: number;
  isLiked: boolean;
  onLikedChange: (isLiked: boolean) => void;
  authorName: string;
  authorAvatar: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageDialog({
  src,
  prompt,
  likes,
  isLiked = false,
  onLikedChange,
  authorName,
  authorAvatar,
  isOpen,
  onClose,
}: Props) {
  //#region Handlers

  const handleLikeClick = () => {
    onLikedChange(!isLiked);
  };

  //#endregion

  return (
    <StyledDialog isOpen={isOpen} onClose={onClose}>
      <Card
        className={
          "relative flex h-full w-full flex-col overflow-hidden bg-slate-100 md:aspect-video md:flex-row"
        }
      >
        {/* Big Image */}
        <div className={"relative aspect-square"}>
          <Image
            src={src}
            alt={prompt}
            fill
            priority
            sizes={"(max-width: 768px) 100vw, 50vw"}
            className={"h-full w-full object-fill"}
          />
        </div>
        {/* Right Content Panel */}
        <div className={"flex flex-col items-center gap-2 p-4 md:p-6 lg:gap-4"}>
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
              "h-5/6 overflow-scroll px-2 text-center text-lg sm:text-xl lg:text-2xl"
            }
          >
            {prompt}
          </p>
          <div className={"flex gap-2"}>
            <Button className={"mt-auto"}>
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
      </Card>
    </StyledDialog>
  );
}
