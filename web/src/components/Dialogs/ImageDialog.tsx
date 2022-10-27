import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/future/image";
import { useEffect, useState } from "react";
import { MdFavorite, MdFavoriteBorder, MdLibraryAdd } from "react-icons/md";

import { variants } from "../../styles/motion-definitions";
import Button from "../Inputs/Button";
import IconButton from "../Inputs/IconButton";
import Card from "../Surfaces/Card";
import Author from "../Widgets/Author";

interface Props {
  src: string;
  prompt: string;
  likes: number;
  isLiked?: boolean;
  authorName: string;
  authorAvatar: string;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export default function ImageDialog({
  src,
  prompt,
  likes,
  isLiked = false,
  authorName,
  authorAvatar,
  isOpen,
  onClose,
  className = "",
}: Props) {
  //#region Hooks

  const [isLikedLocally, setIsLikedLocally] = useState(isLiked);
  const [likesLocally, setLikesLocally] = useState(likes);

  useEffect(() => {
    setIsLikedLocally(isLiked);
  }, [isLiked]);

  useEffect(() => {
    setLikesLocally(likes);
  }, [likes]);

  //#endregion

  //#region Handlers

  const handleLike = () => {
    setIsLikedLocally(!isLikedLocally);
    setLikesLocally(isLikedLocally ? likesLocally - 1 : likesLocally + 1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          as={motion.div}
          variants={variants}
          initial={"fadeOut"}
          animate={"fadeIn"}
          exit={"fadeOut"}
          open={isOpen}
          onClose={onClose}
          className={
            "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 md:p-12"
          }
        >
          <Dialog.Backdrop
            as={motion.div}
            variants={variants}
            initial={"fadeOut"}
            animate={"fadeIn"}
            exit={"fadeOut"}
            className={"fixed inset-0 z-40 bg-black/80 backdrop-blur-md"}
            aria-hidden={"true"}
          />
          <Dialog.Panel
            as={motion.div}
            variants={variants}
            initial={"growOut"}
            animate={"growIn"}
            exit={"growOut"}
            className={"flex w-full max-w-[92rem] items-center justify-center"}
          >
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
              <div
                className={
                  "flex flex-col items-center gap-2 p-4 md:p-6 lg:gap-4"
                }
              >
                <div className={"flex w-full justify-between"}>
                  <Author
                    authorName={authorName}
                    authorAvatar={authorAvatar}
                    className={"w-2/3 md:w-44 lg:w-72 xl:w-96"}
                  />
                  <div className={"flex items-center gap-1"}>
                    {likesLocally}
                    <MdFavorite className={"h-8 w-8"} />
                  </div>
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
                  <IconButton onClick={handleLike}>
                    <AnimatePresence initial={false}>
                      {isLikedLocally ? (
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
          </Dialog.Panel>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
