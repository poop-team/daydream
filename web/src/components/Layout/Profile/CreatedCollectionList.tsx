import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import { getCollections } from "../../../requests/fetch";
import Collection from "../../../types/collection.type";
import { getAuthSession } from "../../../utils/storage";
import ProfileSearchBar from "../../Inputs/ProfileSearchBar";
import CollectionList from "../CollectionList";
import ImageList from "../ImageList";

interface Props {
  userId?: string;
  isProfileLoading: boolean;
}

export default function CreatedCollectionList({
  userId,
  isProfileLoading,
}: Props) {
  //#region Hooks

  const [selectedCollection, setSelectedCollection] =
    useState<Collection | null>(null);
  const [searchCollectionValue, setSearchCollectionValue] = useState("");
  const [searchPostValue, setSearchPostValue] = useState("");

  const { data: collectionData, isLoading: areCollectionsLoading } = useQuery({
    queryKey: ["user_collections"],
    queryFn: () => getCollections({ userId: getAuthSession().userId }),
    onError: (err: Error) => {
      toast.error(err.message);
    },
    enabled: !!userId,
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

  //#endregion

  //#region Handlers

  const handleCollectionClick = (collection: Collection) => {
    setSearchPostValue("");
    setSelectedCollection(collection);
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
        placeholder={
          selectedCollection ? "Search..." : "Search or create a collection..."
        }
      />
      <div className={"px-2 pb-16 pt-8 sm:px-4 sm:pt-12 md:pb-8 lg:px-8"}>
        {!selectedCollection ? (
          <CollectionList
            areCollectionsLoading={areCollectionsLoading || isProfileLoading}
            collections={collections}
            onCollectionClick={handleCollectionClick}
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
