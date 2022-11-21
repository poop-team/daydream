import { useMutation, useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { MdDoubleArrow } from "react-icons/md";

import { getCollections } from "../../../requests/fetch";
import {
  addPostToCollection,
  removePostFromCollection,
} from "../../../requests/mutate";
import {
  staggerContainerVariants,
  staggerItemVariants,
  transitions,
  transitionVariants,
} from "../../../styles/motion-definitions";
import { Post } from "../../../types/post.type";
import { getAuthSession } from "../../../utils/storage";
import CircularProgress from "../../Feedback/CircularProgress";
import IconButton from "../../Inputs/IconButton";
import SearchBar from "../../Inputs/SearchBar";
import Card from "../../Surfaces/Card";
import CollectionCard from "../../Surfaces/CollectionCard";

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

  const [searchValue, setSearchValue] = useState("");
  const [loadingCollectionIds, setLoadingCollectionIds] = useState<string[]>(
    []
  );

  const {
    data: collectionData,
    isLoading: areCollectionsLoading,
    refetch: refetchCollections,
  } = useQuery({
    queryKey: ["collections"],
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
        void refetchCollections();
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
        void refetchCollections();
      },
      onError: (err: Error) => {
        toast.error(err.message);
      },
    });

  const collections = useMemo(
    () =>
      collectionData?.collections.filter((collection) =>
        collection.name.toLowerCase().includes(searchValue.toLowerCase())
      ),
    [collectionData, searchValue]
  );

  const addedToCollections = useMemo(() => {
    return collections?.filter((collection) =>
      collection.posts.some((post) => post.id === postId)
    );
  }, [collections, postId]);

  //#endregion

  //#region Handlers

  const handleCollectionSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleCollectionClick = (collectionId: string) => {
    if (loadingCollectionIds.includes(collectionId)) {
      return;
    }

    setLoadingCollectionIds((prev) => [...prev, collectionId]);
    if (
      addedToCollections?.some((collection) => collection.id === collectionId)
    ) {
      // Already added to collection, remove from collection
      mutateRemovePostFromCollection(collectionId);
    } else {
      // Else add to collection
      mutateAddPostToCollection(collectionId);
    }
  };

  //#endregion

  //#region Helpers

  // Returns all posts for a collection putting postId as the first post
  const getReorderedPosts = (posts: Post[]) => {
    const foundPost = posts.find((post) => post.id === postId);
    if (foundPost) {
      const reorderedPosts = posts.filter((post) => post.id !== postId);
      reorderedPosts.unshift(foundPost);
      return reorderedPosts;
    }
    return posts;
  };

  //#endregion

  return (
    <Card
      className={`flex h-full w-full flex-col bg-slate-100/80 backdrop-blur-md md:flex-row ${className}`}
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
      <div className={"relative w-full overflow-y-auto p-2 md:p-4"}>
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
                  posts={getReorderedPosts(collection.posts)}
                  isAdded={
                    !!addedToCollections?.find(
                      (addedCollection) => addedCollection.id === collection.id
                    )
                  }
                  isLoading={loadingCollectionIds.includes(collection.id)}
                  name={collection.name}
                  onClick={() => handleCollectionClick(collection.id)}
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ol>
        <div
          className={
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:text-2xl"
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
                <CircularProgress className={"scale-[200%]"} />
              </motion.div>
            ) : (
              !collections?.length && (
                <motion.p
                  variants={transitionVariants}
                  initial="fadeOut"
                  animate="fadeIn"
                  exit="fadeOut"
                >
                  No collections found
                </motion.p>
              )
            )}
          </AnimatePresence>
        </div>
      </div>
    </Card>
  );
}
