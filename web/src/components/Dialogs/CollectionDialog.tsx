import Card from "../Surfaces/Card";
import ImageCard from "../Surfaces/ImageCard";
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
      <Card
        className={
          "relative flex h-full w-full flex-col overflow-hidden bg-slate-100 md:aspect-video md:flex-row"
        }
      >
        <div
          className={
            "grid grid-flow-row-dense grid-cols-2 auto-rows-min hover:auto-rows-min overflow-auto p-4"
          }
        >
          {posts.map((data) =>
            [1, 2, 3, 4, 5, 6].map((i) => (
              <div className={"p-2"}>
                <ImageCard
                  key={data.id + i}
                  {...data}
                  className={"h-full w-full"}
                />
              </div>
            ))
          )}
        </div>
      </Card>
    </StyledDialog>
  );
}
