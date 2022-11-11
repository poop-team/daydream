import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { MdDoubleArrow } from "react-icons/md";

import { getCollection } from "../../../helpers/fetch";
import {
  staggerContainerVariants,
  staggerItemVariants,
  transitions,
} from "../../../styles/motion-definitions";
import { getAuthSession } from "../../../utils/storage";
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

export default function AddToCollectionPanel({
  postToAddId,
  postToAddSrc,
  onClose,
  className = "",
}: Props) {
  //#region Hooks

  const [searchValue, setSearchValue] = useState("");
  const [addedToCollections, setAddedToCollections] = useState<string[]>([]);

  const { data: collectionData, isLoading: areCollectionsLoading } = useQuery({
    queryKey: ["user_collections"],
    queryFn: () => getCollection({ userId: getAuthSession().userId }),
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

  //#endregion

  //#region Handlers

  const handleCollectionSearch = (value: string) => {
    setSearchValue(value);
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
      <div className={"w-full overflow-y-auto p-2 md:p-4"}>
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
          {collections?.map((collection) => (
            <motion.li
              key={collection.id}
              layout
              variants={staggerItemVariants}
              exit={{ opacity: 0 }}
              transition={transitions.spring}
              className={"h-full w-full"}
            >
              <CollectionCard
                recentPosts={collection.recentPosts}
                isAdded={addedToCollections.includes(collection.id)}
                name={collection.name}
                postCount={collection.postCount}
                className={"w-4/5 sm:w-2/5 lg:w-1/4 xl:w-1/5"}
                onClick={() => handleCollectionClick(collection.id)}
              />
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </Card>
  );
}
