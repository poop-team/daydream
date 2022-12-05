import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { MdArrowForward, MdLibraryAdd } from "react-icons/md";

import Button from "../../components/Inputs/Button";
import ImageList from "../../components/Layout/ImageList";
import AddToCollectionPanel from "../../components/Panels/AddToCollectionPanel";
import CustomImage from "../../components/Surfaces/CustomImage";
import Skeleton from "../../components/Surfaces/Skeleton";
import Author from "../../components/Widgets/Author";
import FloatingImageActions from "../../components/Widgets/FloatingImageActions";
import LikesCounter from "../../components/Widgets/LikesCounter";
import useLikePost from "../../hooks/useLikePost";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { getPostWithCollections, searchPosts } from "../../requests/fetch";
import {
  transitions,
  transitionVariants,
} from "../../styles/motion-definitions";

export default function Post() {
  //#region Hooks

  const router = useRouter();

  const md = useMediaQuery("(min-width: 768px)");

  const [isAddToCollectionPanelOpen, setIsAddToCollectionPanelOpen] =
    useState(false);

  const { data: postData, isLoading: isPostLoading } = useQuery({
    queryKey: ["post", router.query.id],
    queryFn: () => getPostWithCollections(router.query.id as string),
    onError: (err: Error) => {
      toast.error(err.message);
    },
    enabled: !!router.query.id,
  });

  const { data: featuredPostsData, isLoading: areFeaturedPostsLoading } =
    useQuery({
      queryKey: ["featured_posts"],
      queryFn: () => searchPosts({ search: "", limit: 9 }),
      onError: (err: Error) => {
        toast.error("Failed to load featured posts");
      },
    });

  const { mutateLikeChange, likeCount, isLiked } = useLikePost({
    postId: postData?.id ?? "",
    initialIsLiked: postData?.isLiked ?? false,
    initialLikeCount: postData?.likeCount ?? 0,
  });

  //#endregion

  //#region Derived State

  const splitPrompt = postData?.prompt
    .split(/[,.]/)
    .filter((word) => word.length > 0);
  const promptPreview = splitPrompt?.[0];
  const downloadLink = postData?.imageURL.replace("_compressed", "") ?? "";

  //#endregion

  return (
    <motion.main
      className={
        "mx-auto w-full max-w-7xl px-4 pt-4 pb-16 sm:pt-20 sm:pb-8 lg:px-8"
      }
      initial={"fadeOut"}
      animate={"fadeIn"}
      exit={"fadeOut"}
      custom={0.4}
      variants={transitionVariants}
      onClick={() => setIsAddToCollectionPanelOpen(false)}
    >
      {postData ? (
        <div className={"relative flex flex-col gap-8 md:flex-row"}>
          <div
            className={
              "group relative z-0 aspect-square w-full overflow-hidden rounded-xl"
            }
          >
            <FloatingImageActions
              postId={postData.id}
              downloadLink={downloadLink}
              className={`absolute left-1/2 top-2 z-10 -translate-x-1/2 opacity-0 transition-all delay-1000 duration-100 
            ease-out group-hover:opacity-100 group-hover:delay-200 group-focus:opacity-100 group-focus:delay-100`}
            />
            <CustomImage
              src={postData.imageURL}
              alt={promptPreview ?? ""}
              fill
              priority
              quality={90}
              sizes={"(max-width: 768px) 100vw, 50vw"}
              className={"object-contain"}
            />
          </div>
          <div className={"flex w-full flex-col items-center gap-2 lg:gap-4"}>
            <div className={"flex w-full select-none justify-between"}>
              <Author
                authorName={postData.author.name}
                authorAvatar={postData.author.image}
                className={"w-2/3 md:w-44 lg:w-72 xl:w-96"}
              />
              <LikesCounter
                likes={likeCount}
                isLiked={isLiked}
                onLikeClick={() => mutateLikeChange(!isLiked)}
              />
            </div>
            <p
              className={
                "basis-28 overflow-y-auto px-1 text-center text-lg sm:text-xl md:max-h-fit md:basis-full lg:text-2xl"
              }
            >
              {postData.prompt}
            </p>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setIsAddToCollectionPanelOpen(true);
              }}
              className={"mt-auto"}
            >
              Add to Collection
              <MdLibraryAdd className={"h-5 w-5"} />
            </Button>
          </div>
          <AnimatePresence initial={false}>
            {isAddToCollectionPanelOpen && (
              <motion.div
                initial={{
                  opacity: 0,
                  x: md ? "8%" : "0%",
                  y: md ? "0%" : "8%",
                }}
                animate={{
                  opacity: 1,
                  x: "0%",
                  y: "0%",
                }}
                exit={{
                  opacity: 0,
                  x: md ? "8%" : "0%",
                  y: md ? "0%" : "8%",
                }}
                transition={transitions.springStiffer}
                className={"absolute right-0 bottom-0 h-full w-full shadow-2xl"}
                onClick={(e) => e.stopPropagation()}
              >
                <AddToCollectionPanel
                  postId={postData.id}
                  onClose={() => setIsAddToCollectionPanelOpen(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : isPostLoading ? (
        <div className={"flex flex-col gap-8 md:flex-row"}>
          <Skeleton className={"aspect-square w-full"} />
          <div className={"flex w-full flex-col items-center gap-2 lg:gap-4"}>
            <div className={"flex h-10 w-full items-center justify-between"}>
              <Skeleton className={"mr-2 h-10 w-10 rounded-full"} />
              <Skeleton className={"mr-auto h-8 w-32"} />
              <Skeleton className={"h-8 w-20"} />
            </div>
            <Skeleton className={"w-full basis-28 px-1 md:basis-full"} />
            <Skeleton className={"mt-auto h-10 w-48"} />
          </div>
        </div>
      ) : (
        <div className={"m-auto text-center"}>
          <h1 className={"text-4xl font-bold"}>Post Not Found</h1>
          <p className={"text-lg"}>
            The post you are looking for does not exist.
          </p>
        </div>
      )}
      <div className={`mt-16 flex w-full flex-col gap-4 sm:gap-6`}>
        <h2 className={"w-full text-center text-3xl font-bold"}>
          Featured Posts {"🔥"}
        </h2>
        <ImageList
          posts={featuredPostsData?.posts ?? []}
          arePostsLoading={areFeaturedPostsLoading}
          noPostsMessage={"No Featured Posts to show"}
        />
        {featuredPostsData?.nextCursorId && (
          <Button
            variant={"text"}
            onClick={() => void router.push("/feed")}
            className={"m-auto"}
          >
            View More
            <MdArrowForward className={"h-5 w-5"} />
          </Button>
        )}
      </div>
    </motion.main>
  );
}
