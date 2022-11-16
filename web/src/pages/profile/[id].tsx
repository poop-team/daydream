import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { MdAccountCircle, MdAddCircle } from "react-icons/md";

import CustomImage from "../../components/CustomImage";
import Button from "../../components/Inputs/Button";
import LinkIconButton from "../../components/Inputs/LinkIconButton";
import SearchBar from "../../components/Inputs/SearchBar";
import CreatedImagesList from "../../components/Layout/Profile/CreatedImagesList";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import useClient from "../../hooks/useClient";
import { getUser } from "../../requests/fetch";
import { transitionVariants } from "../../styles/motion-definitions";

export default function Profile() {
  //#region Hooks

  useAuthRedirect();

  const router = useRouter();

  const isClient = useClient();

  const [createdSearchValue, setCreatedSearchValue] = useState("");
  const [collectionSearchValue, setCollectionSearchValue] = useState("");
  const [view, setView] = useState<"created" | "collections">("created");

  const { data: profileData, isLoading: isProfileLoading } = useQuery({
    queryKey: ["user_profile", router.query.id],
    queryFn: () => getUser({ userName: router.query.id as string }),
    onError: (err: Error) => {
      toast.error(err.message);
    },
    enabled: !!router.query.id,
  });

  //#endregion

  //#region Handlers

  const handleViewChange = (view: "created" | "collections") => {
    setView(view);
  };

  //#region Derived State

  const isCreatedView = view === "created";

  //#endregion

  return (
    <main className={"h-screen py-16"}>
      <AnimatePresence mode={"popLayout"}>
        {!isProfileLoading && profileData ? (
          <motion.div
            key={"profile"}
            initial={"fadeOut"}
            animate={"fadeIn"}
            exit={"fadeOut"}
            variants={transitionVariants}
            className={"flex flex-col items-center gap-4 md:gap-8"}
          >
            {profileData.image ? (
              <CustomImage
                className="h-48 w-48 rounded-full object-cover"
                src={profileData.image}
                alt="name"
              />
            ) : (
              <div className="h-48 w-48">
                <MdAccountCircle className="h-full w-full text-slate-800" />
              </div>
            )}
            <p className="text-xl">@{profileData.name}</p>
            <p>{profileData.postCount.toLocaleString()} posts created</p>
          </motion.div>
        ) : (
          // Render loading skeleton
          <motion.div
            key={"loading"}
            initial={"fadeOut"}
            animate={"fadeIn"}
            exit={"fadeOut"}
            variants={transitionVariants}
            className={"flex flex-col items-center gap-4 md:gap-8"}
          >
            <div className="h-48 w-48 animate-pulse rounded-full bg-slate-300" />
            <div className="h-8 w-24 animate-pulse rounded-full bg-slate-300" />
            <div className="h-6 w-24 animate-pulse rounded-full bg-slate-300" />
          </motion.div>
        )}
      </AnimatePresence>
      <div className={"mt-12 flex justify-center gap-4"}>
        <Button
          variant={isCreatedView ? "filled" : "text"}
          onClick={() => handleViewChange("created")}
        >
          Created
        </Button>
        <Button
          variant={isCreatedView ? "text" : "filled"}
          onClick={() => handleViewChange("collections")}
        >
          Collections
        </Button>
      </div>
      <section className={"mt-4 sm:mt-12"}>
        <div className={"flex grow items-center justify-center gap-2"}>
          <SearchBar
            value={isCreatedView ? createdSearchValue : collectionSearchValue}
            onValueChange={setCreatedSearchValue}
            className={"w-11/12 max-w-xl sm:w-2/3"}
          />
          <LinkIconButton
            href={`/create?prompt=${createdSearchValue}`}
            className={"hidden text-base sm:block"}
          >
            <MdAddCircle className={"h-full w-10"} />
          </LinkIconButton>
        </div>
        <AnimatePresence mode={"popLayout"}>
          {isCreatedView ? (
            <motion.div
              key={"user-created"}
              initial={"fadeOut"}
              animate={"fadeIn"}
              exit={"fadeOut"}
              variants={transitionVariants}
              className={"px-2 py-16 sm:px-4 md:pb-8 lg:px-8"}
            >
              <CreatedImagesList
                userId={profileData?.id}
                searchValue={createdSearchValue}
                isProfileLoading={isProfileLoading}
              />
            </motion.div>
          ) : (
            <motion.div
              key={"user-collections"}
              initial={"growOut"}
              animate={"growIn"}
              exit={"growOut"}
              variants={transitionVariants}
            ></motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
