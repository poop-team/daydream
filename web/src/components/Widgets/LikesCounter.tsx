import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

interface Props {
  likes: number;
  isLiked: boolean;
  className?: string;
}

export default function LikesCounter({
  likes,
  isLiked = false,
  className = "",
}: Props) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {likes.toLocaleString()}
      {isLiked ? (
        <MdFavorite className={"h-8 w-8"} />
      ) : (
        <MdFavoriteBorder className={"h-8 w-8"} />
      )}
    </div>
  );
}
