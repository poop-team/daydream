import Link from "next/link";
import { useState } from "react";
import { MdAddCircle } from "react-icons/md";

import Button from "../../components/Inputs/Button";
import LinkIconButton from "../../components/Inputs/LinkIconButton";
import SearchBar from "../../components/Inputs/SearchBar";
import ImageCard from "../../components/Surfaces/ImageCard";

export default function Index() {
  const [text, setText] = useState("");

  const userViews = 1;
  const userSaves = mockData.length;
  const userName = "username";
  const userIcon = "https://avatars.githubusercontent.com/u/79925808?v=4";

  return (
    <>
      <div className="p-4" />
      <div className="container mx-auto">
        <div className="p-4" />
        <div className="flex flex-wrap items-center justify-center">
          <a href="#" className="relative block">
            <img
              className="custom-position h-24 w-24 rounded-full object-cover"
              src={userIcon}
              alt="name"
            />
          </a>
        </div>
        <div className="p-4" />
      </div>

      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-center">
          <div className="text-lg">@{userName}</div>
        </div>
        <div className="p-1" />
      </div>

      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="text-sm">{userViews} views</div>
          <div className="text-sm">{userSaves} saves</div>
        </div>
        <div className="p-2" />
      </div>

      <div className="container mx-auto">
        <div className="p-2"></div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="p-2">
            <section className="flex gap-4">
              <div className="flex flex-col items-center gap-2">
                {/*<Button disabled>Created</Button>*/}
                <Button variant="text">Created</Button>
              </div>
              {/*<div className="flex flex-col items-center gap-2">
                <Button>Collections</Button>
              </div>*/}
              <Link href="/Profile/collections">
                <div className="flex flex-col items-center gap-2">
                  <Button>Collections</Button>
                </div>
              </Link>
            </section>
          </div>
        </div>
        <div className="p-2" />
      </div>

      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <SearchBar
            value={text}
            onValueChange={setText}
            className="w-11/12 max-w-xl sm:w-2/3"
          />
          <LinkIconButton href="/create" className="hidden text-base sm:block">
            <MdAddCircle className="h-8 w-full" />
          </LinkIconButton>
        </div>
        <div className="p-2" />
      </div>

      <div
        className="grid grid-cols-fill-10 justify-items-center gap-2 py-4 px-2 sm:grid-cols-fill-20 sm:px-4 md:gap-4 
        lg:grid-cols-fill-30 lg:px-8 2xl:grid-cols-fill-40"
      >
        {mockData.map((data) =>
          [1, 2, 3, 4, 5, 6].map((i) => (
            <ImageCard key={data.id + i} {...data} className="h-full w-full" />
          ))
        )}
      </div>
    </>
  );
}

// GROSS
const mockData = [
  {
    id: 1,
    src: "/test.png",
    prompt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    likes: 69,
    authorName: "John Doe",
    authorAvatar: "/test.png",
  },
  {
    id: 2,
    src: "/test.png",
    prompt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.".repeat(
      100
    ),
    likes: 420,
    authorName: "Elon Musk",
    authorAvatar: "/test.png",
  },
  {
    id: 3,
    src: "/test.png",
    prompt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    likes: 3697,
    authorName: "Very Long Naaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaame",
    authorAvatar: "/test.png",
  },
  {
    id: 4,
    src: "/test.png",
    prompt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    likes: 69,
    authorName: "John Doe",
    authorAvatar: "/test.png",
  },
  {
    id: 5,
    src: "/test.png",
    prompt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    likes: 69,
    authorName: "John Doe",
    authorAvatar: "/test.png",
  },
  {
    id: 6,
    src: "/test.png",
    prompt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    likes: 69,
    authorName: "John Doe",
    authorAvatar: "/test.png",
  },
  {
    id: 7,
    src: "/test.png",
    prompt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    likes: 69,
    authorName: "John Doe",
    authorAvatar: "/test.png",
  },
  {
    id: 8,
    src: "/test.png",
    prompt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    likes: 69,
    authorName: "John Doe",
    authorAvatar: "/test.png",
  },
  {
    id: 9,
    src: "/test.png",
    prompt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    likes: 69,
    authorName: "John Doe",
    authorAvatar: "/test.png",
  },
  {
    id: 10,
    src: "/test.png",
    prompt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    likes: 69,
    authorName: "John Doe",
    authorAvatar: "/test.png",
  },
  {
    id: 11,
    src: "/test.png",
    prompt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    likes: 69,
    authorName: "John Doe",
    authorAvatar: "/test.png",
  },
  {
    id: 12,
    src: "/test.png",
    prompt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    likes: 69,
    authorName: "John Doe",
    authorAvatar: "/test.png",
  },
];

/*
{saves.map((images, index) => {
  return (
      <div key={index}>
        <section className="flex gap-4">
          <Card className="h-80 w-80 bg-slate-600" />
        </section>
      </div>
  );
})}
*/
