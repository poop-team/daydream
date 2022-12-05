import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import useInfiniteQueryPosts from "../../../hooks/useInfiniteQueryPosts";
import { getCollections } from "../../../requests/fetch";
import { createCollection, deleteCollection } from "../../../requests/mutate";
import Collection from "../../../types/collection.type";
import ProfileSearchBar from "../../Inputs/ProfileSearchBar";
import CollectionList from "../CollectionList";
import ImageList from "../ImageList";

interface Props {
  userId?: string;
  isSelf: boolean;
  refetchProfile: () => void;
  isProfileLoading: boolean;
}

export default function CreatedCollectionList({
  userId,
  isSelf,
  refetchProfile,
  isProfileLoading,
}: Props) {
  //#region Hooks

  const router = useRouter();

  const [selectedCollection, setSelectedCollection] =
    useState<Collection | null>(null);
  const [searchCollectionValue, setSearchCollectionValue] = useState("");
  const [searchPostValue, setSearchPostValue] = useState("");

  const {
    data: collectionData,
    isLoading: areCollectionsLoading,
    refetch: refetchCollections,
  } = useQuery({
    queryKey: ["user_collections", userId],
    queryFn: () => getCollections({ userId }),
    onError: (err: Error) => {
      toast.error(err.message);
    },
    enabled: !!userId,
  });

  const {
    posts: selectedCollectionPosts,
    isFetching: isFetchingPosts,
    isFetchingNextPage: isFetchingPostsNextPage,
  } = useInfiniteQueryPosts({
    key: "user_collection_posts",
    recentOnly: true,
    collectionId: selectedCollection?.id,
    searchValue: searchPostValue,
    queryOptions: {
      enabled: !!selectedCollection,
    },
  });

  const { mutate: mutateCreateCollection, isLoading: isCreatingCollection } =
    useMutation({
      mutationKey: ["create_collection"],
      mutationFn: createCollection,
      onSuccess: () => {
        setSearchCollectionValue("");
        refetchProfile();
        void refetchCollections();
      },
      onError: (err: Error) => {
        toast.error(err.message);
      },
    });

  const { mutate: mutateDeleteCollection, isLoading: isDeletingCollection } =
    useMutation({
      mutationKey: ["delete_collection"],
      mutationFn: deleteCollection,
      onSuccess: () => {
        setSelectedCollection(null);
        refetchProfile();
        void refetchCollections();
      },
      onError: (err: Error) => {
        toast.error(err.message);
      },
    });

  const collections = useMemo(
    () =>
      collectionData?.collections.filter((collection) =>
        collection.name
          .toLowerCase()
          .includes(searchCollectionValue.toLowerCase())
      ),
    [collectionData, searchCollectionValue]
  );

  // Update the selected collection state when the query param changes
  useEffect(() => {
    const { collectionId } = router.query;
    if (collectionId) {
      const collection = collectionData?.collections.find(
        (collection) => collection.id === collectionId
      );
      setSelectedCollection(collection ?? null);
    } else {
      setSelectedCollection(null);
    }
  }, [collectionData?.collections, router.query]);

  //#endregion

  //#region Handlers

  const handleCollectionSelect = (collection: Collection) => {
    setSearchPostValue("");
    void router.push({
      query: { ...router.query, collectionId: collection.id },
    });
  };

  const handleCreateCollection = () => {
    if (searchCollectionValue.trim()) {
      if (!isCreatingCollection) {
        mutateCreateCollection(searchCollectionValue.trim());
      } else {
        toast("A collection is already being created");
      }
    }
  };

  const handleDeleteCollection = () => {
    if (selectedCollection) {
      if (!isDeletingCollection) {
        mutateDeleteCollection(selectedCollection.id);
      } else {
        toast("A collection is already being deleted");
      }
    }
  };

  //#endregion

  //#region Derived State

  const fCollectionSearchValue = searchCollectionValue.trim().toLowerCase();
  const isAddCollectionDisabled =
    fCollectionSearchValue.length === 0 ||
    collections?.some(
      (collection) => collection.name.toLowerCase() === fCollectionSearchValue
    );

  //#endregion

  return (
    <div>
      <ProfileSearchBar
        searchValue={
          selectedCollection ? searchPostValue : searchCollectionValue
        }
        onSearchValueChange={
          selectedCollection ? setSearchPostValue : setSearchCollectionValue
        }
        displayBackButton={!!selectedCollection}
        displayAddButton={!selectedCollection && !isProfileLoading && isSelf}
        displayRemoveButton={
          !!selectedCollection && !isProfileLoading && isSelf
        }
        onBackButtonClick={() => {
          delete router.query.collectionId;
          void router.push({ query: router.query });
        }}
        onRemoveButtonClick={handleDeleteCollection}
        onAddButtonClick={handleCreateCollection}
        isAddButtonDisabled={
          selectedCollection ? false : isAddCollectionDisabled
        }
        placeholder={
          selectedCollection || !isSelf
            ? "Search..."
            : "Search or create a collection..."
        }
        removePopoverText={"Are you sure you want to remove this collection?"}
      />
      <div className={"px-2 pb-16 pt-8 sm:px-4 sm:pt-12 md:pb-8 lg:px-8"}>
        {!selectedCollection ? (
          <CollectionList
            areCollectionsLoading={areCollectionsLoading || isProfileLoading}
            collections={collections}
            onCollectionClick={handleCollectionSelect}
          />
        ) : (
          <ImageList
            arePostsLoading={isFetchingPosts}
            areMorePostsLoading={isFetchingPostsNextPage}
            posts={selectedCollectionPosts ?? []}
          />
        )}
      </div>
    </div>
  );
}
