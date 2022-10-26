import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/future/image";

import { variants } from "../../styles/motion-definitions";
import Card from "../Surfaces/Card";

interface Props {
  src: string;
  prompt: string;
  saveCount: number;
  authorName: string;
  authorAvatar: string;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export default function ImageDialog({
  src,
  prompt,
  saveCount,
  authorName,
  authorAvatar,
  isOpen,
  onClose,
  className = "",
}: Props) {
  //#region Hooks

  //#endregion

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
            "fixed inset-0 z-10 flex items-center justify-center p-4 sm:p-8 md:p-12"
          }
        >
          <Dialog.Backdrop
            as={motion.div}
            variants={variants}
            initial={"fadeOut"}
            animate={"fadeIn"}
            exit={"fadeOut"}
            className={"absolute inset-0 z-0 bg-black/50 backdrop-blur-sm"}
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
              <div className={"relative aspect-square"}>
                <Image
                  src={src}
                  alt={prompt}
                  fill
                  priority
                  className={"h-full w-full object-fill"}
                />
              </div>
              <div className={"px-4 pt-8 md:px-8 md:pt-16"}>
                <p className={"lg:text-lg"}>{prompt}</p>
              </div>
              {/*<IconButton*/}
              {/*  className={"absolute top-3 right-3 text-3xl"}*/}
              {/*  onClick={onClose}*/}
              {/*>*/}
              {/*  <MdClose />*/}
              {/*</IconButton>*/}
            </Card>
          </Dialog.Panel>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
