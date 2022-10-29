import Image from "next/future/image";
import Link from "next/link";
import { MdAccountCircle } from "react-icons/md";

interface Props {
  authorName: string;
  authorAvatar: string;
  className?: string;
}

export default function Author({
  authorName,
  authorAvatar,
  className = "",
}: Props) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={"relative min-h-[2rem] min-w-[2rem]"}>
        {authorAvatar ? (
          <Image
            src={authorAvatar}
            alt={authorName}
            fill
            priority
            sizes={"2rem"}
            className={"rounded-full"}
          />
        ) : (
          <MdAccountCircle className={"h-full w-full"} />
        )}
      </div>
      <p className={"overflow-hidden text-ellipsis whitespace-nowrap"}>
        By{" "}
        {/* TODO: Update this link when we know what the slug will look like */}
        <Link href={`/profile/${authorName}`}>
          <a
            className={
              "inline text-inherit transition duration-200 ease-out hover:text-indigo-700"
            }
          >
            <b>{authorName}</b>
          </a>
        </Link>
      </p>
    </div>
  );
}
