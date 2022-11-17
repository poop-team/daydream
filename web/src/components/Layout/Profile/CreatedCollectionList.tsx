import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import { getCollections } from "../../../requests/fetch";
import { createCollection } from "../../../requests/mutate";
import Collection from "../../../types/collection.type";
import ProfileSearchBar from "../../Inputs/ProfileSearchBar";
import CollectionList from "../CollectionList";
import ImageList from "../ImageList";

interface Props {
  userId?: string;
  isSelf: boolean;
  isProfileLoading: boolean;
}

export default function CreatedCollectionList({
  userId,
  isSelf,
  isProfileLoading,
}: Props) {
  //#region Hooks

  const router = useRouter();

  const [selectedCollection, setSelectedCollection] =
    useState<Collection | null>(null);
  const [isAddCollectionDisabled, setIsAddCollectionDisabled] = useState(true);
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

  const { mutate: mutateCreateCollection, isLoading: isCreatingCollection } =
    useMutation({
      mutationKey: ["create_collection"],
      mutationFn: () => createCollection(searchCollectionValue.trim()),
      onSuccess: () => {
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

  const selectedCollectionPosts = useMemo(
    () =>
      selectedCollection?.posts.filter((post) =>
        post.prompt.toLowerCase().includes(searchPostValue.toLowerCase())
      ),
    [selectedCollection, searchPostValue]
  );

  useEffect(() => {
    if (
      searchCollectionValue.trim().length === 0 ||
      collections?.some(
        (collection) =>
          collection.name.toLowerCase() ===
          searchCollectionValue.trim().toLowerCase()
      )
    ) {
      setIsAddCollectionDisabled(true);
    } else {
      setIsAddCollectionDisabled(false);
    }
  }, [collections, searchCollectionValue]);

  //#endregion

  //#region Handlers

  const handleCollectionSelect = (collection: Collection) => {
    setSearchPostValue("");
    setSelectedCollection(collection);
  };

  const handleCreateCollection = () => {
    if (searchCollectionValue.trim()) {
      if (!isCreatingCollection) {
        mutateCreateCollection();
      } else {
        toast("A collection is already being created");
      }
    }
  };

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
        onBackButtonClick={() => setSelectedCollection(null)}
        onAddButtonClick={() =>
          selectedCollection
            ? void router.push(`/create?prompt=${searchPostValue}`)
            : handleCreateCollection()
        }
        isAddButtonDisabled={
          selectedCollection ? false : isAddCollectionDisabled
        }
        hideAddButton={isProfileLoading || !isSelf}
        placeholder={
          selectedCollection || !isSelf
            ? "Search..."
            : "Search or create a collection..."
        }
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
            arePostsLoading={areCollectionsLoading || isProfileLoading}
            posts={selectedCollectionPosts}
          />
        )}
      </div>
    </div>
  );
}
