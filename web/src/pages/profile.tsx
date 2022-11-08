import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { MdAddCircle } from "react-icons/md";

import Button from "../components/Inputs/Button";
import LinkIconButton from "../components/Inputs/LinkIconButton";
import SearchBar from "../components/Inputs/SearchBar";
import ImageList from "../components/Layout/ImageList";
import { fetchPosts } from "../helpers/fetch";
import Posts from "../types/posts";
import {stringifyNumber} from "yaml/util";

interface Props {
  id: string;
  name: string;
  posts?: Posts[];
  showDialog?: boolean;
  className?: string;
}

export default function Profile({
  id,
  name,
  // posts,
  showDialog = true,
  className = "",
}: Props) {
  const [text, setText] = useState("");

  const { data: posts, isLoading: arePostsLoading } = useQuery(
    ["feed_posts"],
    fetchPosts,
    {
      onError: (err: Error) => {
        toast.error(err.message);
      },
    }
  );

  const tmp_userid = 1;
  const userViews = 4331;
  const userSaves = posts?.length;
  const userName = "username";
  const userIcon = "https://avatars.githubusercontent.com/u/79925808?v=4";

  return (
    <>
      <div className="p-4" />
      <div className="container mx-auto">
        <div className="p-4" />
        <div className="flex flex-wrap items-center justify-center">
          <Link href={"/profile/" + tmp_userid.toString()}>
            <a href="#" className="relative block">
              <img
                className="custom-position h-24 w-24 rounded-full object-cover"
                src={userIcon}
                alt="name"
              />
            </a>
          </Link>
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
              <Link href="collections">
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

      <ImageList
        arePostsLoading={arePostsLoading}
        posts={posts}
        className={"px-2 pb-4 pt-16 sm:px-4 lg:px-8"}
      />
    </>
  );
}
