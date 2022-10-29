import Image from "next/future/image";

import Card from "../Surfaces/Card";
import ImageCard from "../Surfaces/ImageCard";
import Author from "../Widgets/Author";
import StyledDialog from "./StyledDialog";

interface Props {
  src: string;
  name: string;
  authorName: string;
  authorAvatar: string;
  posts: {
    id: number;
    src: string;
    prompt: string;
    likes: number;
    authorName: string;
    authorAvatar: string;
  }[];
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageDialog({
  src,
  name,
  authorName,
  authorAvatar,
  posts,
  isOpen,
  onClose,
}: Props) {
  return (
    <StyledDialog isOpen={isOpen} onClose={onClose}>
      <div className={"flex flex-wrap items-center justify-center gap-2"}>
        {posts.map((data) =>
          [1, 2, 3, 4, 5, 6].map((i) => (
            <ImageCard key={data.id + i} {...data} className={"h-12 w-12"} />
          ))
        )}
      </div>
    </StyledDialog>
  );
}
