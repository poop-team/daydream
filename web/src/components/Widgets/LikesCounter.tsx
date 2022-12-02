import { AnimatePresence, motion } from "framer-motion";
import type { MouseEvent } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

import IconButton from "../Inputs/IconButton";

interface Props {
  likes: number;
  isLiked: boolean;
  onLikeClick?: (e: MouseEvent) => void;
  className?: string;
  iconClassName?: string;
}

export default function LikesCounter({
  likes,
  isLiked,
  onLikeClick,
  className = "",
  iconClassName = "",
}: Props) {
  //#region Derived Variables

  // TODO: Make the locale dynamic based on the browser's locale
  const formattedLikes = Intl.NumberFormat("en-US", {
    notation: "compact",
  }).format(likes);

  //#endregion

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {formattedLikes}
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          onLikeClick?.(e);
        }}
      >
        <AnimatePresence initial={false}>
          {isLiked ? (
            <motion.div
              animate={{
                scale: [1, 1.15, 1, 1.15, 1],
              }}
              transition={{
                duration: 0.7,
              }}
            >
              <MdFavorite className={`h-full w-10 ${iconClassName}`} />
            </motion.div>
          ) : (
            <MdFavoriteBorder className={`h-full w-10 ${iconClassName}`} />
          )}
        </AnimatePresence>
      </IconButton>
    </div>
  );
}
