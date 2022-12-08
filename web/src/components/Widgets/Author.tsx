import Link from "next/link";
import { MdAccountCircle } from "react-icons/md";

import CustomImage from "../Surfaces/CustomImage";

interface Props {
  authorName: string;
  authorAvatar?: string | null;
  className?: string;
}

export default function Author({
  authorName,
  authorAvatar,
  className = "",
}: Props) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {authorAvatar ? (
        <CustomImage
          src={authorAvatar}
          alt={authorName}
          fill
          priority
          sizes={"2rem"}
          containerClassName={"relative h-10 w-10 rounded-full"}
          className={"rounded-full"}
        />
      ) : (
        <MdAccountCircle className={"h-10 w-10"} />
      )}
      <p className={"truncate"}>
        By{" "}
        <Link
          href={`/profile/${encodeURI(authorName)}`}
          className={
            "inline text-inherit transition duration-200 ease-out hover:text-indigo-700 focus-visible:outline-none dark:hover:text-indigo-300"
          }
          onClick={(e) => e.stopPropagation()} // Prevents other handlers from firing
        >
          <b>{authorName}</b>
        </Link>
      </p>
    </div>
  );
}
