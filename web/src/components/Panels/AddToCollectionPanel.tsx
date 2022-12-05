import { useMutation, useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { MdDoubleArrow } from "react-icons/md";

import useIsClient from "../../hooks/useIsClient";
import { getCollections, getPostWithCollections } from "../../requests/fetch";
import {
  addPostToCollection,
  removePostFromCollection,
} from "../../requests/mutate";
import {
  staggerContainerVariants,
  staggerItemVariants,
  transitions,
  transitionVariants,
} from "../../styles/motion-definitions";
import type { Collection } from "../../types/collection.type";
import { PreviewPost } from "../../types/post.type";
import { getAuthSession } from "../../utils/storage";
import CircularProgress from "../Feedback/CircularProgress";
import IconButton from "../Inputs/IconButton";
import SearchBar from "../Inputs/SearchBar";
import Card from "../Surfaces/Card";
import CollectionCard from "../Surfaces/CollectionCard";

interface Props {
  postId: string;
  onClose: () => void;
  className?: string;
}

export default function AddToCollectionPanel({
  postId,
  onClose,
  className = "",
}: Props) {
  //#region Hooks

  const isClient = useIsClient();

  const [searchValue, setSearchValue] = useState("");
  const [loadingCollectionIds, setLoadingCollectionIds] = useState<string[]>(
    []
  );

  const { data: postData, refetch: refetchPost } = useQuery({
    queryKey: ["post_to_add_to_collection", postId],
    queryFn: () => getPostWithCollections(postId),
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  const {
    data: collectionsData,
    isLoading: areCollectionsLoading,
    refetch: refetchCollections,
  } = useQuery({
    queryKey: ["collections", postId],
    queryFn: () => getCollections({ userId: getAuthSession().userId }),
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  const { mutate: mutateAddPostToCollection, isLoading: isAdding } =
    useMutation({
      mutationKey: ["add_post_to_collection"],
      mutationFn: (collectionId: string) =>
        addPostToCollection(postId, collectionId),
      onSuccess: ({ collectionId }) => {
        setLoadingCollectionIds((prev) =>
          prev.filter((id) => id !== collectionId)
        );
        void refetchPost().then(() => void refetchCollections());
      },
      onError: (err: Error) => {
        toast.error(err.message);
      },
    });

  const { mutate: mutateRemovePostFromCollection, isLoading: isRemoving } =
    useMutation({
      mutationKey: ["remove_post_from_collection"],
      mutationFn: (collectionId: string) =>
        removePostFromCollection(postId, collectionId),
      onSuccess: ({ collectionId }) => {
        setLoadingCollectionIds((prev) =>
          prev.filter((id) => id !== collectionId)
        );
        void refetchPost().then(() => void refetchCollections());
      },
      onError: (err: Error) => {
        toast.error(err.message);
      },
    });

  const collections = useMemo(() => {
    // Update value of which collections the post is already in and bring the post to the top if it is in the collection
    return (
      collectionsData?.collections.filter((collection) =>
        collection.name.toLowerCase().includes(searchValue.toLowerCase())
      ) ?? []
    );
  }, [collectionsData?.collections, searchValue]);

  //#endregion

  //#region Handlers

  const handleCollectionSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleCollectionClick = (collection: Collection) => {
    if (loadingCollectionIds.includes(collection.id)) {
      return;
    }

    setLoadingCollectionIds((prev) => [...prev, collection.id]);
    if (addedCollectionIds.includes(collection.id)) {
      // Already added to collection, remove from collection
      mutateRemovePostFromCollection(collection.id);
    } else {
      // Else add to collection
      mutateAddPostToCollection(collection.id);
    }
  };

  //#endregion

  //#region Derived State

  const { userName = "" } = (isClient && getAuthSession()) || {};
  const addedCollectionIds =
    postData?.collections.map((collection) => collection.id) ?? [];

  //#endregion

  return (
    <Card
      className={`flex h-full w-full flex-col bg-slate-100/90 backdrop-blur-md dark:bg-slate-800/90 md:flex-row ${className}`}
    >
      <IconButton
        className={
          "h-fit w-full scale-100 justify-center p-2 md:h-full md:w-fit md:pl-4"
        }
        onClick={onClose}
      >
        <MdDoubleArrow
          className={"rotate-90 text-3xl md:rotate-0 md:text-4xl"}
        />
      </IconButton>
      <div className={"relative h-full w-full overflow-y-auto p-2 md:p-4"}>
        <SearchBar
          value={searchValue}
          onValueChange={handleCollectionSearch}
          className={"mx-auto w-full max-w-lg"}
        />
        <motion.ol
          variants={staggerContainerVariants}
          initial="hidden"
          animate="show"
          exit="hidden"
          transition={transitions.springStiff}
          className={
            "my-4 flex w-full list-none flex-wrap justify-center gap-4 md:justify-start"
          }
        >
          <AnimatePresence mode={"popLayout"}>
            {collections?.map((collection) => (
              <motion.li
                key={collection.id}
                layout
                variants={staggerItemVariants}
                exit={{ opacity: 0 }}
                transition={transitions.springStiff}
                className={"w-4/5 sm:w-[31%] lg:w-[23%]"}
              >
                <CollectionCard
                  collection={{
                    ...collection,
                    posts: addedCollectionIds.includes(collection.id)
                      ? [
                          postData as unknown as PreviewPost,
                          ...collection.posts.filter(
                            (post) => post.id !== postId
                          ),
                        ]
                      : collection.posts.filter((post) => post.id !== postId),
                  }}
                  isAdded={addedCollectionIds.includes(collection.id)}
                  isLoading={loadingCollectionIds.includes(collection.id)}
                  onClick={() => handleCollectionClick(collection)}
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ol>
        <div
          className={
            "absolute top-1/2 left-1/2 mt-6 -translate-x-1/2 -translate-y-1/2 sm:text-2xl md:mt-0"
          }
        >
          <AnimatePresence>
            {areCollectionsLoading ? (
              <motion.div
                variants={transitionVariants}
                initial="fadeOut"
                animate="fadeIn"
                exit="fadeOut"
              >
                <CircularProgress className={"scale-[150%] md:scale-[200%]"} />
              </motion.div>
            ) : (
              !collections?.length && (
                <motion.p
                  variants={transitionVariants}
                  initial="fadeOut"
                  animate="fadeIn"
                  exit="fadeOut"
                  className={"break-words text-center"}
                >
                  {searchValue ? (
                    "No collections to show 😔"
                  ) : (
                    <>
                      You haven&apos;t created any collections yet.
                      <br />
                      Create one by going to{" "}
                      <Link
                        href={`/profile/${encodeURI(
                          userName
                        )}?view=collections`}
                      >
                        <a
                          className={
                            "inline text-inherit underline transition duration-200 ease-out hover:text-indigo-700 focus-visible:outline-none dark:hover:text-indigo-300"
                          }
                          onClick={(e) => e.stopPropagation()} // Prevents other handlers from firing
                        >
                          your profile&apos;s Collections tab
                        </a>
                      </Link>
                    </>
                  )}
                </motion.p>
              )
            )}
          </AnimatePresence>
        </div>
      </div>
    </Card>
  );
}
