import Image from "next/future/image";

import Author from "../Widgets/Author";
import Card from "./Card";

interface Props {
  id: number;
  src: string;
  name: string;
  savedBy: string;
  author: string;
  authorAvatar: string;
  posts: [];
  showDialog?: boolean;
  className?: string;
}

export default function CollectionCard({
  src,
  name,
  savedBy,
  author,
  authorAvatar,
  posts,
  className = "",
}: Props) {
  return (
    <>
      <div className={"container mx-auto"}>
        <Card
          className={`group relative aspect-square cursor-pointer select-none overflow-hidden bg-slate-500 p-6 
      transition-all duration-200 ease-out hover:shadow-2xl sm:hover:scale-[103%] ${className}`}
        >
          <Image
            src={src}
            alt={name}
            fill
            priority
            sizes={
              "(max-width: 600px) 40vw, (max-width: 1024px) 30vw, (max-width: 1536px) 22vw, 18vw"
            }
            className={
              "scale-[103%] transition-all duration-200 ease-out sm:group-hover:scale-100 sm:group-hover:blur-sm " +
              "sm:group-hover:brightness-[30%] object-contain"
            }
          />
          <div
            className={
              "relative hidden h-full flex-col justify-between text-slate-50 opacity-0 transition-all duration-200 " +
              "ease-out group-hover:opacity-100 sm:flex sm:gap-2 lg:gap-4"
            }
          >
            <p className={"text-center sm:line-clamp-2 md:line-clamp-4"}>
              {name}
            </p>
            <Author
              authorName={author}
              authorAvatar={authorAvatar}
              className={"justify-center"}
            />
          </div>
        </Card>
        {/*<div className={"p-2"} />
        <div className="text-xl">tmp</div>*/}
      </div>
    </>
  );
}
