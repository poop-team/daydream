import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

interface Props {
  likes: number;
  isLiked: boolean;
  className?: string;
}

export default function LikesCounter({
  likes,
  isLiked,
  className = "",
}: Props) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {likes.toLocaleString()}
      {isLiked ? (
        <MdFavorite className={"h-full w-8"} />
      ) : (
        <MdFavoriteBorder className={"h-full w-8"} />
      )}
    </div>
  );
}
