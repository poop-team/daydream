import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { MdDoubleArrow } from "react-icons/md";

import IconButton from "../../Inputs/IconButton";
import SearchBar from "../../Inputs/SearchBar";
import Card from "../../Surfaces/Card";
import CollectionCard from "../../Surfaces/CollectionCard";

interface Props {
  postToAddId: string;
  postToAddSrc: string;
  onClose: () => void;
  className?: string;
}

const collectionsMockData = [
  {
    id: "1",
    name: "Some stuff",
    postCount: 69,
    srcs: [
      "/images/placeholder.png",
      "/images/placeholder2.png",
      "/images/placeholder3.png",
    ],
  },
  {
    id: "2",
    name: "Random",
    postCount: 2,
    srcs: ["/images/placeholder.png", "/images/placeholder2.png"],
  },
  {
    id: "3",
    name: "Cats",
    postCount: 1,
    srcs: ["/images/placeholder.png"],
  },
];

export default function AddToCollectionPanel({
  postToAddId,
  postToAddSrc,
  onClose,
  className = "",
}: Props) {
  //#region Hooks

  const [collectionToSearch, setCollectionToSearch] = useState("");
  const [addedToCollections, setAddedToCollections] = useState<string[]>([]);

  const { data: collections, isLoading: areCollectionsLoading } = useQuery(
    ["user_collections"],
    () => Promise.resolve("TODO"),
    {
      onError: (err: Error) => {
        toast.error(err.message);
      },
    }
  );

  //#endregion

  //#region Handlers

  const handleCollectionSearch = (value: string) => {
    setCollectionToSearch(value);
  };

  const handleCollectionClick = (collectionId: string) => {
    if (addedToCollections.includes(collectionId)) {
      setAddedToCollections((prev) => prev.filter((id) => id !== collectionId));
    } else {
      setAddedToCollections((prev) => [...prev, collectionId]);
    }
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
      <div className={"w-full px-2 pb-2 md:p-4"}>
        <SearchBar
          value={collectionToSearch}
          onValueChange={handleCollectionSearch}
          className={"mx-auto w-full max-w-lg"}
        />
        <div className={"mt-4 flex h-full w-full flex-wrap gap-4"}>
          {collectionsMockData.map((collection) => (
            <CollectionCard
              key={collection.id}
              srcs={
                addedToCollections.includes(collection.id)
                  ? [postToAddSrc].concat(collection.srcs)
                  : collection.srcs
              }
              name={collection.name}
              postCount={collection.postCount}
              className={"w-72"}
              onClick={() => handleCollectionClick(collection.id)}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
