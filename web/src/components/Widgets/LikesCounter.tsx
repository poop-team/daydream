import { AnimatePresence, motion } from "framer-motion";
import type { MouseEvent } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

import IconButton from "../Inputs/IconButton";

interface Props {
  likes: number;
  isLiked: boolean;
  onLikeClick?: (e: MouseEvent) => void;
  className?: string;
}

export default function LikesCounter({
  likes,
  isLiked,
  onLikeClick,
  className = "",
}: Props) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {likes.toLocaleString()}
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
              <MdFavorite className={"h-full w-10"} />
            </motion.div>
          ) : (
            <MdFavoriteBorder className={"h-full w-10"} />
          )}
        </AnimatePresence>
      </IconButton>
    </div>
  );
}
